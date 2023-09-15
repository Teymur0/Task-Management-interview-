export class User {
  firstName!: string;
  lastName!: string;
  username!: string;
  email!: string;
  password!: string;
  organization!: Organization;
  role!: RoleEnum;
}

class Organization {
  name!: string;
  phoneNumber!: string;
  address!: string;
}

export enum RoleEnum {
  Admin,
  User,
}
