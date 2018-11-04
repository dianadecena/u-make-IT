import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators,FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changeForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private auten: AuthService, private fb: FormBuilder) { 
    this.createForm();
  }

  createForm() {
    this.changeForm = this.fb.group({
      password: ['', ],
      password2: ['',]
    });
  }

  ngOnInit() {

  }

  tryChangePassword(value){
    if(value.password == value.password2){
      this.auten.doChangePassword(value);
      this.successMessage = 'La contraseña se ha cambiado correctamente';
    }else{
      this.errorMessage = 'Las contraseñas ingresadas NO son iguales';
    }
    
  }
}
