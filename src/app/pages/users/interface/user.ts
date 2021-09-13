import { Rol } from './rol';
export class User {
    id?: number;
    nombre?: string;
    estado?: boolean;
    createAt?: Date;
    rol?: Rol;
}
