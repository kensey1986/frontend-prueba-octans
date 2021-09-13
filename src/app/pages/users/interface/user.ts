import { Rol } from './rol';
export interface User {
    id: number;
    nombre: string;
    estado: boolean;
    createAt: Date;
    rol: Rol;
}
