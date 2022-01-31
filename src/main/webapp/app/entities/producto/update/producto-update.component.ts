import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IProducto, Producto } from '../producto.model';
import { ProductoService } from '../service/producto.service';
import { IIva } from 'app/entities/iva/iva.model';
import { IvaService } from 'app/entities/iva/service/iva.service';
import { TipoProducto } from 'app/entities/enumerations/tipo-producto.model';

@Component({
  selector: 'jhi-producto-update',
  templateUrl: './producto-update.component.html',
})
export class ProductoUpdateComponent implements OnInit {
  isSaving = false;
  tipoProductoValues = Object.keys(TipoProducto);

  ivasSharedCollection: IIva[] = [];

  editForm = this.fb.group({
    id: [],
    codigo: [null, [Validators.required]],
    nombre: [null, [Validators.required]],
    cantidad: [null, [Validators.required]],
    precioBase: [null, [Validators.required]],
    precioTotal: [{ value: 0.0, disabled: true }],
    tipoProducto: [],
    iva: [],
  });

  constructor(
    protected productoService: ProductoService,
    protected ivaService: IvaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ producto }) => {
      this.updateForm(producto);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const producto = this.createFromForm();
    if (producto.id !== undefined) {
      this.subscribeToSaveResponse(this.productoService.update(producto));
    } else {
      this.subscribeToSaveResponse(this.productoService.create(producto));
    }
  }

  trackIvaById(index: number, item: IIva): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProducto>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(producto: IProducto): void {
    this.editForm.patchValue({
      id: producto.id,
      codigo: producto.codigo,
      nombre: producto.nombre,
      cantidad: producto.cantidad,
      precioBase: producto.precioBase,
      precioTotal: producto.precioTotal,
      tipoProducto: producto.tipoProducto,
      iva: producto.iva,
    });

    this.ivasSharedCollection = this.ivaService.addIvaToCollectionIfMissing(this.ivasSharedCollection, producto.iva);
  }

  protected loadRelationshipsOptions(): void {
    this.ivaService
      .query()
      .pipe(map((res: HttpResponse<IIva[]>) => res.body ?? []))
      .pipe(map((ivas: IIva[]) => this.ivaService.addIvaToCollectionIfMissing(ivas, this.editForm.get('iva')!.value)))
      .subscribe((ivas: IIva[]) => (this.ivasSharedCollection = ivas));
  }

  protected createFromForm(): IProducto {
    return {
      ...new Producto(),
      id: this.editForm.get(['id'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      cantidad: this.editForm.get(['cantidad'])!.value,
      precioBase: this.editForm.get(['precioBase'])!.value,
      precioTotal: this.editForm.get(['precioTotal'])!.value,
      tipoProducto: this.editForm.get(['tipoProducto'])!.value,
      iva: this.editForm.get(['iva'])!.value,
    };
  }
}
