import { Component, OnInit } from '@angular/core';
import { ProyectoApiService } from '../../../proyecto-api.service';
import { productos } from '../../../models/modelo-general.model';
import { DetallePorProductoId } from '../../../models/modelo-general.model';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-productos-admin',
  templateUrl: './productos-admin.component.html',
  styleUrls: ['./productos-admin.component.css']
})
export class ProductosAdminComponent implements OnInit {

  constructor(private proyectoApiService: ProyectoApiService) { }
  ngOnInit(): void {
    this.obtenerProductosActivos();
    this.obtenerProductosInActivos();
  }
  productos: productos[] = [];
  productosInActivos: productos[] = [];
  //agregar productos
  nombre: string = '';
  precio: number | null = null;
  descripcion: string = '';
  image_name: string = '';
  selectedImage: File | null = null;

  punto: number | null = null;
  idUltimoProducto: number | undefined;
  detallesPorProducto: DetallePorProductoId[] = [];
  idProductoDetalleGlobal: number = 0;
  //-------------------------------------


  onImageSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        this.selectedImage = selectedFile;
        this.image_name = selectedFile.name;
      }
    }
  }

  onRegisterProducto(): void {
    const dataNuevoProducto = {
      nombre: this.nombre,
      precio: this.precio,
      descripcion: this.descripcion,
      imageName: this.image_name,
    };
    console.log('dataNuevoProducto: ', dataNuevoProducto);

    Swal.fire({
      title: '¿Registrar Producto?',
      text: '¿Estás seguro que deseas registrar este producto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.proyectoApiService.registrarNuevoProducto(dataNuevoProducto).subscribe(
          (response) => {
            console.log(`Este es el response`, response);
            if (response && response.isSuccessStatusCode) {
              console.log('¡producto registrado!');

              // Obtener el idProducto del último producto
              this.proyectoApiService.getAllProductosActivos().subscribe(
                (data) => {
                  this.productos = data;
                  console.log(data);
                  if (data.length > 0) {
                    const ultimoProducto = data[data.length - 1];
                    this.idUltimoProducto = ultimoProducto.idProducto;
                    console.log('Id del último producto:', this.idUltimoProducto);
              
                    const dataPuntoProducto = {
                      idProducto: this.idUltimoProducto,
                      punto: this.precio,
                    };
              
                    this.proyectoApiService.registrarPuntoProducto(dataPuntoProducto).subscribe(
                      (response) => {
                        if (response && response.isSuccessStatusCode) {
                          console.log('¡punto registrado!');

                          const dataProductoDetalle = {
                            idProducto: this.idUltimoProducto,
                          };
                          // Obtener los detalles del producto y guardarlos en detallesPorProducto
                          this.proyectoApiService.getIdProductoDetalle(dataProductoDetalle).subscribe(
                            (response) => {
                              if (response) {
                                this.idProductoDetalleGlobal = response[0].idProductoDetalle;
                                console.log('idProductoDetalle:', this.idProductoDetalleGlobal);

                              }
                            }
                          );
                        }
                      }
                    );
                  }
                },
              );
              



              //fin productos
            } else {
              console.log('No se pudo registrar el producto');
            }
          },
        );
      }
    });
  }


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

    if (estatus == 0) {
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
    } else {
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
