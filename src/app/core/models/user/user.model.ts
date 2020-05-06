export class UserModel {
  constructor(
    public id?: string,
    public hospitalId?: string,
    public username?: string,
    public password?: string,
    public email?: string,
    public roles?: number[]
  ) {}
}
