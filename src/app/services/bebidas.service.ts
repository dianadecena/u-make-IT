import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BebidasService {
  productsCollection: AngularFirestoreCollection<Producto>;
  bebidas:Observable<Producto[]>;
  bebidaDoc:AngularFirestoreDocument<Producto>;
  product:AngularFirestoreDocument<Producto>;

  result:any;

  constructor(public angularFirestore:AngularFirestore) { 
    this.productsCollection = this.angularFirestore.collection('bebidas');
    this.bebidas = this.productsCollection.snapshotChanges().pipe(map(changes =>{
      return changes.map(a => {
        const data = a.payload.doc.data() as Producto;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
   }

   getBebidas() {
    return this.angularFirestore.collection('bebidas').snapshotChanges().pipe(map(changes =>{
       return changes.map(a =>{
         const data = a.payload.doc.data() as Producto;
         data.id = a.payload.doc.id;
         return data;
       });
     }));
   }

   addBebida(bebida:Producto){
     this.productsCollection.add(bebida);
   }

  updateBebida(bebida: Producto) {
    this.bebidaDoc = this.angularFirestore.doc(`bebidas/${bebida.id}`);
    this.bebidaDoc.update(bebida);
  }

  deleteBebida(bebida: Producto) {
    this.bebidaDoc = this.angularFirestore.doc(`bebidas/${bebida.id}`);
    this.bebidaDoc.delete();
  }

}