import { Component } from '@angular/core';
import { CrudService } from './service/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'agenda-telefonica';

  contato: any;
  contatoNome: string;
  contatoDescricao: string;
  contatoTelefone: string;
  message: string;


  constructor(public crudservice: CrudService) { }

  ngOnInit() {
    this.crudservice.get_Allcontato().subscribe(data => {

      this.contato = data.map(e => {
        return {
          id: e.payload.doc.id,
          isedit: false,
          nome: e.payload.doc.data()['nome'],
          descricao: e.payload.doc.data()['descricao'],
          telefone: e.payload.doc.data()['telefone'],
        };
      })
      console.log(this.contato);
    });
  }

  CreateRegistro() {
    let Registro = {};
    Registro['nome'] = this.contatoNome;
    Registro['descricao'] = this.contatoDescricao;
    Registro['telefone'] = this.contatoTelefone;

    this.crudservice.create_Newcontato(Registro).then(res => {

      this.contatoNome = "";
      this.contatoDescricao = undefined;
      this.contatoTelefone = "";
      console.log(res);
      this.message = "Contato Registrado";
    }).catch(error => {
      console.log(error);
    });
  }

  EditRegistro(Registro) {
    Registro.isedit = true;
    Registro.editNome = Registro.nome;
    Registro.editDescricao = Registro.descricao;
    Registro.editTelefone = Registro.telefone;

  }

  Updataregistro(registrodata) {
    let registro = {};
    registro['nome'] = registrodata.editNome;
    registro['descricao'] = registrodata.editDescricao;
    registro['telefone'] = registrodata.editTelefone;
    this.crudservice.update_contato(registrodata.id, registro);
    registrodata.isedit = false;
  }

  Deletecontato(registro_id) {
    this.crudservice.delete_contato(registro_id);
  }
}
