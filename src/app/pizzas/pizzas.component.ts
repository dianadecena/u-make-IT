import { Component, OnInit } from '@angular/core';
import { PizzasService } from '../services/pizzas.service';
import { Producto } from '../models/producto';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css']
})
export class PizzasComponent implements OnInit {
  pizzas:Producto[];
  pizza: Producto = {
    nombre:'',
    descripcion:'',
    precio:'',
    imagen:'',
    disponible:'',
  }
  folder:any;

  constructor(private pizzasService: PizzasService,
  private auten: AuthService) {}

  public admin = this.auten.isAdmin();

  ngOnInit() {
    this.pizzasService.getPizzas().subscribe(pizzas =>{
      this.pizzas = pizzas;
    })
  }
}