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
    if (this.pizza.disponible == 'si' || this.pizza.disponible == 'no') {
      this.pizzasService.addPizza(this.pizza);
      this.pizza.nombre = '';
      this.pizza.descripcion = '';
      this.pizza.precio = '';
      this.pizza.imagen = '';
      this.pizza.disponible = '';
    }
  }

}