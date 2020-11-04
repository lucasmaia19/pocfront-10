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

  constructor(
    private transferenciaCadastroService: TransferenciaCadastroService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
    //private notif: NotificationsService
  ) {

   }

  ngOnInit() {
    this.consultar();
  }


    // excluir(id: number) {

      // console.log(id)
      // this.transferenciaCadastroService.excluir(id)
      // .then(() => {
        // console.log("apagado", id)
          // this.consultar();
          // this.messageService.add({severity:'success', summary:'Cadastro excluído com sucesso!'});
      // });

  // }




  excluir(id: number) {

    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir???',
      accept: () => {
          console.log(id)
          this.transferenciaCadastroService.excluir(id)

          .then(response => {
            console.warn(response)
              this.consultar();
              this.messageService.add({severity:'success', summary: response.TestoDaResposta});
          });

      }
    })

  }

  consultar() {
    console.log("fui chamado")
    this.transferenciaCadastroService.consultar()
      .then((dados: Transferencia[]) => {

        // console.error(dados);

        this.cadastros = dados;
    })
  }

  transferenciaPdf(transferencia: Transferencia) {

    console.log('transferenciaPdf executado ...');
    this.messageService.add({severity:'info', summary:'PDF Sendo Gerado, ESPERE'});
    // this.toasty.success('PDF SENDO GERADO, ESPERE!');
    // alert("PDF SENDO GERADO");
    console.log(transferencia);

    this.transferenciaCadastroService.transferenciaPdf(transferencia)
      .then(response => {
        console.info('retorno do metodo: ', this.abrirPDF())


        // this.toasty.success('PDF GERADO!')
        // this.toasty.success('AGUARDE!')
        // alert("ABRA O PDF!")
      })

      // .catch(erro => this.toasty.error('ERRO: CONFIRA OS DADOS'));
  }

  abrirPDF() {
    console.info('teste() ...');

    this.transferenciaCadastroService.abrirPDF()
    .then(response => {
      this.messageService.add({severity:'info', summary:'Espere 30 segundos'});
      console.info('retorno do metodo: ', response)

      const fileURL = URL.createObjectURL(response);
      window.open(fileURL, '_blank');

    })

    // .catch(erro => this.toasty.error('ERRO: ERROR AO ABRIR PDF'));

  }

}
