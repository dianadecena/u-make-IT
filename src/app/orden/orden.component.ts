import { Component, OnInit, AfterViewChecked } from "@angular/core";
import { Item } from '../models/item';
import { Extra } from '../models/extra';
import {ToastrManager} from 'ng6-toastr-notifications';
import { of } from 'rxjs';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
 

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.scss']
})

export class OrdenComponent implements OnInit {

  public total: number = 0;
  public subtotal: number = 0;
  public total_extras: number = 0;
  public items: Item[] = [];
  public extra_items: Extra[] = [];
  public impuestos:number=0;

  public payPalConfig?: PayPalConfig;

  constructor(private toastr: ToastrManager) {}

  ngOnInit() {
    this.initConfig();
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
    this.impuestos = this.impuestos + this.total;
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
    this.impuestos = this.impuestos + this.total_extras;
    this.impuestos = this.impuestos*0.15;
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
      this.toastr.successToastr('Se elimino el producto exitosamente');
    }
  }

  private initConfig(){
    this.payPalConfig = new PayPalConfig(
      PayPalIntegrationType.ClientSideREST,
      PayPalEnvironment.Sandbox,
      {
        commit: true,
        client: {
          sandbox:
            'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R'
        },
        button: {
          label: 'paypal',
          layout: 'vertical'
        },
        onAuthorize: (data, actions) => {
          console.log('Authorize');
          return of(undefined);
        },
        onPaymentComplete: (data, actions) => {
          console.log('OnPaymentComplete');
        },
        onCancel: (data, actions) => {
          console.log('OnCancel');
        },
        onError: err => {
          console.log('OnError');
        },
        onClick: () => {
          console.log('onClick');
        },
        validate: (actions) => {
          console.log(actions);
        },
        experience: {
          noShipping: true,
          brandName: 'Angular PayPal'
        },
        transactions: [
          {
            amount: {
              total: 30,
              currency: 'USD',
              details: {
                subtotal: 30.00,
                tax: 0.07,
                shipping: 0.03,
                handling_fee: 1.00,
                shipping_discount: -1.00,
                insurance: 0.01
              }
            },
          }
        ],
        note_to_payer: 'Contact us if you have troubles processing payment'
      }
    );
  }
}
