import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public fireservices:AngularFirestore) { }

  create_Newcontato(Registro)
  {
    return this.fireservices.collection('ContatosFB').add(Registro);
  }

  get_Allcontato()
  {
    return this.fireservices.collection('ContatosFB').snapshotChanges();
  }

  update_contato(registroid, registro)
  {
    this.fireservices.doc('ContatosFB/' + registroid).update(registro);
  }

  delete_contato(registro_id)
  {
    this.fireservices.doc('ContatosFB/' + registro_id).delete();
  }
}
