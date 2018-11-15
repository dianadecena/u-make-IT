import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder} from '@angular/forms';
import {ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changeForm: FormGroup;

  public  admin = this.auten.isAdmin();
  public  resul;

  constructor(private auten: AuthService, private fb: FormBuilder,private toastr: ToastrManager ) { 
    this.createForm();
  }

  createForm() {
    this.changeForm = this.fb.group({
      passwordActual: ['', ],
      password: ['', ],
      password2: ['',]
    });
  }

  ngOnInit() {

  }

  tryChangePassword(value){
    if(value.password == value.password2){
       this.resul=this.auten.doChangePassword(value);
       this.resetForm();
    }else{
      this.toastr.warningToastr('Las contraseñas ingresadas NO son iguales', 'CUIDADO!');
    }
  }

  resetForm(){//Resetea el formulario
    if(this.changeForm != null){
      this.changeForm.reset();
    } 
  }
}
