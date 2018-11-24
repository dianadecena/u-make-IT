import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExtrasService {
  productsCollection: AngularFirestoreCollection<Producto>;
  extras:Observable<Producto[]>;
  extraDoc:AngularFirestoreDocument<Producto>;

  result:any;

  constructor(public angularFirestore:AngularFirestore) { 
    this.productsCollection = this.angularFirestore.collection('extras');
    this.extras = this.productsCollection.snapshotChanges().pipe(map(changes =>{
      return changes.map(a => {
        const data = a.payload.doc.data() as Producto;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
   }

   getExtras() {
    return this.angularFirestore.collection('extras').snapshotChanges().pipe(map(changes =>{
       return changes.map(a =>{
         const data = a.payload.doc.data() as Producto;
         data.id = a.payload.doc.id;
         return data;
       });
     }));
   }

   addExtra(extra:Producto){
     this.productsCollection.add(extra);
   }

  updateExtra(extra: Producto) {
    this.extraDoc = this.angularFirestore.doc(`extras/${extra.id}`);
    this.extraDoc.update(extra);
  }

  deleteExtra(extra: Producto) {
    this.extraDoc = this.angularFirestore.doc(`extras/${extra.id}`);
    this.extraDoc.delete();
  }

}