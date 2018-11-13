import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PostresService } from "../services/postres.service";
import { Producto } from "../models/producto";

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

  mensaje : string = '';

  constructor(private postresService: PostresService) { }

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
      this.mensaje = "La operacion se ha realizado exitosamente";
      console.log("bien");
    }else{
      this.mensaje = "Hay algun error en los campos ingresados o falta alguno por rellenar";
      console.log("error");
    }
  }

}
