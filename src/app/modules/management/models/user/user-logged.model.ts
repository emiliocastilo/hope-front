import { RolModel } from 'src/app/modules/management/models/rol.model';

export class UsersLoggedModel {
  constructor(
    public id?: number,
    public username?: string,
    public email?: string,
    public roles?: number[], // roles a los que se puede asignar a otros usuarios //  roles asignados al usuario
    public rolSelected?: RolModel //  rol que contiene el usuario, //rol con el que se loguea en la app
  ) {}
}
