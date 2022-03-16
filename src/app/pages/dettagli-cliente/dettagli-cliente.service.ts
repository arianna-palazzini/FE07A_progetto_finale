import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ClientiService } from '../clienti/clienti.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DettagliClienteService {
  URL = environment.pathApi;

  constructor(private http: HttpClient, private router: Router, private clSrv: ClientiService) {}

  //chiamata specifica al cliente tramite id
  getCliente(idCliente: number) {
    return this.http.get<any>(
      `${this.URL}/api/clienti/${idCliente}`
    );
  }
}
