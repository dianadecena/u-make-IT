import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { PizzasService } from '../services/pizzas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-pizza',
  templateUrl: './agregar-pizza.component.html',
  styleUrls: ['./agregar-pizza.component.scss']
})
export class AgregarPizzaComponent implements OnInit {

  public documentId = null;
  public pizzas = [];
  public currentStatus = 1;

  public newPizzaForm = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    disponible: new FormControl('', Validators.required)
  });

  constructor(
  private pizzasService: PizzasService, 
  private activatedRoute: ActivatedRoute) {
    this.newPizzaForm.setValue({
      id: '',
      nombre: '',
      descripcion: '',
      precio: '',
      imagen: '',
      disponible: ''
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
    var id = params['id'];
    this.editPizza(id);
   });

   this.pizzasService.getPizzas().subscribe((pizzasSnapshot) => {
      this.pizzas = [];
      pizzasSnapshot.forEach((pizzaData: any) => {
        this.pizzas.push({
          id: pizzaData.payload.doc.id,
          data: pizzaData.payload.doc.data()
        });
      });
    });
  }

  public newPizza(form, documentId = this.documentId) {
    //console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus == 1) {
      let data = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio: form.precio,
        imagen: form.imagen,
        disponible: form.disponible
      }
      this.pizzasService.createPizza(data).then(() => {
        //console.log('Documento creado exitósamente!');
        this.newPizzaForm.setValue({
          id: '',
          nombre: '',
          descripcion: '',
          precio: '',
          imagen: '',
          disponible: ''
        });
      }, (error) => {
        console.error(error);
      });
    } else {
      let data = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio: form.precio,
        imagen: form.imagen,
        disponible: form.disponible
      }
      this.pizzasService.updatePizza(documentId, data).then(() => {
        this.currentStatus = 1;
        this.newPizzaForm.setValue({
          id: '',
          nombre: '',
          descripcion: '',
          precio: '',
          imagen: '',
          disponible: ''
        });
        console.log('Documento editado exitósamente');
      }, (error) => {
        console.log(error);
      });
    }
  }

  public editPizza(documentId) {
    let editSubscribe = this.pizzasService.getPizza(documentId).subscribe((pizza) => {
      this.currentStatus = 2;
      this.documentId = documentId;
      this.newPizzaForm.setValue({
        id: documentId,
        nombre: pizza.payload.data().nombre,
        descripcion: pizza.payload.data().descripcion,
        precio: pizza.payload.data().precio,
        imagen: pizza.payload.data().imagen,
        disponible: pizza.payload.data().disponible
      });
      editSubscribe.unsubscribe();
    });
  }

}
