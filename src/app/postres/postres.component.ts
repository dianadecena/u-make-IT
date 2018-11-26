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
    var aprobado=true;
    if(this.editingPostre.disponible!='si' && this.editingPostre.disponible!='no'){
        this.toastr.errorToastr('Error, opcion valida ingresada en el campo disponibilidad');
        aprobado=false;
    }if(this.editingPostre.nombre == ''){
        this.toastr.errorToastr('Error, el campo nombre no puede estar vacio');
        aprobado=false;
    }if(this.editingPostre.descripcion == ''){
      this.toastr.errorToastr('Error, el campo descripcion no puede estar vacio');
      aprobado=false;
    }if(this.editingPostre.precio == '' || this.editingPostre.precio.length==0 || this.editingPostre.precio=="0" ){
      this.toastr.errorToastr('Error, opcion valida ingresada en el campo precio');
      aprobado=false;
    }if(this.editingPostre.imagen == ''){
      this.toastr.errorToastr('Error, el campo imagen no puede estar vacio');
      aprobado=false;
    }

    if(aprobado==true){
      this.postresService.updatePostre(this.editingPostre);
      this.editingPostre = {} as Producto;
      this.editing = false;
      this.toastr.successToastr('El producto se ha modificado correctamente');
    }
  }

  deletePostre(event, postre) {
   if(confirm("¿Estás seguro que deseas borrar este producto?")) {
     this.postresService.deletePostre(postre);
     this.toastr.successToastr('Se elimino correctamente el postre');
   } 
  }

  addToCart(n: string, p: number) {
      var item: Item = {
      nombre: n,
      precio: p,
      cantidad: 1
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
    this.toastr.successToastr('Se agrego el postre al carrito de compras');
  }
}