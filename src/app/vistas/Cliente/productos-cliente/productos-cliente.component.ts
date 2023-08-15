import { Component, OnInit } from '@angular/core';
import { productos } from '../../../models/modelo-general.model';
import { ProyectoApiService } from '../../../proyecto-api.service';

@Component({
  selector: 'app-productos-cliente',
  templateUrl: './productos-cliente.component.html',
  styleUrls: ['./productos-cliente.component.css']
})
export class ProductosClienteComponent implements OnInit{

  constructor(private proyectoApiService: ProyectoApiService) {}
  ngOnInit(): void {
    this.obtenerProductos();
  }
  productos: productos[] = [];


  obtenerProductos(): void {
    this.proyectoApiService.getAllProductosActivos().subscribe(
      (data) => {
        this.productos = data;
        console.log(data);
      },
      (error) => {
        console.error('Error al obtener los proveedores', error);
      }
    );
  }


}
