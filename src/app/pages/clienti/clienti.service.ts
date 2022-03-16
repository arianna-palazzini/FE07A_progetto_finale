import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Cliente } from 'src/app/models/cliente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class ClientiService {
  URL = environment.pathApi;
  urlClienti2 = environment.pathApi + '/api/clienti/';
  constructor(
    private http: HttpClient,
    private router: Router,
    private authSrv: AuthService
  ) {}


  /* ---- CHIAMATE API ---- */

  //PRENDERE TUTTI I CLIENTI
  getClienti(pagina: number) {
    return this.http.get<any>(`${this.URL}/api/clienti?page=${pagina}`);
  }

  //PRENDERE TUTTE LE FATTURE DEL CLIENTE
  getAllFattureCliente(id: number) {
    return this.http.get<any>(
      `${this.URL}/api/fatture/cliente/${id}?page=0&size=10000&sort=id,ASC`
    );
  }

  //PRENDERE TUTTI I COMUNI
  getComuni() {
    return this.http.get<any>(
      `${this.URL}/api/comuni?page=0&size=20&sort=id,ASC`
    );
  }

  //PRENDERE TUTTE LE PROVINCE
  getProvince() {
    return this.http.get<any>(
      `${this.URL}/api/province?page=0&size=20&sort=id,ASC`
    );
  }

  //CREAZIONE NUOVO CLIENTE
  newCliente(data: Cliente) {
    console.log(data);
    return this.http
      .post<Cliente>(`${this.URL}/api/clienti`, data)
      .subscribe((res) => {
        console.log(res);
      });
  }

  //MODIFICA DEL CLIENTE
  editCliente(data: Partial<Cliente>, id: number) {
    return this.http
      .put<Cliente>(`${this.URL}/api/clienti/${id}`, data)
      .subscribe((res) => {});
  }


  //ELIMINAZIONE DI TUTTE LE FATTURE DEL CLIENTE
  removeFattureCliente(id: number) {
    return this.http.delete<any>(`${this.URL}/api/fatture/cliente/${id}`)
  }

  //ELIMINAZIONE DEL CLIENTE
  removeCliente(clienteId: number) {
    this.http.delete(`${this.URL}/api/clienti/${clienteId}`).subscribe();
  }


  //PRENDERE IL CLIENTE SULLA BASE DEL FILTRO ID
  getClientiFiltrati(filtro: string, valoreFiltro: string, pagina: number) {
    if (filtro == 'id') {
      return this.http.get<any>(`${this.URL}/api/clienti/${valoreFiltro}`);
    } else {
      return this.http.get<any>(
        `${this.URL}/api/clienti/${filtro}?nome=${valoreFiltro}`
      );
    }
  }

  //PRENDERE TUTTI I CLIENTI SULLA BASE DEL FILTRO FATTURATO
  getClientiFiltratiFatturato(
    filtro: string,
    valoreFiltro1: string,
    valoreFiltro2: string
  ) {
    return this.http.get<any>(
      `${this.URL}/api/clienti/${filtro}?from=${valoreFiltro1}&to=${valoreFiltro2}`
    );
  }

}
