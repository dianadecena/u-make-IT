import { Component, OnInit } from '@angular/core';
import { PizzasService } from '../services/pizzas.service';
import { AuthService } from '../auth.service';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css']
})
export class PizzasComponent implements OnInit {

  public pizzas = [];
  public documentId = null;

  constructor(
    private pizzasService: PizzasService,
    private auten: AuthService) { }

  public  admin = this.auten.isAdmin();

  ngOnInit() {
    this.pizzasService.getPizzas().subscribe((pizzasSnapshot) => {
      this.pizzas = [];
      pizzasSnapshot.forEach((pizzaData: any) => {
        this.pizzas.push({
          id: pizzaData.payload.doc.id,
          data: pizzaData.payload.doc.data()
        });
      });
    });
  }

  public deletePizza(documentId) {
    this.pizzasService.deletePizza(documentId).then(() => {
      console.log('Documento eliminado!');
    }, (error) => {
      console.error(error);
    });
  }

}
