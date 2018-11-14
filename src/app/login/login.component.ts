import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrManager) 
    { 
      this.createForm();
    }

    createForm() {
      this.loginForm = this.fb.group({
        email: ['', Validators.required ],
        password: ['',Validators.required]
      });
    }

    tryLogin(value){
      this.authService.doLogin(value)
      .then(res => {
        this.router.navigate(['/home']);
      }, err => {
        console.log(err);
        this.toastr.errorToastr(err.message, 'HUBO UN ERROR');
      })
    }
  
  tryReset(value){
      if(value.email != ""){
        this.authService.tryResetPassword(value);
        this.toastr.successToastr('Revise su Correo Electrónico', 'OPERACION EXITOSA');
      }else{
        this.toastr.warningToastr('Ingrese su Correo Electrónico', 'CUIDADO!');
      }
    }


  ngOnInit() {
  }

}
