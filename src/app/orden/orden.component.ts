import { Component, OnInit } from "@angular/core";
import { Item } from '../models/item';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.scss']
})

export class OrdenComponent implements OnInit {

  private total: number = 0;
  private items: Item[] = [];
 
  constructor() {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart(): void {
   this.items = [];
   this.total = 0;
    let cart = JSON.parse(localStorage.getItem('cart'));
    for(var i=0; i<cart.length; i++) {
      let item = JSON.parse(cart[i]);
      this.items.push({
       nombre: item.nombre,
       precio: item.precio
      });
      this.total += item.precio;
    }
  }

  eliminar(nombre: string): void {
   if(confirm("¿Estás seguro que deseas borrar este producto?")) {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    for(var i=0; i<cart.length; i++) {
    let item: Item = JSON.parse(cart[i]);
     if(item.nombre == nombre) {
       cart.splice(i, 1);
       break;
     }
   }
   localStorage.setItem("cart", JSON.stringify(cart));
   this.loadCart();
   } 
  }

}
