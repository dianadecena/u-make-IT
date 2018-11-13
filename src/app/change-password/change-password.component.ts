import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changeForm: FormGroup;
  Mensaje: string = '';
  
  public  admin = this.auten.isAdmin();

  constructor(private auten: AuthService, private fb: FormBuilder) { 
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
       var p = this.auten.doChangePassword(value);
    }else{
      this.Mensaje = 'Las contraseñas ingresadas NO son iguales';
    }
    this.resetForm();
  }

  resetForm(){//Resetea el formulario
    if(this.changeForm != null){
      this.changeForm.reset();
    } 
  }
}
