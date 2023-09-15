import { Injectable } from '@angular/core';
import * as _localStorage from '../../../utilities/local-storage/local-storage';
import { User } from '../model/user.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getUserInformation(userName: string): User | undefined {
    const allUsers = _localStorage.getItem('users') as User[];
    if (userName !== 'add') {
      return allUsers
        .filter((user: User) => user.username === userName)
        .find(Boolean);
    }
    return new User();
  }
}
