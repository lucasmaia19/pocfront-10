import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TransferenciaPesquisaComponent } from './transferencia/transferencia-pesquisa/transferencia-pesquisa.component';
import { TransferenciaCadastroComponent } from './transferencia/transferencia-cadastro/transferencia-cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TransferenciaPesquisaComponent,
    TransferenciaCadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
