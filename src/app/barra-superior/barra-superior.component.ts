import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.scss']
})
export class BarraSuperiorComponent implements OnInit {

  

  constructor(private auten: AuthService) { }

  ngOnInit() {
  }

  salir(){
    this.auten.doLogout;
  }

  mostrar(){
    var user = this.auten.usuarioActual;
    console.log(user);
  }

}
