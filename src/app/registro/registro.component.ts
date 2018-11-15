import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../models/user';
import {ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  registerForm: FormGroup;
  mensaje : string = '';

  constructor(private auten: AuthService, private fb: FormBuilder, private toastr: ToastrManager ) { 
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', ],
      userName: ['', ],
      password: ['',],
      password2:['',]
    });
  }
  ngOnInit() {
    this.auten.getUser();
  }


  tryRegister(value){

    if(value.password != "" &&  value.password2 != "" && (value.password == value.password2) &&
    value.userName != "" && value.email!=""){
           this.auten.doRegister(value)
          .then(res => {
            console.log(res);
            this.auten.insertUser(value); //Guarda email y userName en la base de datos
            this.resetForm();
          }, err => {
            console.log(err);
            this.toastr.errorToastr(err.message,'HUBO UN ERROR');
          })
    }else{
      if(value.password == "" ||  value.password2 == ""){
        this.toastr.errorToastr('Los campos de las contraseñas no pueden estar vacios','HUBO UN ERROR');
      }
      if(value.password != value.password2){
        this.toastr.warningToastr('Las contraseñas ingresadas no son iguales','CUIDADO!');
      }
      if(value.userName == ""){
        this.toastr.errorToastr('El campo userName no puede estar vacio','HUBO UN ERROR');
      }
      if(value.email == ""){
        this.toastr.errorToastr('El campo email no puede estar vacio','HUBO UN ERROR');
      }
    }
  }

  resetForm(){//Resetea el formulario
    if(this.registerForm != null){
      this.registerForm.reset();
      this.auten.selectedUser = new User;
    } 
  }


}
