import { Router } from '@angular/router';
import { Transferencia } from './../../model/transferencia.model';
import { TransferenciaCadastroService } from '../transferencia-cadastro.service';
import { MessageService, ConfirmationService } from 'primeng/api';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transferencia-pesquisa',
  templateUrl: './transferencia-pesquisa.component.html',
  styleUrls: ['./transferencia-pesquisa.component.css']
})
export class TransferenciaPesquisaComponent implements OnInit {

  cadastros = new Array<Transferencia>();

  cadastro = Transferencia

  requestProgress = false;

  constructor(
    private transferenciaCadastroService: TransferenciaCadastroService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) {

   }

  ngOnInit() {
    this.consultar();
  }

  excluir(id: number) {

    if (this.requestProgress) {
      return;
    }

    this.requestProgress = true;
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
          console.log(id)
          this.transferenciaCadastroService.excluir(id)

          .then(response => {
            console.warn(response)
              this.consultar();
              this.messageService.add({severity:'success', summary: ('Cadastro excluido com sucesso')})
            });
          }
        })
        this.requestProgress = false;

  }

  consultar() {

    if (this.requestProgress) {
      return;
    }

    console.log("fui chamado")
    this.requestProgress = true;
    this.transferenciaCadastroService.consultar()
      .then((dados: Transferencia[]) => {

        this.cadastros = dados;
    })
    .then(response => console.log("requisicao concluida! " + response))
    .catch(erro => this.messageService.add({severity:'error', summary:'ERRO: PUXAR DADOS'}))
    .finally(() => this.requestProgress = false);
  }

  transferenciaPdf(transferencia: Transferencia) {

    if (this.requestProgress) {
      return;
    }

    console.log('transferenciaPdf executado ...');
    this.requestProgress = true;
    this.messageService.add({severity:'info', summary:'PDF Sendo Gerado, ESPERE'});
    console.log(transferencia);

    this.transferenciaCadastroService.transferenciaPdf(transferencia)
      .then(response => {
        this.abrirPDF();
        console.info('retorno do metodo: ', response)
        this.messageService.add({severity:'success', summary:'PDF Gerado, ESPERE ABRIR'});
      })

      .then(response => console.log("requisicao concluida! " + response))
      .catch(erro => this.messageService.add({severity:'error', summary:'ERRO: PREENCHIMENTO DE DADOS'}))
      .finally(() => this.requestProgress = false);

    }

    abrirPDF() {

    console.info('teste() ...');
    this.transferenciaCadastroService.abrirPDF()
    .then(response => {

      console.info('teste() ...');
      console.warn(response);

      console.info('retorno do metodo "abrirPDF": ', response)

      const fileURL = URL.createObjectURL(response);
      window.open(fileURL, '_blank');

    })
    .then(response => console.log("requisicao concluida! " + response))
    .catch(erro => this.messageService.add({severity:'error', summary:'ERRO: ABRIR PDF'}))
    .finally(() => this.requestProgress = false);

  }

  debug() {

    if (this.requestProgress) {
      return;
    }

    console.log("requisicao iniciada...");
    this.requestProgress = true;

    this.transferenciaCadastroService.debug()

      .then(response => console.log("requisicao concluida! " + response))
      .catch(erro => console.error("Erro na requisição: " + erro))
      .finally(() => this.requestProgress = false)

  }

}
