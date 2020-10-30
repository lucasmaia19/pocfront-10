import { Transferencia } from './../../model/transferencia.model';
import { TransferenciaCadastroService } from '../transferencia-cadastro.service';

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

    //private notif: NotificationsService
  ) {

   }

  ngOnInit() {
    this.consultar();
  }

  excluir(id: number) {

    //this.notif.info('Titulo', 'Mensagem');

    /*
    console.log(id);
    this.transferenciaCadastroService.excluir(id)
      .then(() => {
        this.toasty.success('CADASTRO EXCLUÍDO COM SUCESSO!')
        // alert('Cadastro excluída com sucesso!');
        this.consultar();
      });
    */
  }

  consultar() {
    this.transferenciaCadastroService.consultar()
      .then((dados: Transferencia[]) => {

        console.error(dados);

        this.cadastros = dados;
    })
  }

  transferenciaPdf(transferencia: Transferencia) {

    console.log('transferenciaPdf executado ...');
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
      console.info('retorno do metodo: ', response)

      const fileURL = URL.createObjectURL(response);
      window.open(fileURL, '_blank');

    })

    // .catch(erro => this.toasty.error('ERRO: ERROR AO ABRIR PDF'));

  }

}
