import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginAndRegisterComponent } from './login-and-register/login-and-register.component';
import { HomeComponent } from './home/home.component';
import { BarraSuperiorComponent } from './barra-superior/barra-superior.component'; 
import { PizzasComponent } from './pizzas/pizzas.component';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { OrdenComponent } from './orden/orden.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { BebidasComponent } from './bebidas/bebidas.component';
import { PostresComponent } from './postres/postres.component';

const appRoutes:Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'pizzas',
    component: PizzasComponent
  },
  {
    path: 'orden',
    component: OrdenComponent
  },
    {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'bebidas',
    component: BebidasComponent
  },
    {
    path: 'postres',
    component: PostresComponent
  },
  {
    path: '',
    component: LoginAndRegisterComponent
  }
  ]

@NgModule({
  declarations: [
    AppComponent,
    LoginAndRegisterComponent,
    HomeComponent,
    BarraSuperiorComponent,
    PrincipalComponent,
    PizzasComponent,
    OrdenComponent,
    ChangePasswordComponent,
    BebidasComponent,
    PostresComponent],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
