import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from 'src/app/modules/account/services/account.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AccountService);
  return authService.checkAdmin();
};
