import { Component, OnInit } from '@angular/core';
import { PizzasService } from '../services/pizzas.service';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css']
})
export class PizzasComponent implements OnInit {

  public pizzas = [];

  constructor(
    private pizzasService: PizzasService
  ) { }

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

}
