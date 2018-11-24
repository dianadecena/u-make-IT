import { Component, OnInit } from "@angular/core";
import { Item } from '../models/item';
import { Extra } from '../models/extra';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.scss']
})

export class OrdenComponent implements OnInit {

  private total: number = 0;
  private subtotal: number = 0;
  private total_extras: number = 0;
  private items: Item[] = [];
  private extra_items: Extra[] = [];
 
  constructor() {}

  ngOnInit() {
    this.loadCart();
    this.loadExtras();
  }

  loadCart(): void {
   this.items = [];
   this.total = 0;
   this.subtotal = 0;
    let cart = JSON.parse(localStorage.getItem('cart'));
    for(var i=0; i<cart.length; i++) {
      let item = JSON.parse(cart[i]);
      this.items.push({
       nombre: item.nombre,
       precio: item.precio,
       cantidad: item.cantidad
      });
      var precio = item.precio;
      var cantidad = item.cantidad;
      var precio_number = parseInt(precio, 10);
      var precio_final = precio_number*cantidad;
      this.total += precio_final;
    }
  }

  loadExtras(): void {
   this.extra_items = [];
   this.total_extras = 0;
    let extra_cart = JSON.parse(localStorage.getItem('extras'));
    for(var i=0; i<extra_cart.length; i++) {
      let extra = JSON.parse(extra_cart[i]);
      this.extra_items.push({
       nombre: extra.nombre,
       precio: extra.precio,
       cantidad: extra.cantidad
      });
      var precio = extra.precio;
      var cantidad = extra.cantidad;
      var precio_number = parseInt(precio, 10);
      var precio_final = precio_number*cantidad;
      this.total_extras += precio_final;
    }
  }

  reloadCart(nombre: string, cant: number): void {
    this.items = [];
    this.total = 0;
    this.subtotal = 0;
    let cart = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      if(item.nombre == nombre) {
        item.cantidad = cant - 1;
      }
      this.items.push({
       nombre: item.nombre,
       precio: item.precio,
       cantidad: item.cantidad
      });
      var precio = item.precio;
      var cantidad = item.cantidad;
      var precio_number = parseInt(precio, 10);
      var precio_final = precio_number*cantidad;
      this.total += precio_final;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  eliminar(nombre: string, cantidad: number): void {
   if(confirm("¿Estás seguro que deseas borrar este producto?")) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    for(var i=0; i<cart.length; i++) {
    let item = JSON.parse(cart[i]);
     if(item.nombre == nombre) {
       if(cantidad==1) {
         cart.splice(i, 1);
         localStorage.setItem("cart", JSON.stringify(cart));
         this.loadCart();
       } else {
       this.reloadCart(nombre, cantidad);
        }  
      }
     }

    }
   }

}
