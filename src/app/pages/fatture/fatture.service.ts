import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData, AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import { Fattura } from 'src/app/models/fattura';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FattureService {
  URL = environment.pathApi;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authSrv: AuthService
  ) {}

  getAllFatture(pagina: number) {
    return this.http.get<any>(
      `${this.URL}/api/fatture?page=${pagina}&size=20&sort=id,ASC`
    );
  }

  removeFattura(fattura: Fattura) {
    return this.http.delete(`${this.URL}/api/fatture/${fattura.id}`);
  }

  nuovaFattura(data: Fattura) {
    return this.http
      .post<Fattura>(`${this.URL}/api/fatture`, data)
      .subscribe((res) => {});
  }

  editFattura(data: Fattura, id: number) {
    return this.http
      .put<Fattura>(`${this.URL}/api/fatture/${id}`, data).subscribe();
  }

  getFattureFiltrate(filtro: string, valoreFiltro: string, pagina: number) {
    if (filtro == 'stato') {
      if (valoreFiltro == 'PAGATA' || valoreFiltro == 'pagata') {
        valoreFiltro = '1';
      } else if (valoreFiltro == 'NON PAGATA' || valoreFiltro == 'non pagata') {
        valoreFiltro = '2';
      }
    }
    if (filtro == 'id') {
      return this.http.get<any>(`${this.URL}/api/fatture/${valoreFiltro}`);
    } else if (filtro == 'anno') {
      return this.http.get<any>(
        `${this.URL}/api/fatture/anno/?anno=${valoreFiltro}&page=${pagina}&size=10000&sort=id,ASC`
      );
    } else {
      return this.http.get<any>(
        `${this.URL}/api/fatture/${filtro}/${valoreFiltro}?page=${pagina}&size=10000&sort=id,ASC`
      );
    }
  }
}
