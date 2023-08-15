import { Component , OnInit} from '@angular/core';
import { ProyectoApiService } from '../../../proyecto-api.service';
import { productos } from '../../../models/modelo-general.model';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-productos-admin',
  templateUrl: './productos-admin.component.html',
  styleUrls: ['./productos-admin.component.css']
})
export class ProductosAdminComponent implements OnInit{

  constructor(private proyectoApiService: ProyectoApiService) {}
  ngOnInit(): void {
    this.obtenerProductosActivos();
    this.obtenerProductosInActivos();
  }
  productos: productos[] = [];
  productosInActivos: productos[] = [];


  
  obtenerProductosActivos(): void {
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

  obtenerProductosInActivos(): void {
    this.proyectoApiService.getAllProductosInActivos().subscribe(
      (data) => {
        this.productosInActivos = data;
        console.log(data);
      },
      (error) => {
        console.error('Error al obtener los proveedores', error);
      }
    );
  }

  cambiarEstatusProducto(idProducto: number, estatus: number): void {
    const data = {
      idProducto: idProducto,
    };

    if (estatus == 0){
      Swal.fire({
        title: '¿Activar Producto?',
        text: '¿Estás seguro que deseas Activar este producto?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          this.proyectoApiService.cambiarEstatusProducto(data).subscribe(
            (response) => {
              console.log(`Este es el response`, response);
              if (response && response.isSuccessStatusCode) {
                this.obtenerProductosActivos();
                this.obtenerProductosInActivos();
                Swal.fire('¡Usuario Activado!', '', 'success').then((result) => {
                  window.location.reload();
                });
              } else {
                Swal.fire('Error', 'No se pudo Activar el usuario', 'error');
              }
            },
            (error) => {
              Swal.fire('Error', 'Ocurrió un error al Activar el usuario', 'error');
            }
          );
        }
      });
    }else{
    Swal.fire({
      title: '¿Desactivar Producto?',
      text: '¿Estás seguro que deseas desactivar este producto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.proyectoApiService.cambiarEstatusProducto(data).subscribe(
          (response) => {
            console.log(`Este es el response`, response);
            if (response && response.isSuccessStatusCode) {
              this.obtenerProductosActivos();
              this.obtenerProductosInActivos();
              Swal.fire('¡Usuario desactivado!', '', 'success').then((result) => {
                window.location.reload();
              });
            } else {
              Swal.fire('Error', 'No se pudo desactivar el usuario', 'error');
            }
          },
          (error) => {
            Swal.fire('Error', 'Ocurrió un error al desactivar el usuario', 'error');
          }
        );
      }
    });
    }

  }



//fin del export
}
