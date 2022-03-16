import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLoading = false;
  errorMessage = undefined;
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  //AUTENTICAZIONE:se al submit del form è tutto ok vai a funzione login e mostra utenti page, altrimenti stampa errore in console.
  async onSubmit(form: any) {
    try {
      await this.authSrv.login(form.value).toPromise();
      form.reset();
      this.errorMessage = undefined;
      this.router.navigate(['/utenti']);
    } catch (error: any) {
      this.errorMessage = error;
      console.error(error);
    }
  }
}
