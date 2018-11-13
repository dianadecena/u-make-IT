import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder) 
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
        this.errorMessage = err.message;
      })
    }
  
  tryReset(value){
      if(value.email != ""){
        this.authService.tryResetPassword(value);
        this.errorMessage = "Revise su Correo Electrónico";
      }else{
        this.errorMessage = "Ingrese su Correo Electrónico";
      }
    }


  ngOnInit() {
  }

}
