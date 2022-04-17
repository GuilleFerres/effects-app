import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';
import { cargarUsuario, cargarUsuarioError, cargarUsuarioSuccess } from '../actions';

export interface UsuarioState {
    id     : string  | null,
    user   : Usuario | null,
    loaded : boolean,
    loading: boolean,
    error  : any
}

export const UsuarioInitialState: UsuarioState = {
    id     : null,
    user   : null, 
    loaded : false,
    loading: false,
    error  : null
}

const _usuarioReducer = createReducer(UsuarioInitialState,

    on( cargarUsuario, (state, { id }) => ({ 
        ...state, 
        loading: true,
        id: id 
    })),
    on( cargarUsuarioSuccess, (state, { usuario }) => ({ 
        ...state, 
        loading: false,
        loaded: true,
        users: { ...usuario }
    })),
    on( cargarUsuarioError, (state, { payload }) => ({ 
        ...state, 
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message
        }
    })),

);

export function usuarioReducer(state: any, action: any) {
    return _usuarioReducer(state, action);
}