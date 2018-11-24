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
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AuthService } from './services/auth.service';
import { BarraProductosComponent } from './barra-productos/barra-productos.component';
import { PizzasService } from './services/pizzas.service';
import { BebidasService } from './services/bebidas.service';
import { PostresService } from './services/postres.service';
import { ExtrasService } from './services/extras.service';
import { AgregarBebidaComponent } from './agregar-bebida/agregar-bebida.component';
import { AgregarPizzaComponent } from './agregar-pizza/agregar-pizza.component';
import { AgregarPostreComponent } from './agregar-postre/agregar-postre.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ng6-toastr-notifications';

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
    path: 'carrito',
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
    component: LoginComponent
  },
  {
    path: 'agregar',
    component: AgregarPizzaComponent
  },
  {
    path: 'agregarB',
    component: AgregarBebidaComponent
  },
  {
    path: 'agregarP',
    component: AgregarPostreComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'personalizar',
    component: PersonalizacionComponent
  },
  {
    path: 'register',
    component: RegistroComponent
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
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
    BarraProductosComponent,
    AgregarBebidaComponent,
    AgregarPizzaComponent,
    AgregarPostreComponent],

  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule, 
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],

  providers: [
    AuthService,
    AngularFirestore,
    PizzasService,
    BebidasService,
    PostresService,
    ExtrasService
  ],

  bootstrap: [AppComponent]

})
export class AppModule { }
