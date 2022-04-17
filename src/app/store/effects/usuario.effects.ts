import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { UsuarioService } from "../../services/usuario.service";
import * as usuariosActions from "../actions";

@Injectable()
export class UsuarioEffects {
    constructor(
        private actions$: Actions,
        private usuariosServices: UsuarioService
    ){}

    cargarusuario$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuariosActions.cargarUsuario ),
            mergeMap(
                ( action ) => this.usuariosServices.getUserById(action.id)
                .pipe(
                   map( user => usuariosActions.cargarUsuarioSuccess( {usuario: user} )),
                   catchError( err => of (usuariosActions.cargarUsuarioError( { payload: err } )))
                )
            )
        )
    );
}