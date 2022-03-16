import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { ClientiService } from '../clienti/clienti.service';
import { DettagliClienteService } from '../dettagli-cliente/dettagli-cliente.service';
import { Province } from 'src/app/models/province';
import { Comuni } from 'src/app/models/comuni';

@Component({
  templateUrl: './edit-cliente.page.html',
  styleUrls: ['./edit-cliente.page.scss']
})
export class EditClientePage implements OnInit {
  cliente!: Cliente;
  isLoading = false;
  errorMessage = undefined;
  authSrv: any;
  sub!: Subscription;
  tipoClienti = [];
  province: Province[] | undefined;
  comuni: Comuni[] | undefined;

  constructor(private clSrv: ClientiService, private detClSrv: DettagliClienteService, private router: Router, private actRoute: ActivatedRoute) {}

  ngOnInit(): void {
      this.sub = this.actRoute.params.subscribe((params: Params) => {
        const id = +parseInt(params['id']);
        this.detClSrv.getCliente(id).subscribe(res => {
          this.cliente = res;
        });
        console.log(params['id']);
      });
      setTimeout(() => {
        this.clSrv.getComuni().subscribe((res) => {
          this.comuni = res.content;
        });
        this.clSrv.getProvince().subscribe((res) => {
          this.province = res.content;
        });
      }, 2000);
  }

  async onsubmit(form: NgForm, id:number) {
    this.isLoading = true;
    let comuneSedeOperativa!: Comuni;
    let comuneSedeLegale!: Comuni;
    let provinciaSedeOperativa!: Province;
    let provinciaSedeLegale!: Province;

    for (let i of this.comuni!) {
      if (form.value.comuneSedeLegale == i.nome) {
        comuneSedeLegale = i;
      }
      if (form.value.ComuneSedeOperativa == i.nome) {
        comuneSedeOperativa = i;
      }
    }

    for (let i of this.province!) {
      if (form.value.provinciaSedeLegale == i.nome) {
        provinciaSedeLegale = i;
      }
      if (form.value.provinciaSedeOperativa == i.nome) {
        provinciaSedeOperativa = i;
      }
    }

    let nuovoCliente = JSON.parse(`{
        "ragioneSociale": "${form.value.ragioneSociale}",
        "partitaIva": "${form.value.partitaIva}",
        "tipoCliente": "${form.value.tipoCliente}",
        "email": "${form.value.email}",
        "pec": "${form.value.pec}",
        "telefono":"${form.value.telefono}" ,
        "nomeContatto": "${form.value.nomeContatto}",
        "cognomeContatto": "${form.value.cognomeContatto}",
        "telefonoContatto": "${form.value.telefonoContatto}",
        "emailContatto": "${form.value.emailContatto}",
        "indirizzoSedeOperativa": {
            "via": "${form.value.viaSedeOperativa}",
            "civico": "${form.value.civicoSedeOperativa}",
            "cap": "${form.value.capSedeOperativa}",
            "localita": "${form.value.localitaSedeOperativa}",
            "comune": {
                "id": ${comuneSedeOperativa!.id},
                "nome": "${comuneSedeOperativa!.nome}",
                "provincia": {
                    "id": ${provinciaSedeOperativa!.id},
                    "nome": "${provinciaSedeOperativa!.nome}",
                    "sigla": "${provinciaSedeOperativa!.sigla}"
                }
            }
        },
        "indirizzoSedeLegale": {
            "via": "${form.value.viaSedeLegale}",
            "civico": "${form.value.civicoSedeLegale}",
            "cap": "${form.value.capSedeLegale}",
            "localita": "${form.value.localitaSedeLegale}",
            "comune": {
              "id": ${comuneSedeLegale!.id},
              "nome": "${comuneSedeLegale!.nome}",
              "provincia": {
                  "id": ${provinciaSedeLegale!.id},
                  "nome": "${provinciaSedeLegale!.nome}",
                  "sigla": "${provinciaSedeLegale!.sigla}"
                }
            }
        },
        "dataInserimento": "2019-06-01T08:11:01.911+00:00",
        "dataUltimoContatto": "2021-03-24T21:32:06.375+00:00"
    }`);
    try {
      this.clSrv.editCliente(nuovoCliente, this.cliente.id);
      form.reset();
      this.isLoading = false;
      this.errorMessage = undefined;
        alert('Cliente modificato correttamente!');
        this.router.navigate(['/clienti']);
    } catch (error: any) {
      this.isLoading = false;
      this.errorMessage = error;
      console.error(error);
    }
  }
}
