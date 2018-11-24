import { Component, OnInit } from '@angular/core';
import { BebidasService } from "../services/bebidas.service";
import { Producto } from "../models/producto";
import {ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-agregar-bebida',
  templateUrl: './agregar-bebida.component.html',
  styleUrls: ['./agregar-bebida.component.scss']
})
export class AgregarBebidaComponent implements OnInit {

  bebida: Producto = {
    nombre:'',
    descripcion:'',
    precio:'',
    imagen:'',
    disponible:'',
  };

  constructor(private BebidasService: BebidasService,private toastr: ToastrManager) { }

  ngOnInit() {
  }

  onSubmit() {
    if ((this.bebida.disponible == 'si'  || this.bebida.disponible == 'no') && this.bebida.precio != ""  &&
     this.bebida.imagen.length > 0 && this.bebida.nombre.length > 0 && this.bebida.descripcion.length > 0 ) {
      this.BebidasService.addBebida(this.bebida);
      this.bebida.nombre = '';
      this.bebida.descripcion = '';
      this.bebida.precio = '';
      this.bebida.imagen = '';
      this.bebida.disponible = '';
      this.toastr.successToastr('Se agrego la bebida exitosamente');
    }else{
      if(this.bebida.disponible != 'si' && this.bebida.disponible != 'no'){
        this.toastr.errorToastr('Opcion invalida en el campo disponibilidad');
      }
      if(this.bebida.precio == ""){
        this.toastr.errorToastr('El campo precio no puede estar vacio');
      }
      if(this.bebida.imagen.length == 0){
        this.toastr.errorToastr('El campo imagen no puede estar vacio');
      }
      if(this.bebida.nombre.length == 0){
        this.toastr.errorToastr('El campo nombre no puede estar vacio');
      }
      if(this.bebida.descripcion.length  == 0){
        this.toastr.errorToastr('El campo descripcion no puede estar vacio');
      }
    }
  }
}
