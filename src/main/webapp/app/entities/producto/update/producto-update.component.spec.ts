import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ProductoService } from '../service/producto.service';
import { IProducto, Producto } from '../producto.model';
import { IIva } from 'app/entities/iva/iva.model';
import { IvaService } from 'app/entities/iva/service/iva.service';

import { ProductoUpdateComponent } from './producto-update.component';

describe('Producto Management Update Component', () => {
  let comp: ProductoUpdateComponent;
  let fixture: ComponentFixture<ProductoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let productoService: ProductoService;
  let ivaService: IvaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ProductoUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ProductoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProductoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    productoService = TestBed.inject(ProductoService);
    ivaService = TestBed.inject(IvaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Iva query and add missing value', () => {
      const producto: IProducto = { id: 456 };
      const iva: IIva = { id: 50371 };
      producto.iva = iva;

      const ivaCollection: IIva[] = [{ id: 37241 }];
      jest.spyOn(ivaService, 'query').mockReturnValue(of(new HttpResponse({ body: ivaCollection })));
      const additionalIvas = [iva];
      const expectedCollection: IIva[] = [...additionalIvas, ...ivaCollection];
      jest.spyOn(ivaService, 'addIvaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ producto });
      comp.ngOnInit();

      expect(ivaService.query).toHaveBeenCalled();
      expect(ivaService.addIvaToCollectionIfMissing).toHaveBeenCalledWith(ivaCollection, ...additionalIvas);
      expect(comp.ivasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const producto: IProducto = { id: 456 };
      const iva: IIva = { id: 89446 };
      producto.iva = iva;

      activatedRoute.data = of({ producto });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(producto));
      expect(comp.ivasSharedCollection).toContain(iva);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Producto>>();
      const producto = { id: 123 };
      jest.spyOn(productoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ producto });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: producto }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(productoService.update).toHaveBeenCalledWith(producto);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Producto>>();
      const producto = new Producto();
      jest.spyOn(productoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ producto });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: producto }));
      saveSubject.complete();

      // THEN
      expect(productoService.create).toHaveBeenCalledWith(producto);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Producto>>();
      const producto = { id: 123 };
      jest.spyOn(productoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ producto });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(productoService.update).toHaveBeenCalledWith(producto);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackIvaById', () => {
      it('Should return tracked Iva primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackIvaById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
