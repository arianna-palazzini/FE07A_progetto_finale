import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DettagliFatturaService {
  URL = environment.pathApi;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authSrv: AuthService
  ) {}

  getFattura(idFattura: number) {
    return this.http.get<any>(
      `${this.URL}/api/fatture/${idFattura}`
    );
  }
}
