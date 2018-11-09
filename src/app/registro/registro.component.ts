import { Component, OnInit, createPlatformFactory } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

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
        this.successMessage = "Your account has been created";
        this.auten.insertUser(value);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      })
    }else{
      this.errorMessage = 'Las contraseñas ingresadas NO son iguales';
    }
  }

}
