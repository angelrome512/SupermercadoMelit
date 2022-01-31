import { IIva } from 'app/entities/iva/iva.model';
import { TipoProducto } from 'app/entities/enumerations/tipo-producto.model';

export interface IProducto {
  id?: number;
  codigo?: string;
  nombre?: string;
  cantidad?: number;
  precioBase?: number;
  precioTotal?: number | null;
  tipoProducto?: TipoProducto | null;
  iva?: IIva | null;
}

export class Producto implements IProducto {
  constructor(
    public id?: number,
    public codigo?: string,
    public nombre?: string,
    public cantidad?: number,
    public precioBase?: number,
    public precioTotal?: number | null,
    public tipoProducto?: TipoProducto | null,
    public iva?: IIva | null
  ) {}
}

export function getProductoIdentifier(producto: IProducto): number | undefined {
  return producto.id;
}
