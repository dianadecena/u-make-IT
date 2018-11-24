import { Component, OnInit } from '@angular/core';
import { PostresService } from '../services/postres.service';
import { Producto } from '../models/producto';
import { AuthService } from '../services/auth.service';
import { Item } from '../models/item';
import {ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-postres',
  templateUrl: './postres.component.html',
  styleUrls: ['./postres.component.scss']
})
export class PostresComponent implements OnInit {

  postres:Producto[];
  combinedArray: { nombres: any, precios: any }[] = [];
  postre: Producto = {
    nombre:'',
    descripcion:'',
    precio:'',
    imagen:'',
    disponible:'',
  }

  folder:any;
  editing: boolean = false;
  editingPostre: Producto;
  public admin = this.auten.isAdmin();

  constructor(private postresService: PostresService, private auten: AuthService,private toastr: ToastrManager) {}

  ngOnInit() {
    this.postresService.getPostres().subscribe(postres =>{
      this.postres = postres;
    });
  }

  editPostre(event, postre) {
   this.editing = !this.editing;
   this.editingPostre = postre;
  }

  updatePostre() {
   this.postresService.updatePostre(this.editingPostre);
   this.editingPostre = {} as Producto;
   this.editing = false;
  }

  deletePostre(event, postre) {
   if(confirm("¿Estás seguro que deseas borrar este producto?")) {
     this.postresService.deletePostre(postre);
     this.toastr.successToastr('Se elimino correctamente el producto', 'OPERACION EXITOSA!');
   } 
  }

  addToCart(n: string, p: number) {
     var item: Item = {
      nombre: n,
      precio: p
     }
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
            cart[index] = JSON.stringify(item);
            localStorage.setItem("cart", JSON.stringify(cart));
          }
  }
    this.toastr.successToastr('Se agrego el producto al carrito de compras', 'OPERACION EXITOSA!');
  }
}