import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { NavbarComponent } from './navbar/navbar.component';

import { AppComponent } from './app.component';
import { TransferenciaPesquisaComponent } from './transferencia/transferencia-pesquisa/transferencia-pesquisa.component';
import { TransferenciaModule } from './transferencia/transferencia.module';
import { TransferenciaCadastroService } from './transferencia/transferencia-cadastro.service';
import { TransferenciaCadastroComponent } from './transferencia/transferencia-cadastro/transferencia-cadastro.component';

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import {ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import {CalendarModule} from 'primeng/calendar';


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
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    ProgressBarModule,
    CalendarModule,

  ],
  providers: [TransferenciaCadastroService, MessageService, ConfirmationService, ProgressBarModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
