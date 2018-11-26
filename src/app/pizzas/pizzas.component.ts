import { Component, OnInit } from '@angular/core';
import { PizzasService } from '../services/pizzas.service';
import { Producto } from '../models/producto';
import { AuthService } from '../services/auth.service';
import { Item } from '../models/item';
import {ToastrManager} from 'ng6-toastr-notifications';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css']
})
export class PizzasComponent implements OnInit {

  pizzas:Producto[];

  combinedArray: { nombres: any, precios: any }[] = [];

  pizza: Producto = {
    nombre:'',
    descripcion:'',
    precio:'',
    imagen:'',
    disponible:'',
  }

  folder:any;
  editing: boolean = false;
  editingPizza: Producto;

  constructor(private pizzasService: PizzasService, private auten: AuthService, private toastr: ToastrManager) {}

  public admin = this.auten.isAdmin();

    ngOnInit() {
      this.pizzasService.getPizzas().subscribe(pizzas =>{
        this.pizzas = pizzas;
      });
    }

    editPizza(event, pizza) {
      this.editing = !this.editing;
      this.editingPizza = pizza;
    }

    updatePizza() {
      var aprobado=true;
      if(this.editingPizza.disponible!='si' && this.editingPizza.disponible!='no'){
          this.toastr.errorToastr('Error, opcion valida ingresada en el campo disponibilidad');
          aprobado=false;
      }if(this.editingPizza.nombre == ''){
          this.toastr.errorToastr('Error, el campo nombre no puede estar vacio');
          aprobado=false;
      }if(this.editingPizza.descripcion == ''){
        this.toastr.errorToastr('Error, el campo descripcion no puede estar vacio');
        aprobado=false;
      }if(this.editingPizza.precio == '' || this.editingPizza.precio.length==0 || this.editingPizza.precio=="0" ){
        this.toastr.errorToastr('Error, opcion valida ingresada en el campo precio');
        aprobado=false;
      }if(this.editingPizza.imagen == ''){
        this.toastr.errorToastr('Error, el campo imagen no puede estar vacio');
        aprobado=false;
      }

      if(aprobado==true){
        this.pizzasService.updatePizza(this.editingPizza);
        this.editingPizza = {} as Producto;
        this.editing = false;
        this.toastr.successToastr('El producto se ha modificado correctamente');
      }
    }

    deletePizza(event, pizza) {
      if(confirm("¿Estás seguro que deseas borrar este producto?")) {
        this.pizzasService.deletePizza(pizza);
        this.toastr.successToastr('Se elimino correctamente el producto');
      } 
    }

  addToCart(n: string, p: number) {
     var item: Item = {
      nombre: n,
      precio: p,
      cantidad: 1
     }
     if (localStorage.getItem('cart') == null) {
          let cart: any = [];
          cart.push(JSON.stringify(item));
          localStorage.setItem('cart', JSON.stringify(cart));
        } else {
          let cart: any = JSON.parse(localStorage.getItem('cart'));
          let index: number = -1;
          for (var i = 0; i < cart.length; i++) {
            let item: Item = JSON.parse(cart[i]);
            if (item.nombre == n) {
              index = i;
              break;
            }
          }
          if (index == -1) {
            cart.push(JSON.stringify(item));
            localStorage.setItem('cart', JSON.stringify(cart));
          } else {
            let item: Item = JSON.parse(cart[index]);
            item.cantidad += 1;
            cart[index] = JSON.stringify(item);
            localStorage.setItem("cart", JSON.stringify(cart));
          }
  }
  this.toastr.successToastr('Has agregado una pizza al carrito');

}

}