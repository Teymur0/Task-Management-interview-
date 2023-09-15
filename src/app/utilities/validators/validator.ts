import { User } from 'src/app/modules/users/model/user.model';
import * as _localStorage from '../../utilities/local-storage/local-storage';

export function checkUserSignIn(
  email: string,
  userName: string,
  password: string
): User[] {
  const usersList = _localStorage.getItem('users') as User[];

  return usersList.filter((user: any) => {
    return (
      (user.username === userName || user.email === email) &&
      user.password === password
    );
  });
}

export function checkUserSignUp(
  email: string,
  userName: string,
  organizationName: string
) {
  const usersList = _localStorage.getItem('users') as User[];
  return usersList.some(
    (user: any) =>
      user.username !== userName &&
      user.email !== email &&
      user.organization.name !== organizationName
  );
}
