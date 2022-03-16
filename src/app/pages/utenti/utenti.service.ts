import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Utente } from 'src/app/models/utente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UtentiService {
  URL = environment.pathApi;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authSrv: AuthService
  ) {}

  getUtenti(pagina:number) {
    return this.http.get<any>(`${this.URL}/api/users?page=${pagina}`);
  }
}
