import { Component, OnInit, createPlatformFactory } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  registerForm: FormGroup;
  mensaje : string = '';

  constructor(private auten: AuthService, private fb: FormBuilder) { 
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
    if(value.password == value.password2){
      this.auten.doRegister(value)
      .then(res => {
        console.log(res);
        this.mensaje = "Su cuenta ha sida creada";
        this.auten.insertUser(value); //Guarda email y userName en la base de datos
        this.resetForm();
      }, err => {
        console.log(err);
        this.mensaje = err.message;
      })
    }else{
      this.mensaje = 'Las contraseñas ingresadas NO son iguales';
    }
  }

  resetForm(){//Resetea el formulario
    if(this.registerForm != null){
      this.registerForm.reset();
      this.auten.selectedUser = new User;
    } 
  }


}
