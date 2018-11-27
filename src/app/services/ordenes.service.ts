import { Orden } from '../models/orden';
import { Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators';
import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  ordenesCollection: AngularFirestoreCollection<Orden>;
  ordenes: Observable<Orden[]>;
  ordenDoc: AngularFirestoreDocument<Orden>;
  
  result:any;

  constructor(public angularFirestore: AngularFirestore) { 
    this.ordenesCollection = this.angularFirestore.collection('ordenes');
    this.ordenes = this.ordenesCollection.snapshotChanges().pipe(map(changes =>{
      return changes.map(a => {
        const data = a.payload.doc.data() as Orden;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  public getOrdenes(){
    return this.angularFirestore.collection('ordenes').snapshotChanges().pipe(map(changes =>{
       return changes.map(a =>{
         const data = a.payload.doc.data() as Orden;
         data.id = a.payload.doc.id;
         return data;
       });
     }));
  };

  public addOrden(orden: Orden){
    this.ordenesCollection.add(orden);
  }

  public deleteOrden(orden: Orden){
    this.ordenDoc = this.angularFirestore.doc(`ordenes/${orden.id}`);
    this.ordenDoc.delete();
  }

  public updateOrden(orden: Orden){
    this.ordenDoc = this.angularFirestore.doc(`ordenes/${orden.id}`);
    this.ordenDoc.update(orden);
  }
}
