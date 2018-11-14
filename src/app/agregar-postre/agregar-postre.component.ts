import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PostresService } from "../services/postres.service";
import { Producto } from "../models/producto";
import {ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-agregar-postre',
  templateUrl: './agregar-postre.component.html',
  styleUrls: ['./agregar-postre.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgregarPostreComponent implements OnInit {

  postre: Producto = {
    nombre:'',
    descripcion:'',
    precio:'',
    imagen:'',
    disponible:'',
  };
  
  constructor(private postresService: PostresService,private toastr: ToastrManager) { }

  ngOnInit() {
  }

  onSubmit() {
    if ((this.postre.disponible == 'si'  || this.postre.disponible == 'no') && this.postre.precio != ""  &&
     this.postre.imagen.length > 0 && this.postre.nombre.length > 0 && this.postre.descripcion.length > 0 ) {
      this.postresService.addPostre(this.postre);
      this.postre.nombre = '';
      this.postre.descripcion = '';
      this.postre.precio = '';
      this.postre.imagen = '';
      this.postre.disponible = '';
    }else{
      if(this.postre.disponible != 'si' && this.postre.disponible != 'no'){
        this.toastr.errorToastr('Opcion invalida en el campo disponibilidad', 'HUBO UN ERROR!');
      }
      if(this.postre.precio == ""){
        this.toastr.errorToastr('El campo precio no puede estar vacio', 'HUBO UN ERROR!');
      }
      if(this.postre.imagen.length == 0){
        this.toastr.errorToastr('El campo imagen no puede estar vacio', 'HUBO UN ERROR!');
      }
      if(this.postre.nombre.length == 0){
        this.toastr.errorToastr('El campo nombre no puede estar vacio', 'HUBO UN ERROR!');
      }
      if(this.postre.descripcion.length  == 0){
        this.toastr.errorToastr('El campo descripcion no puede estar vacio', 'HUBO UN ERROR!');
      }
    }
  }

}
