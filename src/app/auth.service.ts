import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogout(){
    firebase.auth().signOut().then(function() {
      console.log("has salido de la pagina");
    }).catch(function(error) {
      // An error happened.
    });
  }

  doChangePassword(value){
    var user  = firebase.auth().currentUser; 
    user.updatePassword(value.password).then(function() {
        console.log("Se cambio correctamente la contraseña");
    }).catch(function(error) {
        console.log("NO se pudo cambiar contraseña");
    });
}

  usuarioActual(){
    var usuario = firebase.auth().currentUser.email;
    return usuario;
  }

 
}
