import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.scss']
})

export class OrdenComponent implements OnInit {

  private total: number = 0;
  public cart = JSON.parse(localStorage.getItem('cartItems'));
  public prices = JSON.parse(localStorage.getItem('priceItems'));
 
  constructor() {}

  ngOnInit() {
  }

}
