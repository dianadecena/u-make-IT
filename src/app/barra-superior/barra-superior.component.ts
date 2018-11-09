import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import { Router, Params } from '@angular/router';

import {User} from "../models/user";
import { element } from 'protractor';

@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.scss']
})
export class BarraSuperiorComponent implements OnInit {

  userList: User[];
  
  constructor(private auten: AuthService, private router: Router) { 
    
  }

  public  title = this.auten.usuarioActual();
  /*public title = 'sinaiR@gmail.com';*/
  
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
