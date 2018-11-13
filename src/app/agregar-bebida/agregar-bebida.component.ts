import { Component, OnInit } from '@angular/core';
import { BebidasService } from "../services/bebidas.service";
import { Producto } from "../models/producto";

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

  mensaje : string = '';

  constructor(private BebidasService: BebidasService) { }

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
      this.mensaje = "La operacion se ha realizado exitosamente";
      console.log("bien");
    }else{
      this.mensaje = "Hay algun error en los campos ingresados o falta alguno por rellenar";
      console.log("error");
    }
  }
}
