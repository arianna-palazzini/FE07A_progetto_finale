import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { Fattura } from 'src/app/models/fattura';
import { DettagliFatturaService } from '../dettagli-fattura/dettagli-fattura.service';
import { FattureService } from '../fatture/fatture.service';
import { FatturePage } from '../fatture/fatture.page';
@Component({
  templateUrl: './edit-fattura.page.html',
  styleUrls: ['./edit-fattura.page.scss'],
})
export class EditFatturaPage implements OnInit {
  fattura!: Fattura;
  isLoading = false;
  errorMessage = undefined;
  authSrv: any;
  sub!: Subscription;

  constructor(
    private fatSrv: FattureService,
    private detFat: DettagliFatturaService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sub = this.actRoute.params.subscribe((params: Params) => {
      const id = +parseInt(params['id']);
      this.detFat.getFattura(id).subscribe((res) => {
        this.fattura = res;
      });
      console.log(params['id']);
    });
  }

  async onsubmit(form: NgForm) {
    let statoId: number;
    if (form.value.stato == 'PAGATA') {
      statoId = 1;
    } else if (form.value.stato == 'NON PAGATA') {
      statoId = 2;
    }
    console.log(this.fattura);
    const nuovaFattura = JSON.parse(`
      {
      "data":"${form.value.date}",
      "numero":${form.value.numero},
      "anno":${form.value.anno},
      "importo":${form.value.importo},
      "stato":{
        "id": ${statoId!},
        "nome": "${form.value.stato}"
    }
    ,"cliente":{
          "id":${this.fattura.cliente.id}
    }}
    `);

    this.isLoading = true;
    try {
      await this.fatSrv.editFattura(nuovaFattura, this.fattura.id);
      form.reset();
      this.isLoading = false;
      this.errorMessage = undefined;
      alert('Fattura modificata correttamente!');
      this.router.navigate(['/fatture']);
    } catch (error: any) {
      this.isLoading = false;
      this.errorMessage = error;
      console.error(error);
    }
  }
}
