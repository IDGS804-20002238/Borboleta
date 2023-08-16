import { Component, OnInit } from '@angular/core';
import { ProyectoApiService } from '../../../proyecto-api.service';
import { productos } from '../../../models/modelo-general.model';
import { DetallePorProductoId } from '../../../models/modelo-general.model';
import { materiaPrima } from '../../../models/modelo-general.model';
import { materiaPrimaPuntos } from '../../../models/modelo-general.model';
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
    this.obtenerMateriaPrima();
    this.obtenerMateriaPrimaPuntos();

    const storedSelectedMaterias = localStorage.getItem('selectedMaterias');
    if (storedSelectedMaterias) {
      this.selectedMaterias = JSON.parse(storedSelectedMaterias);
    }
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

  matPrima: materiaPrima[] = [];
  matPrimaP: materiaPrimaPuntos[] = [];

  selectedMaterias: any[] = [];
  materiaPrimaSeleccionada: number | null = null;
  selectedMateriaPrima: number = 0;
  cantidadMateriaPrima: number = 0;
  materiaPrimaArray: any[] = [];
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
            if (response && response.isSuccessStatusCode) {
              this.proyectoApiService.getAllProductosActivos().subscribe(
                (data) => {
                  if (data.length > 0) {
                    const ultimoProducto = data[data.length - 1];
                    this.idUltimoProducto = ultimoProducto.idProducto;
  
                    const dataPuntoProducto = {
                      idProducto: this.idUltimoProducto,
                      punto: this.punto,
                    };
  
                    this.proyectoApiService.registrarPuntoProducto(dataPuntoProducto).subscribe(
                      (response) => {
                        if (response && response.isSuccessStatusCode) {
                          const dataProductoDetalle = {
                            idProducto: this.idUltimoProducto,
                          };
  
                          this.proyectoApiService.getIdProductoDetalle(dataProductoDetalle).subscribe(
                            (response) => {
                              if (response) {
                                this.idProductoDetalleGlobal = response[0].idProductoDetalle;
  
                                // Reemplazar idProductoDetalle en los objetos del array
                                this.materiaPrimaArray.forEach((obj) => {
                                  obj.idProductoDetalle = this.idProductoDetalleGlobal;
                                  obj.cantidadUsoMateria = parseInt(obj.cantidadUsoMateria, 10); // Convertir a número entero
                                });
  
                                // Recorrer el array y hacer una solicitud a la API para cada detalle
                                for (const detalle of this.materiaPrimaArray) {
                                  const dataToSend = {
                                    idProductoDetalle: detalle.idProductoDetalle,
                                    materiaPrimaId: detalle.materiaPrimaId,
                                    cantidadUsoMateria: detalle.cantidadUsoMateria,
                                  };
                                
                                  this.proyectoApiService.agregarMateriaPrimaProducto(dataToSend).subscribe(
                                    (response) => {
                                      console.log('esto trae el response de agregar la materiaprima al producto', response);
                                      if (response && response.error && typeof response.error === 'string') {
                                        console.log('Mensaje de error en el response:', response.error);
                                      }
                                      // Puedes manejar la respuesta exitosa de la API aquí
                                    },
                                    (error) => {
                                      console.error('Error en la solicitud a la API:', error);
                                      // Puedes manejar el error aquí
                                    }
                                  );                                  
                                }
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                },
              );
            } else {
              console.log('No se pudo registrar el producto');
            }
          },
        );
      }
    });
  }
  
  
  
  
  

  getMateriaPrimaNombre(materiaPrimaId: number): string {
    const materiaPrima = this.matPrima.find(matPrima => matPrima.materiaPrimaId === materiaPrimaId);
    return materiaPrima ? materiaPrima.nombreMateriaPrima : '';
  }

  selectMateriaPrima(materiaPrimaId: number): void {
    this.selectedMateriaPrima = materiaPrimaId;
  }

  obtenerMateriaPrima(): void {
    this.proyectoApiService.getAllMateriaPrima().subscribe(
      (data) => {
        this.matPrima = data;
      },
      (error) => {
        console.error('Error al obtener la materia prima', error);
      }
    );
  }

  obtenerMateriaPrimaPuntos(): void {
    this.proyectoApiService.getAllMateriaPrimaPuntos().subscribe(
      (data) => {
        this.matPrimaP = data;
      },
      (error) => {
        console.error('Error al obtener la materia prima', error);
      }
    );
  }

  pushMateriaPrima(): void {
    const nuevoObjeto = {
      idProductoDetalle: 0, // Puedes dejarlo en 0 o asignarle el valor que corresponda
      materiaPrimaId: this.selectedMateriaPrima,
      cantidadUsoMateria: this.cantidadMateriaPrima
    };

    this.materiaPrimaArray.push(nuevoObjeto);

    // Imprime el array para verificar
    console.log('Array de Materias Primas:', this.materiaPrimaArray);

    // Limpia los valores para la siguiente entrada
    this.selectedMateriaPrima = 0;
    this.cantidadMateriaPrima = 0;
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
