import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPage } from './login/login.page';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { SignupPage } from './signup/signup.page';

@NgModule({
  declarations: [LoginPage, SignupPage],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginPage,
      },
      {
        path: 'signup',
        component: SignupPage,
      },
    ]),
  ],
  providers: [
  ]
})
export class AuthModule {}
