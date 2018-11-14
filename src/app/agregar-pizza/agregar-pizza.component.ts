import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PizzasService } from "../services/pizzas.service";
import { Producto } from "../models/producto";
import {ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-agregar-pizza',
  templateUrl: './agregar-pizza.component.html',
  styleUrls: ['./agregar-pizza.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgregarPizzaComponent implements OnInit {
  public mensaje: string;
  pizza: Producto = {
    nombre:'',
    descripcion:'',
    precio:'',
    imagen:'',
    disponible:'',
  };

  constructor(private pizzasService: PizzasService,private toastr: ToastrManager) { }

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
      this.toastr.successToastr('Se agrego el producto exitosamente', 'OPERACION EXITOSA!');
    }else{
      if(this.pizza.disponible != 'si' && this.pizza.disponible != 'no'){
        this.toastr.errorToastr('Opcion invalida en el campo disponibilidad', 'HUBO UN ERROR!');
      }
      if(this.pizza.precio == ""){
        this.toastr.errorToastr('El campo precio no puede estar vacio', 'HUBO UN ERROR!');
      }
      if(this.pizza.imagen.length == 0){
        this.toastr.errorToastr('El campo imagen no puede estar vacio', 'HUBO UN ERROR!');
      }
      if(this.pizza.nombre.length == 0){
        this.toastr.errorToastr('El campo nombre no puede estar vacio', 'HUBO UN ERROR!');
      }
      if(this.pizza.descripcion.length  == 0){
        this.toastr.errorToastr('El campo descripcion no puede estar vacio', 'HUBO UN ERROR!');
      }
    }
  }
}
