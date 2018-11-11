import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PizzasService } from "../services/pizzas.service";
import { Producto } from "../models/producto";
import { ActivatedRoute } from '@angular/router';
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

  newPizzaForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    disponible: new FormControl('', Validators.required)
  });

  constructor(private pizzasService: PizzasService,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
   this.activatedRoute.params.subscribe(params => {
    var id = params['id'];
    this.editarPizza(id);
   });
  }

  onSubmit() {
    if (this.pizza.nombre != '' && this.pizza.descripcion != '') {
      this.pizzasService.addPizza(this.pizza);
      this.pizza.nombre = '';
      this.pizza.descripcion = '';
      this.pizza.precio = '';
      this.pizza.imagen = '';
      this.pizza.disponible = '';
    }
  }

}