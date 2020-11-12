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
  //cadastros: Formulario[];

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
      // this.formulario.valorRecebido = this.formulario.valorRecebido + ",00";
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

      //"23051985" > "23/05/1985"
      //"23051985" > Date > "23/05/1985"
      //"23/05/1985" > Date > "1985-05-23"
      //"23/05/1985" > Date > "1985-05-23"

      //"23051985" >  Date;

      //console.log(formulario);

      /*
      console.log(formulario.dataAquisicao);

      let dataAquisicao = moment(formulario.dataAquisicao, "DDMMYYYY");

      console.log(dataAquisicao);

      console.log("Dia: " + dataAquisicao.date() + ", Mes: " + dataAquisicao.month() + ", Ano: " + dataAquisicao.year());

      console.log(dataAquisicao.format("DD/MM/YYYY"))

      console.log(dataAquisicao.format("YYYY"))
      */

     let dataAquisicao = moment(formulario.dataAquisicao, "DDMMYYYY");
     console.info("data tipo Moment aquisicao: " + dataAquisicao.format("DD/MM/YYYY"));
     formulario.dataAquisicao = dataAquisicao.toDate();

     let dataLeilao = moment(formulario.dataLeilao, "DDMMYYYY");
     console.info("data tipo moment leilao: " + dataLeilao.format("DD/MM/YYYY"));
     formulario.dataLeilao = dataLeilao.toDate();


    //  console.info("data tipo moment leilao: " + dataLeilao);
    //  console.info(dataLeilao);

    //  console.info("data tipo moment leilao toDate(): " + dataLeilao.toDate());
    //  console.info(dataLeilao.toDate());


    //  let valorRecebido = formulario.valorRecebido;
    //  console.info("valor recebido :", valorRecebido)

    //  let valorRecebidoformat = Number(valorRecebido)
    //  console.info("valor recebido: ", valorRecebidoformat)

    // valorRecebidoformat = formulario.valorRecebido

    //  this.formulario = formulario;

    //  console.info("data tipo Date: " + dataAquisicaoFormatoDate.getDate() + "/" + (dataAquisicaoFormatoDate.getMonth() + 1) + "/" + dataAquisicaoFormatoDate.getFullYear());

    //  let mesComZeros = (dataAquisicaoFormatoDate.getMonth() + 1);
    //  let mescomZeroString = "";
    //  if (mesComZeros < 10)
      //  mescomZeroString = "0" + mesComZeros;
    //  else
      //  mescomZeroString = mesComZeros + "";

    //  console.info("data tipo Date: " + dataAquisicaoFormatoDate.getDate() + "/" + mescomZeroString + "/" + dataAquisicaoFormatoDate.getFullYear());

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
      // this.toasty.success(`CADASTRO COM A PLACA "${cadastros.placa}" ADICIONADO`);
      this.messageService.add({severity:'success', summary:'Cadastro adicionado com sucesso!'});
      // alert(`Cadastro "${cadastros.placa}" adicionado com o cod ${cadastros.id}`);
      this.consultar();

      this.router.navigate(['']);
    });
  }

  atualizar(form: FormControl) {
    console.log("id component", this.formulario)

    console.warn("this.formulario.dataAquisicao", this.formulario.dataAquisicao)

    //this.formulario.dataAquisicao
    //let dataAquisicaoMoment = moment(this.formulario.dataAquisicao);
    //let dataAquisicaoFormatada = dataAquisicaoMoment.format("DDMMYYYY");
    //this.formulario.dataAquisicao = dataAquisicaoFormatada;

    //let dataAquisicao = moment(formulario.dataAquisicao, "DDMMYYYY");
    //console.info("data tipo Moment: " + dataAquisicao.format("DD/MM/YYYY"));

    this.transferenciaCadastroService.atualizar(this.formulario)
      .then(() => {
        this.router.navigate(['']);
        this.messageService.add({severity:'success', summary:'Cadastro Atualizado com Sucesso!'});
      });
  }

  cnpjj = [
    { label: 'CNPJ', value: 0 }
  ];

}
