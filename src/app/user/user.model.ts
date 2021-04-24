export interface IUser
{
  id?: any;
  username?: string;
  email?: string;
  password?: string;
  enabled?: boolean;
  created?: Date;
}
export class User implements IUser
{
  constructor(
    public id?: any,
    public username?: string,
    public email?: string,
    public password?: string,
    public enabled?: boolean,
    public created?: Date,
  ) {}
}
