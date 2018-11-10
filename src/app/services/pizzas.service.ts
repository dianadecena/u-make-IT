import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PizzasService {

  constructor(
    private firestore: AngularFirestore
  ) {}

  //Crear nueva pizza
  public createPizza(data: any) {
    return this.firestore.collection('pizzas').add(data);
  }

  //Obtener una pizza
  public getPizza(documentId: string) {
    return this.firestore.collection('pizzas').doc(documentId).snapshotChanges();
  }

  //Obtener todas las pizzas
  public getPizzas() {
    return this.firestore.collection('pizzas').snapshotChanges();
  }

  //Actualizar una pizza (editar producto)
  public updatePizza(documentId: string, data: any) {
    return this.firestore.collection('pizzas').doc(documentId).set(data);
  }

  //Borrar una pizza (eliminar producto)
  public deletePizza(documentId: string) {
    return this.firestore.collection('pizzas').doc(documentId).delete();
  }
}
