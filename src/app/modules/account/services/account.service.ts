import { Injectable } from '@angular/core';
import { RoleEnum, User } from '../../users/model/user.model';
import * as _localStorage from '../../../utilities/local-storage/local-storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private router: Router) {}

  getActiveOrqanizationName(): string | undefined {
    const currentUser: User[] = _localStorage.getItem('current-user') as User[];
    return currentUser.find(Boolean)?.organization.name;
  }

  getActiveUserName(): string | undefined {
    const currentUser: User[] = _localStorage.getItem('current-user') as User[];
    return currentUser.find(Boolean)?.username;
  }

  getActiveRole(): RoleEnum | undefined {
    const currentUser: User[] = _localStorage.getItem('current-user') as User[];
    return currentUser.find(Boolean)?.role;
  }

  checkLoggedUser(): boolean {
    const currentUser: User[] = _localStorage.getItem('current-user') as User[];

    if (currentUser) {
      return true;
    }
    this.router.navigate(['/sign-in']);
    return false;
  }

  checkAdmin(): boolean {
    const currentUser: User[] = _localStorage.getItem('current-user') as User[];

    if (currentUser.find(Boolean)?.role === RoleEnum.Admin) {
      return true;
    }
    this.router.navigate(['/main/task/list']);
    return false;
  }
}
