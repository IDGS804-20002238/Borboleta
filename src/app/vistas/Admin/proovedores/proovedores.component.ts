import { Component, OnInit } from '@angular/core';
import { ProyectoApiService } from '../../../proyecto-api.service';
import { Proveedor } from '../../../models/modelo-general.model';

@Component({
  selector: 'app-proovedores',
  templateUrl: './proovedores.component.html',
  styleUrls: ['./proovedores.component.css']
})
export class ProovedoresComponent implements OnInit{
  proveedores: Proveedor[] = [];

  constructor(private proyectoApiService: ProyectoApiService) {}

  ngOnInit(): void {
    this.obtenerProveedores();
  }

  obtenerProveedores(): void {
    this.proyectoApiService.getAllProveedores().subscribe(
      (data) => {
        console.error('Esto trae data de proovedores:', data);
        this.proveedores = data;
      },
      (error) => {
        console.error('Error al obtener los proveedores', error);
      }
    );
  }

  cambiarEstatusProveedor(idProveedor: number): void {
    this.proyectoApiService.cambiarEstatusProveedor(idProveedor).subscribe(
      (response) => {
        console.log(`Este es el response`,response );
        // Verificar si la respuesta fue exitosa (statusCode 200)
        if (response && response.isSuccessStatusCode) {
          console.log(`Se cambió el estatus del proveedor con ID ${idProveedor}`);
          // Vuelve a obtener los proveedores actualizados después de cambiar el estatus
          this.obtenerProveedores();
        } else {
          console.error(`Error al cambiar el estatus del proveedor con ID ${idProveedor}`);
          // Aquí puedes manejar el error, mostrar un mensaje al usuario, etc.
        }
      },
      (error) => {
        console.error(`Error al cambiar el estatus del proveedor con ID ${idProveedor}`, error);
        // Aquí puedes manejar el error, mostrar un mensaje al usuario, etc.
      }
    );
  }
  
  
  
  

}
