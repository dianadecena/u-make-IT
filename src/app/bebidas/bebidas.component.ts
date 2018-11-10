import { Component, OnInit } from '@angular/core';
import { BebidasService } from '../services/bebidas.service';

@Component({
  selector: 'app-bebidas',
  templateUrl: './bebidas.component.html',
  styleUrls: ['./bebidas.component.scss']
})
export class BebidasComponent implements OnInit {

  public bebidas = [];

  constructor(
    private bebidasService: BebidasService
  ) { }

  ngOnInit() {
    this.bebidasService.getBebidas().subscribe((bebidasSnapshot) => {
      this.bebidas = [];
      bebidasSnapshot.forEach((bebidaData: any) => {
        this.bebidas.push({
          id: bebidaData.payload.doc.id,
          data: bebidaData.payload.doc.data()
        });
      });
    });
  }

}
