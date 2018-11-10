import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BebidasService {

  constructor(
    private firestore: AngularFirestore
  ) {}

  //Crear nueva bebida
  public createBebida(data: any) {
    return this.firestore.collection('bebidas').add(data);
  }

  //Obtener una bebida
  public getBebida(documentId: string) {
    return this.firestore.collection('bebidas').doc(documentId).snapshotChanges();
  }

  //Obtener todas las bebidas
  public getBebidas() {
    return this.firestore.collection('bebidas').snapshotChanges();
  }

  //Actualizar una bebida (editar producto)
  public updateBebida(documentId: string, data: any) {
    return this.firestore.collection('bebidas').doc(documentId).set(data);
  }

  //Borrar una bebida (eliminar producto)
  public deleteBebida(documentId: string) {
    return this.firestore.collection('bebidas').doc(documentId).delete();
  }
}
