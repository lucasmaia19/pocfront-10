import { MessageService } from 'primeng/api';
import { TransferenciaCadastroService } from './../transferencia-cadastro.service';

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

export class Formulario {
  id: number;
  placa: string;
  chassi: string;
  renavam: string;
  valorRecebido: number;
  dataAquisicao: Date;
  numeroCRV: string;
  dataLeilao: Date;
  ufOrigem: string;
  nomeAdquirente: string;
  cnpj: string;

  cnpjNumero: string;
  municipioEmplacamento: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  enderecoCorrespondencia: string;
  cpf: string;
  cpfNumero: string;
  motivoJudicial: string;
  ordemJudicial: string;
  financiamento: string;
  categoria: string;
  cilindros: string;
  ipva: string;
  atividade: string;
  alterarCaracteristicas: string;
}

@Component({
  selector: 'app-transferencia-cadastro',
  templateUrl: './transferencia-cadastro.component.html',
  styleUrls: ['./transferencia-cadastro.component.css']
})
export class TransferenciaCadastroComponent implements OnInit {

  cadastros = new Array<Formulario>();

  formulario = new Formulario();

  constructor(
    private transferenciaCadastroService: TransferenciaCadastroService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
    ) { }

    pt: any;

  ngOnInit() {


    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar'
  }

    const idFormulario = this.route.snapshot.params['id'];

    if (idFormulario) {
      this.carregarFormulario(idFormulario);
    } else {
      this.formulario.cnpj = "CNPJ";
      this.formulario.enderecoCorrespondencia = "Sim";
      this.formulario.alterarCaracteristicas = "Não";
    }

    this.consultar();

    this.formulario.placa;
  }

  get editando() {
    return Boolean(this.formulario.id)
  }

  consultar() {
    this.transferenciaCadastroService.consultar()
      .then((dados: Formulario[]) => {
        this.cadastros = dados;
    })
  }

  carregarFormulario(id: number) {
    this.transferenciaCadastroService.consultarId(id)
    .then(formulario => {

     let dataAquisicao = moment(formulario.dataAquisicao, "DDMMYYYY");
     console.info("data tipo Moment aquisicao: " + dataAquisicao.format("DD/MM/YYYY"));
     formulario.dataAquisicao = dataAquisicao.toDate();

     let dataLeilao = moment(formulario.dataLeilao, "DDMMYYYY");
     console.info("data tipo moment leilao: " + dataLeilao.format("DD/MM/YYYY"));
     formulario.dataLeilao = dataLeilao.toDate();

     console.info(formulario.valorRecebido)

     this.formulario = formulario;
    })
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizar(form);
    } else {
      this.adicionar(form);
    }
  }

  adicionar(form: FormControl) {
    console.log("metodo adicionar")
    console.warn('formulario', this.formulario);
    this.transferenciaCadastroService.adicionar( this.formulario )
    .then(cadastros => {
      this.messageService.add({severity:'success', summary:'Cadastro adicionado com sucesso!'});
      this.consultar();

      this.router.navigate(['']);
    });
  }

  atualizar(form: FormControl) {
    console.log("id component", this.formulario)

    console.warn("this.formulario.dataAquisicao", this.formulario.dataAquisicao)

    this.transferenciaCadastroService.atualizar(this.formulario)
      .then(() => {
        this.router.navigate(['']);
        this.messageService.add({severity:'success', summary:'Cadastro Atualizado com Sucesso!'});
      });
  }

}
