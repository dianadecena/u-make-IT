import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

// Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BarraSuperiorComponent } from './barra-superior/barra-superior.component'; 
import { PizzasComponent } from './pizzas/pizzas.component';
import { PrincipalComponent } from './principal/principal.component';
import { OrdenComponent } from './orden/orden.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { BebidasComponent } from './bebidas/bebidas.component';
import { PostresComponent } from './postres/postres.component';
import { FooterComponent } from './footer/footer.component';
import { BarraSuperiorAdminComponent } from './barra-superior-admin/barra-superior-admin.component';
import { PersonalizacionComponent } from './personalizacion/personalizacion.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';

// Routing
import { RouterModule, Routes } from '@angular/router';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

<<<<<<< HEAD
//servicios
import {AuthService} from './auth.service';
import { AgregarPizzaComponent } from './agregar-pizza/agregar-pizza.component';
import { BarraProductosComponent } from './barra-productos/barra-productos.component';
=======
// Servicios
import { AuthService } from './auth.service';
>>>>>>> 725727dd86a9f721793776b098e399254f6108de


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
    path: 'agregar-pizza',
    component: AgregarPizzaComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistroComponent
  },
  {
    path: '**', redirectTo: 'home', pathMatch: 'full'
  }
  ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BarraSuperiorComponent,
    PrincipalComponent,
    PizzasComponent,
    OrdenComponent,
    ChangePasswordComponent,
    BebidasComponent,
    PostresComponent,
    FooterComponent,
    BarraSuperiorAdminComponent,
    PersonalizacionComponent,
    RegistroComponent,
    LoginComponent,
    AgregarPizzaComponent,
    BarraProductosComponent],

  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule, 
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],

  providers: [
    AuthService,
  ],

  bootstrap: [AppComponent]

})
export class AppModule { }
