import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Fattura } from 'src/app/models/fattura';
import { DettagliFatturaService } from './dettagli-fattura.service';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';

@Component({
  templateUrl: './dettagli-fattura.page.html',
  styleUrls: ['./dettagli-fattura.page.scss'],
})
export class DettagliFatturaPage implements OnInit {
  fattura!: Fattura;
  sub!: Subscription;
  cliente!: Cliente;

  constructor(
    private router: ActivatedRoute,
    private detSrv: DettagliFatturaService
  ) {}

  ngOnInit(): void {
    this.sub = this.router.params.subscribe((params: Params) => {
      const id = +parseInt(params['id']);
      this.getFattura(id);
      console.log(params['id']);
    });
  }

  getFattura(idFattura: number) {
    this.detSrv.getFattura(idFattura).subscribe((response) => {
      this.fattura = response;
      this.cliente = this.fattura.cliente;
      console.log(this.fattura);
    });
  }
}
