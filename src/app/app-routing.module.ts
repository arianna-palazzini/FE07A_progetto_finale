import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { UtentiPage } from './pages/utenti/utenti.page';
import { ClientiPage } from './pages/clienti/clienti.page';
import { FatturePage } from './pages/fatture/fatture.page';
import { DettagliFatturaPage } from './pages/dettagli-fattura/dettagli-fattura.page';
import { FattureClientePage } from './pages/fatture-cliente/fatture-cliente.page';
import { AuthGuard } from './auth/auth.guard';
import { NuovoClientePage } from './pages/nuovo-cliente/nuovo-cliente.page';
import { DettagliClientePage } from './pages/dettagli-cliente/dettagli-cliente.page';
import { NuovaFatturaPage } from './pages/nuova-fattura/nuova-fattura.page';
import { EditFatturaPage } from './pages/edit-fattura/edit-fattura.page';
import { EditClientePage } from './pages/edit-cliente/edit-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    canActivate: [AuthGuard],
    path: 'utenti',
    component: UtentiPage,
  },
  {
    canActivate: [AuthGuard],
    path: 'clienti',
    component: ClientiPage,
  },
  {
    canActivate: [AuthGuard],
    path: 'fatture',
    component: FatturePage,
  },
  {
    canActivate: [AuthGuard],
    path: 'dettagli-fattura/:id',
    component: DettagliFatturaPage,
  },
  {
    canActivate: [AuthGuard],
    path: 'edit-fattura/:id',
    component: EditFatturaPage,
  },
  {
    canActivate: [AuthGuard],
    path: 'nuovo-cliente',
    component: NuovoClientePage,
  },
  {
    canActivate: [AuthGuard],
    path: 'fatture-cliente/:id',
    component: FattureClientePage,
  },
  {
    canActivate: [AuthGuard],
    path: 'dettagli-cliente/:id',
    component: DettagliClientePage,
  },
  {
    canActivate: [AuthGuard],
    path: 'edit-cliente/:id',
    component: EditClientePage,
  },
  {
    canActivate: [AuthGuard],
    path: 'nuova-fattura',
    component: NuovaFatturaPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
