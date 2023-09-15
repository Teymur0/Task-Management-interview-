import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AccountRoutingModule } from './account-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [CommonModule, AccountRoutingModule, FormsModule, RouterModule],
})
export class AccountModule {}
