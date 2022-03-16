import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { DettagliClienteService } from './dettagli-cliente.service';

@Component({
  templateUrl: './dettagli-cliente.page.html',
  styleUrls: ['./dettagli-cliente.page.scss']
})

export class DettagliClientePage implements OnInit {
  cliente!: Cliente;
  sub!: Subscription;
  constructor(private router: ActivatedRoute, private detSrv: DettagliClienteService) {}

  ngOnInit(): void {
    this.sub = this.router.params.subscribe((params: Params) => {
      const id = +parseInt(params['id']);
      this.getFattura(id);
    });
  }

  getFattura(idFattura: number) {
    this.detSrv.getCliente(idFattura).subscribe((response) => {
      this.cliente = response;
    });
  }
}
