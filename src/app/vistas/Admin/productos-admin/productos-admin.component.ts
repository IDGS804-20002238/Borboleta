import { Component , OnInit} from '@angular/core';
import { ProyectoApiService } from '../../../proyecto-api.service';
import { productos } from '../../../models/modelo-general.model';



@Component({
  selector: 'app-productos-admin',
  templateUrl: './productos-admin.component.html',
  styleUrls: ['./productos-admin.component.css']
})
export class ProductosAdminComponent implements OnInit{

  constructor(private proyectoApiService: ProyectoApiService) {}
  ngOnInit(): void {
    this.obtenerProductos();
  }
  productos: productos[] = [];


  obtenerProductos(): void {
    this.proyectoApiService.getAllProductos().subscribe(
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
