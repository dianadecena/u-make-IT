import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-barra-productos',
  templateUrl: './barra-productos.component.html',
  styleUrls: ['./barra-productos.component.scss']
})
export class BarraProductosComponent implements OnInit {

  constructor(private auten: AuthService, private router: Router) { }

  ngOnInit() {
    
  }
  
  salir(){
    this.auten.doLogout();
  }

}
