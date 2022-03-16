import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Fattura } from 'src/app/models/fattura';
import { FattureClienteService } from './fatture-cliente.service';
import { Subscription } from 'rxjs';
import { FattureService } from '../fatture/fatture.service';
@Component({
  templateUrl: './fatture-cliente.page.html',
  styleUrls: ['./fatture-cliente.page.scss'],
})
export class FattureClientePage implements OnInit {
  fatture!: Fattura[];
  sub!: Subscription;
  isLoading = false;
  booleanoFiltro = false;

  constructor(
    private router: ActivatedRoute,
    private fatCliSrv: FattureClienteService,
    private fatSrv: FattureService
  ) {}
  pagina = 0;
  id!: number;
  ngOnInit(): void {
    this.sub = this.router.params.subscribe((params: Params) => {
      this.id = +parseInt(params['id']);
      this.onGetFattureCliente(this.id);
      console.log(params['id']);
    });
  }

  onGetFattureCliente(id: number) {
    this.fatCliSrv.getFattureCliente(id, this.pagina).subscribe((response) => {
      this.fatture = response.content;
      console.log(this.fatture);
    });
  }

  cambiaPagina(param: string) {
    if (param == '+') {
      this.pagina++;
    } else if (param == '-') {
      this.pagina--;
    }
    this.onGetFattureCliente(this.id);
  }

  rimuoviFattura(fattura: Fattura) {
    this.fatSrv.removeFattura(fattura).subscribe(response => {this.onGetFattureCliente(this.id)})
  }

  filtra() {
    this.booleanoFiltro = true;
    this.isLoading = true;
    const filtro = (<HTMLInputElement>document.getElementById('filtro')).value;
    const valoreFiltro = (<HTMLInputElement>document.getElementById('valore'))
      .value;

    this.fatSrv
      .getFattureFiltrate(filtro, valoreFiltro, this.pagina)
      .subscribe((res) => {
          this.fatture = res.content;
          this.isLoading = false;
      });
  }
}
