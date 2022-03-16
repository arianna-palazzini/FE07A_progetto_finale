import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomePage } from './pages/home/home.page';
import { UtentiPage } from './pages/utenti/utenti.page';
import { ClientiPage } from './pages/clienti/clienti.page';
import { FatturePage } from './pages/fatture/fatture.page';
import { DettagliFatturaPage } from './pages/dettagli-fattura/dettagli-fattura.page';
import { NuovoClientePage } from './pages/nuovo-cliente/nuovo-cliente.page';
import { FattureClientePage } from './pages/fatture-cliente/fatture-cliente.page';
import { DettagliClientePage } from './pages/dettagli-cliente/dettagli-cliente.page';
import { NuovaFatturaPage } from './pages/nuova-fattura/nuova-fattura.page';
import { EditFatturaPage } from './pages/edit-fattura/edit-fattura.page';
import { EditClientePage } from './pages/edit-cliente/edit-cliente.page';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePage,
    UtentiPage,
    ClientiPage,
    FatturePage,
    DettagliFatturaPage,
    NuovoClientePage,
    FattureClientePage,
    DettagliClientePage,
    NuovaFatturaPage,
    EditFatturaPage,
    EditClientePage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AuthModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
