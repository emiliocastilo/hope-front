import { RolModel } from '../../../modules/management/models/rol.model';

export class ProfileModel {
  constructor(
    public role: RolModel,
    public token: string,
    public user: string
  ) {}
}
