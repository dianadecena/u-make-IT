import { Component, OnInit } from '@angular/core';
import { ExtrasService } from '../services/extras.service';
import { Producto } from '../models/producto';
import { AuthService } from '../services/auth.service';
import { Extra } from '../models/extra';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-personalizacion',
  templateUrl: './personalizacion.component.html',
  styleUrls: ['./personalizacion.component.scss']
})
export class PersonalizacionComponent implements OnInit {
  extras:Producto[];
  extra: Producto = {
    nombre:'',
    descripcion:'',
    precio:'',
    imagen:'',
    disponible:'',
  }
  folder:any;

  editing: boolean = false;
  editingExtra: Producto;

  constructor(private extrasService: ExtrasService, private auten: AuthService, private toastr: ToastrManager) {}

  public admin = this.auten.isAdmin();

  ngOnInit() {
    this.extrasService.getExtras().subscribe(extras =>{
      this.extras = extras;
    });
  }

  editExtra(event, extra) {
   this.editing = !this.editing;
   this.editingExtra = extra;
  }

  updateExtra() {
   this.extrasService.updateExtra(this.editingExtra);
   this.editingExtra = {} as Producto;
   this.editing = false;
  }

  deleteExtra(event, extra) {
   if(confirm("¿Estás seguro que deseas borrar este producto?")) {
     this.extrasService.deleteExtra(extra);
   } 
  }

  addToCart(n: string, p: number) {
     var item: Extra = {
      nombre: n,
      precio: p,
      cantidad: 1
     }
     if (localStorage.getItem('extras') == null) {
          let extra_cart: any = [];
          extra_cart.push(JSON.stringify(item));
          localStorage.setItem('extras', JSON.stringify(extra_cart));
        } else {
          let extra_cart: any = JSON.parse(localStorage.getItem('extras'));
          let index: number = -1;
          for (var i = 0; i < extra_cart.length; i++) {
            let item: Extra = JSON.parse(extra_cart[i]);
            if (item.nombre == n) {
              index = i;
              break;
            }
          }
          if (index == -1) {
            extra_cart.push(JSON.stringify(item));
            localStorage.setItem('extras', JSON.stringify(extra_cart));
          } else {
            let item: Extra = JSON.parse(extra_cart[index]);
            item.cantidad += 1;
            extra_cart[index] = JSON.stringify(item);
            localStorage.setItem("extras", JSON.stringify(extra_cart));
          }
  }
  this.toastr.successToastr('Has agregado un extra al carrito');

}
}