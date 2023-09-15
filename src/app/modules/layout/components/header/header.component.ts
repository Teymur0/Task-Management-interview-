import { Component } from '@angular/core';
import { AccountService } from 'src/app/modules/account/services/account.service';
import { RoleEnum } from 'src/app/modules/users/model/user.model';
import * as _localStorage from './../../../../utilities/local-storage/local-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private accountService: AccountService, private router: Router) {}

  isAdmin(): boolean {
    return this.accountService.getActiveRole() === RoleEnum.Admin;
  }
  logout(): void {
    _localStorage.removeItem('current-user');
    this.router.navigate(['/sign-in']);
  }
}
