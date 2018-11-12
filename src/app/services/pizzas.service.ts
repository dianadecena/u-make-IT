import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PizzasService {
  productsCollection: AngularFirestoreCollection<Producto>;
  pizzas:Observable<Producto[]>;
  pizzaDoc:AngularFirestoreDocument<Producto>;

  result:any;

  constructor(public angularFirestore:AngularFirestore) { 
    this.productsCollection = this.angularFirestore.collection('pizzas');
    this.pizzas = this.productsCollection.snapshotChanges().pipe(map(changes =>{
      return changes.map(a => {
        const data = a.payload.doc.data() as Producto;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
   }

   getPizzas() {
    return this.angularFirestore.collection('pizzas').snapshotChanges().pipe(map(changes =>{
       return changes.map(a =>{
         const data = a.payload.doc.data() as Producto;
         data.id = a.payload.doc.id;
         return data;
       });
     }));
   }

   addPizza(pizza:Producto){
     this.productsCollection.add(pizza);
   }

  updatePizza(pizza: Producto) {
    this.pizzaDoc = this.angularFirestore.doc(`pizzas/${pizza.id}`);
    this.pizzaDoc.update(pizza);
  }

  deletePizza(pizza: Producto) {
    this.pizzaDoc = this.angularFirestore.doc(`pizzas/${pizza.id}`);
    this.pizzaDoc.delete();
  }

}