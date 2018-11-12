import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.scss']
})

export class OrdenComponent implements OnInit {

  private nombres = [];
  private precios = [];
  private total: number = 0;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
   this.activatedRoute.params.subscribe(params => {
     var nombre = params['nombre'];
     var precio = params['precio'];
     this.nombres.push(nombre);
     this.precios.push(precio);
     this.calcularTotal(precio);
   });
  }

  calcularTotal(precio) {
    this.total += precio;
  }

}
