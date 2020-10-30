import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { TransferenciaCadastroService } from './transferencia/transferencia-cadastro.service';
import { RouterModule, Routes } from '@angular/router';
import { TransferenciaModule } from './transferencia/transferencia.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TransferenciaPesquisaComponent } from './transferencia/transferencia-pesquisa/transferencia-pesquisa.component';
import { TransferenciaCadastroComponent } from './transferencia/transferencia-cadastro/transferencia-cadastro.component';
import { FormsModule }   from '@angular/forms';
import {ButtonModule} from 'primeng/button';


const routes: Routes = [
  { path: '', component: TransferenciaPesquisaComponent },

  { path: 'formulario/:id', component: TransferenciaCadastroComponent },

  { path: 'formulario', component: TransferenciaCadastroComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TransferenciaPesquisaComponent,
    TransferenciaCadastroComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    TransferenciaModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    ButtonModule

  ],
  providers: [TransferenciaCadastroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
