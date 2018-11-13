import { Component, OnInit } from '@angular/core';
import { PizzasService } from '../services/pizzas.service';
import { Producto } from '../models/producto';
import { AuthService } from '../auth.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css']
})
export class PizzasComponent implements OnInit {
  pizzas:Producto[];
  private items: Item[] = [];
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

  constructor(private pizzasService: PizzasService, private auten: AuthService) {}

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
   this.pizzasService.updatePizza(this.editingPizza);
   this.editingPizza = {} as Producto;
   this.editing = false;
  }

  deletePizza(event, pizza) {
   this.pizzasService.deletePizza(pizza);
  }

  addToCart(n: string, p: number) {
     var item: Item = {
      nombre: n;
      precio: p;
     }
     let cart: any = [];
     cart.push(JSON.stringify(item));
     localStorage.setItem('cart', JSON.stringify(cart));
  }

}