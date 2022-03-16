import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Utente } from 'src/app/models/utente';
@Component({
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  isLoading = false;
  errorMessage = undefined;
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  //REGISTRAZIONE: se al submit del form è tutto ok vai a funzione signup e mostra login page, altrimenti stampa errore in console.
  async onsubmit(form: NgForm) {
    this.isLoading = true;
    console.log(form.value);
    try {
      await this.authSrv.signup(form.value);
      form.reset();
      this.isLoading = false;
      this.errorMessage = undefined;
      alert('Nuovo User registrato correttamente!');
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.isLoading = false;
      this.errorMessage = error;
      console.error(error);
    }
  }
}
