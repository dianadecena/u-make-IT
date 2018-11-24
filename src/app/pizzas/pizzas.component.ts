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
  public admin = this.auten.isAdmin();

  constructor(private pizzasService: PizzasService, private auten: AuthService,private toastr: ToastrManager) {}
  
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
    this.pizzasService.updatePizza(this.editingPizza);
    this.editingPizza = {} as Producto;
    this.editing = false;
    }

    deletePizza(event, pizza) {
    if(confirm("¿Estás seguro que deseas borrar este producto?")) {
      this.pizzasService.deletePizza(pizza);
      this.toastr.successToastr('Se elimino correctamente el producto', 'OPERACION EXITOSA!');
    } 
    }

    addToCart(n: string, p: number) {
      var item: Item = {
        nombre: n,
        precio: p
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
              cart[index] = JSON.stringify(item);
              localStorage.setItem("cart", JSON.stringify(cart));
            }
    }
            this.toastr.successToastr('Se agrego el producto al carrito de compras', 'OPERACION EXITOSA!');
  }

}