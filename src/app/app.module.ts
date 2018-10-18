import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PizzasComponent } from './pizzas/pizzas.component';
import { BebidasComponent } from './bebidas/bebidas.component';
import { OrdenComponent } from './orden/orden.component';
import { ComprasComponent } from './compras/compras.component';
import { HomeComponent } from './home/home.component';
import { BarraSuperiorComponent } from './barra-superior/barra-superior.component';

@NgModule({
  declarations: [
    AppComponent,
    PizzasComponent,
    BebidasComponent,
    OrdenComponent,
    ComprasComponent,
    HomeComponent,
    BarraSuperiorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
