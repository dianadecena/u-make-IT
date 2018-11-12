import { Component, OnInit } from '@angular/core';
import { BebidasService } from '../services/bebidas.service';
import { Producto } from '../models/producto';
import { AuthService } from '../auth.service';

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

  constructor(private bebidasService: BebidasService, private auten: AuthService) {}

  public admin = this.auten.isAdmin();

  ngOnInit() {
    this.bebidasService.getBebidas().subscribe(bebidas =>{
      this.bebidas = bebidas;
    });
  }

  editBebida(event, bebida) {
   this.editing = !this.editing;
   this.editingBebida = bebida;
  }

  updateBebida() {
   this.bebidasService.updateBebida(this.editingBebida);
   this.editingBebida = {} as Producto;
   this.editing = false;
  }

  deleteBebida(event, bebida) {
   this.bebidasService.deleteBebida(bebida);
  }

}
