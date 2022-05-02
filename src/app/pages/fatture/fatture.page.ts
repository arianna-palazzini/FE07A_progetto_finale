import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Fattura } from 'src/app/models/fattura';
import { FattureService } from './fatture.service';

@Component({
  templateUrl: './fatture.page.html',
  styleUrls: ['./fatture.page.scss'],
})
export class FatturePage implements OnInit {
  fatture!: Fattura[];
  isLoading = false;
  pagina = 0;
  booleanoFiltro = false;
  constructor(private router: ActivatedRoute, private fatSrv: FattureService) {}

  ngOnInit(): void {
    this.onGetAllFatture();
  }

  onGetAllFatture() {
    this.fatSrv.getAllFatture(this.pagina).subscribe((response) => {
      this.fatture = response.content;
    });
  }

  cambiaPagina(param: string) {
    if (param == '+') {
      this.pagina++;
    } else if (param == '-') {
      this.pagina--;
    }
    this.onGetAllFatture();
  }


  rimuoviFattura(fattura: Fattura) {
    this.fatSrv.removeFattura(fattura).subscribe(response => {this.onGetAllFatture()})
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
        if (filtro == 'id') {
          this.fatture=[];
          this.fatture.push(res);
          console.log(res);
          this.isLoading = false;
        } else {
          this.fatture = res.content;
          this.isLoading = false;
        }
      });
  }
}
