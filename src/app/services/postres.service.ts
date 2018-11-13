import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()

export class PostresService {

  productsCollection: AngularFirestoreCollection<Producto>;
  postres:Observable<Producto[]>;
  postreDoc:AngularFirestoreDocument<Producto>;

  result:any;

  constructor(public angularFirestore:AngularFirestore) { 
    this.productsCollection = this.angularFirestore.collection('postres');
    this.postres = this.productsCollection.snapshotChanges().pipe(map(changes =>{
      return changes.map(a => {
        const data = a.payload.doc.data() as Producto;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
   }

   getPostres() {
    return this.angularFirestore.collection('postres').snapshotChanges().pipe(map(changes =>{
       return changes.map(a =>{
         const data = a.payload.doc.data() as Producto;
         data.id = a.payload.doc.id;
         return data;
       });
     }));
   }

   addPostre(postre:Producto){
     this.productsCollection.add(postre);
   }

  updatePostre(postre: Producto) {
    this.postreDoc = this.angularFirestore.doc(`postres/${postre.id}`);
    this.postreDoc.update(postre);
  }

  deletePostre(postre: Producto) {
    this.postreDoc = this.angularFirestore.doc(`postres/${postre.id}`);
    this.postreDoc.delete();
  }
}
