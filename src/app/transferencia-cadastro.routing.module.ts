import { TransferenciaCadastroComponent } from './transferencia/transferencia-cadastro/transferencia-cadastro.component';
import { TransferenciaPesquisaComponent } from './transferencia/transferencia-pesquisa/transferencia-pesquisa.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'pesquisa', component: TransferenciaPesquisaComponent },

  { path: 'formulario/:id', component: TransferenciaCadastroComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
   ],
  exports: [RouterModule]
})

// export class TransferenciaCadastroRouting { }
