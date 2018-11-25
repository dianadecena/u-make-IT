import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Router} from '@angular/router';
import {ToastrManager} from 'ng6-toastr-notifications';

//Importando una clase
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userList: AngularFireList<any>;
  selectedUser: User = new User();
  
  constructor(public afAuth: AngularFireAuth,
    private router: Router,private fire: AngularFireDatabase,
    private toastr: ToastrManager 
  ) { }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
        this.toastr.successToastr('OPERACION EXITOSA','Se ha registrado exitosamente');
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
    localStorage.clear();
    this.router.navigate(['/login']);
    firebase.auth().signOut().then(function() {
      console.log("has salido de la pagina");
    }).catch(function(error) {
      console.log("Ocurrio un error");
    });
  }

showmessage(opcion){
    if(opcion==1){
      this.toastr.successToastr('Se cambio correctamente la contraseña', 'OPERACION EXITOSA');
    }else if(opcion==2){
      this.toastr.errorToastr('No se pudo autenticar','HUBO UN ERROR');
    }else if(opcion==3){
      this.toastr.errorToastr('La contraseña actual ingresada no coincide con la registrada anteriormente','HUBO UN ERROR');
    }
}
  
doChangePassword(value){
    var user = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(
        user.email, 
        value.passwordActual
    );  
    user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
      user.updatePassword(value.password).then(function() {
      }).catch(function(error) {
       
      });
    }).catch(function(error) {
      
    });
}



  usuarioActual(){
    var user = firebase.auth().currentUser;
    if(user){
      var email =firebase.auth().currentUser.email;
      return email;
    }else{
        this.toastr.errorToastr('No se pudo recuperar el email del usuario, reinicie la pagina','HUBO UN ERROR');
    }
  }

  getUser(){ //Obtener userName
      return this.userList = this.fire.list('users');
  }

  insertUser(user: User){ //Guardando el nombre de usuario en DataBase
      this.userList.push({
        userName: user.userName,
        email: user.email
      });
  }

  //Determina si el usuario que ingreaso es administrador o no
  isAdmin(){
    var user = firebase.auth().currentUser;
    if(user.email=='danielmesa635@gmail.com' || user.email=='dianadecena78@gmail.com'){
        console.log("Es un administrador");
        return true;
    }else{
        console.log("NO es un administrador");
        return false;
    }
  }
  
  tryResetPassword(value){
    var auth = firebase.auth();
    var emailAddress = value.email;
    auth.sendPasswordResetEmail(emailAddress).then(function() {
        console.log("Se envio el correo");
    }).catch(function(error) {
       console.log("NO se envio el correo");
    });
  }
 
}
