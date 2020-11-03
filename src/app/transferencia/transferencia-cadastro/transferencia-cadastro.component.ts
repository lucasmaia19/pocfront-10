import { MessageService } from 'primeng/api';
import { TransferenciaCadastroService } from './../transferencia-cadastro.service';

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

export class Formulario {
  id: number;
  placa: string;
  chassi: string;
  renavam: string;
  valorRecebido: string;
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

  ngOnInit() {
    const idFormulario = this.route.snapshot.params['id'];

    if (idFormulario) {
      this.carregarFormulario(idFormulario);
    } else {
      this.formulario.cnpj = "CNPJ";
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
    .then(Formulario => {
      this.formulario = Formulario;
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
