import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FattureService } from '../fatture/fatture.service';
import { Router } from '@angular/router';
import { Fattura } from 'src/app/models/fattura';

@Component({
  templateUrl: './nuova-fattura.page.html',
  styleUrls: ['./nuova-fattura.page.scss'],
})
export class NuovaFatturaPage implements OnInit {
  isLoading = false;
  errorMessage = undefined;
  authSrv: any;

  constructor(private fatSrv: FattureService, private router: Router) {}

  ngOnInit(): void {}

  async onsubmit(form: NgForm) {
    let statoId: number;
    if (form.value.stato == 'PAGATA') {
      statoId = 1;
    } else if (form.value.stato == 'NON PAGATA') {
      statoId = 2;
    }
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
        "id":${form.value.clienteId}
  }}
  `);

    this.isLoading = true;
    try {
      await this.fatSrv.nuovaFattura(nuovaFattura);
      console.log(form.value);
      form.reset();
      this.isLoading = false;
      this.errorMessage = undefined;
      alert('Nuova Fattura inserita correttamente!');
      this.router.navigate(['/fatture']);
    } catch (error: any) {
      this.isLoading = false;
      this.errorMessage = error;
      console.error(error);
    }
  }
}
