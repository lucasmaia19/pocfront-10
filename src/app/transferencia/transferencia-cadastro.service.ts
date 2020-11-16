import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Formulario } from './transferencia-cadastro/transferencia-cadastro.component';
import { environment } from './../../environments/environment';
import { Transferencia } from './../model/transferencia.model';

@Injectable()
export class TransferenciaCadastroService {

  transferenciaUrl: string

  constructor(private http: HttpClient) {

    this.transferenciaUrl =  `${environment.apiUrl}`;
  }

  consultar(): Promise<any> {
    return this.http.get('https://pocapidetran.herokuapp.com/api')
    .toPromise()
    .then(response => {return response});
  }

  consultarId(id: number): Promise<Formulario> {
    return this.http.get(`https://pocapidetran.herokuapp.com/api/${id}`)
    .toPromise()
    .then(response => {
      const cadastro = response as Formulario

      return cadastro;
    });

  }

  adicionar(formulario: any): Promise<any> {

    console.warn('formulario', formulario);

    return this.http.post('https://pocapidetran.herokuapp.com/api/', formulario)
    .toPromise()
    .then(response => response);
  }

  excluir(id: number): Promise<any> {
     return this.http.delete(`https://pocapidetran.herokuapp.com/api/${id}`)
     .toPromise()
     .then(response => {
       console.warn(response);
       return response;
      });
  }

  atualizar(formulario: Formulario): Promise<Formulario> {
    console.log("id service", formulario)
   return this.http.put(`https://pocapidetran.herokuapp.com/api/${formulario.id}`, formulario)
    .toPromise()
    .then(response => {

      const cadastro = response as Formulario

      return cadastro;
    });
  }

  transferenciaPdf(transferencia: Transferencia): Promise<any> {

    console.warn('transferencia', transferencia);

    return this.http.post(this.transferenciaUrl, transferencia)
      .toPromise()
      .then(response => response);
  }

    abrirPDF(): Promise<any> {
      console.warn('sertice.teste()');

      return this.http.get('https://pocapidetran.herokuapp.com/api/image', { responseType: 'blob'  })
      // return this.http.get('https://pocapidetran.herokuapp.com/api/image', options)
        .toPromise()
          .then(response=> { console.warn(response); return response; });
    }

    debug(): Promise<any> {
      return this.http.get('http://localhost:8080/api/debug', {responseType: "text"})
      .toPromise()
      .then( response => {return response} )

    }

  }
