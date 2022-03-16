import { Component, OnInit } from '@angular/core';
import { Utente } from 'src/app/models/utente';
import { UtentiService } from './utenti.service';

@Component({
  templateUrl: './utenti.page.html',
  styleUrls: ['./utenti.page.scss'],
})
export class UtentiPage implements OnInit {
  constructor(private utSrv: UtentiService) {}
  utenti: Utente[] | undefined;
  pagina = 0;

  ngOnInit() {
    this.getUtenti();
  }

  getUtenti() {
    this.utSrv
      .getUtenti(this.pagina)
      .subscribe((response) => (this.utenti = response.content));


  }

  cambiaPagina(param: string) {
    if (param == '+') {
      this.pagina++;
    } else if (param == '-') {
      this.pagina--;
    }
    this.getUtenti()
  }
}
