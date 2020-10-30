import { HttpClient } from '@angular/common/http';
import { Formulario } from './transferencia-cadastro/transferencia-cadastro.component';
import { environment } from './../../environments/environment';
import { Transferencia } from './../model/transferencia.model';

import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';


@Injectable()
export class TransferenciaCadastroService {

  transferenciaUrl: string

  constructor(private http: HttpClient) {
    this.transferenciaUrl =  `${environment.apiUrl}`;
  }

  consultar(): Promise<any> {
    return this.http.get('http://localhost:8080/api')
    .toPromise()
    .then(response => {return response});
  }

  consultarId(id: number): Promise<Formulario> {
    return this.http.get(`http://localhost:8080/api/${id}`)
    .toPromise()
    .then(response => {
      const cadastro = response as Formulario

      return cadastro;
    });

  }

  adicionar(formulario: any): Promise<any> {

    console.warn('formulario', formulario);

    return this.http.post('http://localhost:8080/api', formulario)
    .toPromise()
    .then(response => response);
  }

  excluir(id: number): Promise<void> {
     return this.http.delete(`http://localhost:8080/api/${id}`)
     .toPromise()
     .then(() => null)
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
      // .then(response => response.json());
      .then(response => response);
  }




  downloadPDF(): any {
      return this.http.get('http://localhost:8080/api/image', { responseType: 'blob'}

      );
    }

  abrirPDF(): any {

    console.warn('sertice.teste()');

    const options = { responseType: 'blob'  };

    return this.http.get('http://localhost:8080/api/image', {
      responseType: 'blob',
      observe: 'response'
    }).pipe (
      map((res: any) => {
        return new Blob([res.blob()], { type: 'application/pdf' });
      })
    );
  }
}
