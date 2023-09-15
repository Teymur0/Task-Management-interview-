import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './modules/layout/components/layout/layout.component';
import { authGuard } from './guard/auth/auth.guard';
import { adminGuard } from './guard/admin/admin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'main',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'task',
        loadChildren: () =>
          import('./modules/tasks/tasks.module').then((m) => m.TasksModule),
      },
      {
        path: 'user',
        canActivate: [adminGuard],
        loadChildren: () =>
          import('./modules/users/users.module').then((m) => m.UsersModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
