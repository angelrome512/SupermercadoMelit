import { Cargo } from 'app/entities/enumerations/cargo.model';

export interface IEmpleado {
  id?: number;
  nombre?: string;
  direccion?: string;
  email?: string;
  telefono?: string;
  cargo?: Cargo;
  codigoSU?: string | null;
}

export class Empleado implements IEmpleado {
  constructor(
    public id?: number,
    public nombre?: string,
    public direccion?: string,
    public email?: string,
    public telefono?: string,
    public cargo?: Cargo,
    public codigoSU?: string | null
  ) {}
}

export function getEmpleadoIdentifier(empleado: IEmpleado): number | undefined {
  return empleado.id;
}
