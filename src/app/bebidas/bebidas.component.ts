import { Component, OnInit } from '@angular/core';
import { BebidasService } from '../services/bebidas.service';
import { Producto } from '../models/producto';
import { AuthService } from '../services/auth.service';
import { Item } from '../models/item';
import {ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-bebidas',
  templateUrl: './bebidas.component.html',
  styleUrls: ['./bebidas.component.scss']
})
export class BebidasComponent implements OnInit {
  bebidas:Producto[];
  bebida: Producto = {
    nombre:'',
    descripcion:'',
    precio:'',
    imagen:'',
    disponible:'',
  }
  folder:any;

  editing: boolean = false;
  editingBebida: Producto;
  mostrar: number=0;
  cantidadE: number=0;

  constructor(private bebidasService: BebidasService, private auten: AuthService,private toastr: ToastrManager) {}

  public admin = this.auten.isAdmin();

  ngOnInit() {
    this.bebidasService.getBebidas().subscribe(bebidas =>{
      this.bebidas = bebidas;
    });
  }

  tryFiltro(value){
    if(value=='0'){
      this.mostrar=0;
    }else if(value=='1'){
      this.mostrar=1;
    }else if(value=='2'){
      this.mostrar=2;
    }
}

  editBebida(event, bebida) {
   this.editing = !this.editing;
   this.editingBebida = bebida;
  }

  updateBebida() {
    var aprobado=true;
    if(this.editingBebida.disponible!='si' && this.editingBebida.disponible!='no'){
        this.toastr.errorToastr('Error, opcion valida ingresada en el campo disponibilidad');
        aprobado=false;
    }if(this.editingBebida.nombre == ''){
        this.toastr.errorToastr('Error, el campo nombre no puede estar vacio');
        aprobado=false;
    }if(this.editingBebida.precio == '' || this.editingBebida.precio.length==0 || this.editingBebida.precio=="0" ){
      this.toastr.errorToastr('Error, opcion valida ingresada en el campo precio');
      aprobado=false;
    }if(this.editingBebida.imagen == ''){
      this.toastr.errorToastr('Error, el campo imagen no puede estar vacio');
      aprobado=false;
    }
    if(aprobado==true){
      this.bebidasService.updateBebida(this.editingBebida);
      this.editingBebida = {} as Producto;
      this.editing = false;
      this.toastr.successToastr('El producto se ha modificado correctamente');
    }
  }

  deleteBebida(event, bebida) {
   if(confirm("¿Estás seguro que deseas borrar este producto?")) {
     this.bebidasService.deleteBebida(bebida);
     this.toastr.successToastr('Se elimino la bebida correctamente');
   } 
  }

   addToCart(n: string, p: number) {
     var item: Item = {
      nombre: n,
      precio: p,
      cantidad: this.cantidadE,
     }
     if(this.cantidadE<=0){
      this.toastr.errorToastr('ingrese una cantidad valida del producto');
     }else{
      if (localStorage.getItem('cart') == null) {
        let cart: any = [];
        cart.push(JSON.stringify(item));
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        let cart: any = JSON.parse(localStorage.getItem('cart'));
        let index: number = -1;
        for (var i = 0; i < cart.length; i++) {
          let item: Item = JSON.parse(cart[i]);
          if (item.nombre == n) {
            index = i;
            break;
          }
        }
        if (index == -1) {
          cart.push(JSON.stringify(item));
          localStorage.setItem('cart', JSON.stringify(cart));
        } else {
          let item: Item = JSON.parse(cart[index]);
          item.cantidad += 1;
          cart[index] = JSON.stringify(item);
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      }
      this.toastr.successToastr('Has agregado una bebida al carrito');
          } 
}

}
