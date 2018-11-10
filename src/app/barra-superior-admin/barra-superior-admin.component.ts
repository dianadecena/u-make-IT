import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router} from '@angular/router';
import {User} from "../models/user";

@Component({
  selector: 'app-barra-superior-admin',
  templateUrl: './barra-superior-admin.component.html',
  styleUrls: ['./barra-superior-admin.component.scss']
})
export class BarraSuperiorAdminComponent implements OnInit {

  userList: User[];
  
  constructor(private auten: AuthService, private router: Router) { }

  public  title = this.auten.usuarioActual();

  ngOnInit() {
    this.auten.getUser()
    .snapshotChanges()
    .subscribe(item=>{
        this.userList = [];
        item.forEach(element =>{
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.userList.push(x as User);
        })
    })
  }

  salir(){
    this.auten.doLogout();
  }


}
