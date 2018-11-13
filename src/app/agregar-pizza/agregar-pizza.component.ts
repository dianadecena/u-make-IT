import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PizzasService } from "../services/pizzas.service";
import { Producto } from "../models/producto";
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-pizza',
  templateUrl: './agregar-pizza.component.html',
  styleUrls: ['./agregar-pizza.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgregarPizzaComponent implements OnInit {
  pizza: Producto = {
    nombre:'',
    descripcion:'',
    precio:'',
    imagen:'',
    disponible:'',
  };

  constructor(private pizzasService: PizzasService) { }

  ngOnInit() {
  }

   onSubmit() {
    if ((this.pizza.disponible == 'si'  || this.pizza.disponible == 'no') && this.pizza.precio != ""  &&
     this.pizza.imagen.length > 0 && this.pizza.nombre.length > 0 && this.pizza.descripcion.length > 0 ) {
      this.pizzasService.addPizza(this.pizza);
      this.pizza.nombre = '';
      this.pizza.descripcion = '';
      this.pizza.precio = '';
      this.pizza.imagen = '';
      this.pizza.disponible = '';
      this.mensaje = "La operacion se ha realizado exitosamente";
      console.log("bien");
    }else{
      this.mensaje = "Hay algun error en los campos ingresados o falta alguno por rellenar";
      console.log("error");
    }
  }

}
