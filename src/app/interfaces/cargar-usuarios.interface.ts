import { Usuario } from './../models/usuario.model';

export interface CaegarUsuarios {
    total: number,
    usuarios: Usuario[];
}