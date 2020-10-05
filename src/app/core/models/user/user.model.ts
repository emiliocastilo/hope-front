export class UserModel {
  constructor(
    public id?: number,
    public hospitalId?: number,
    public username?: string,
    public password?: string,
    public email?: string,
    public roles?: any,
    public rolSelected?: {
      id: number;
      name: string;
      description: string;
    }
  ) {}
}
