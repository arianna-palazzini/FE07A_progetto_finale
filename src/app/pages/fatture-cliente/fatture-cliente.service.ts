import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class FattureClienteService {
  URL = environment.pathApi;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authSrv: AuthService
  ) {}

  getFattureCliente(id: number, pagina: number) {
    return this.http.get<any>(
      `${this.URL}/api/fatture/cliente/${id}?page=${pagina}&size=20&sort=id,ASC`
    );
  }

  rimuoviFattura(idFattura: number) {
    this.http.delete(`${this.URL}/api/fatture/${idFattura}`).subscribe();
  }

  getFattureFiltrate(filtro: string, valoreFiltro: string, pagina: number) {
    if (filtro == 'stato') {
      if (valoreFiltro == 'PAGATA' || valoreFiltro == 'pagata') {
        valoreFiltro = '1';
      } else if (valoreFiltro == 'NON PAGATA' || valoreFiltro == 'non pagata') {
        valoreFiltro = '2';
      }
    }
   if(filtro == "anno"){
       return this.http.get<any>(
         `${this.URL}/api/fatture/anno/?anno=${valoreFiltro}&page=${pagina}&size=10000&sort=id,ASC`);
     } else { return this.http.get<any>(
       `${this.URL}/api/fatture/${filtro}/${valoreFiltro}?page=${pagina}&size=10000&sort=id,ASC`
     );}
   }


}
