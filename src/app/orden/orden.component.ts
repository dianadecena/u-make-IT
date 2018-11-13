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
    this.items = [];
    let cart = JSON.parse(localStorage.getItem('cart'));
    for(var i=0; i<cart.length; i++) {
      let item = JSON.parse(cart[i]);
      this.items.push({
       nombre: item.nombre,
       precio: item.precio
      });
    }
  }

}
