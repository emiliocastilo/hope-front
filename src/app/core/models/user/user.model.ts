export class UserModel {
  constructor(
    public hospitalId?: string,
    public username?: string,
    public password?: string,
    public email?: string,
    public roles?: number[]
  ) {}
}
