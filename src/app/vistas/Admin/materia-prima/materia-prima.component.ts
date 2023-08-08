import { Component, OnInit } from '@angular/core';
import { ProyectoApiService } from '../../../proyecto-api.service';
import { Proveedor } from '../../../models/modelo-general.model';
import Swal from 'sweetalert2';
import { timer } from 'rxjs';

@Component({
  selector: 'app-materia-prima',
  templateUrl: './materia-prima.component.html',
  styleUrls: ['./materia-prima.component.css']
})
export class MateriaPrimaComponent implements OnInit {
  proveedores: Proveedor[] = [];
  selectedProveedor: number = 0;
  nombre: string = '';
  costo: number | null = null;
  image_name: string = '';
  selectedImage: File | null = null;

  constructor(private proyectoApiService: ProyectoApiService) {}

  ngOnInit(): void {
    this.obtenerProveedores();
  }

  isFormValid(): boolean {
    console.log('nombre: ',this.nombre);
    console.log('idproveedor: ',this.selectedProveedor);
    console.log('costo: ',this.costo);
    console.log('rutaimagen: ',this.image_name);
    return (
      this.nombre.trim() !== '' &&
      (this.selectedProveedor?.toString().trim() ?? '') !== '' &&
      (this.costo?.toString().trim() ?? '') !== '' &&
      (this.selectedImage?.toString().trim() ?? '') !== ''
    );
    
  }
  
  


  onImageSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        this.selectedImage = selectedFile;
        this.image_name = selectedFile.name;
      }
    }
  }
  


  getProveedorNombre(idProveedor: number): string {
    const proveedor = this.proveedores.find(proveedor => proveedor.idProveedor === idProveedor);
    return proveedor ? proveedor.nombre : '';
  }

  selectProveedor(idProveedor: number): void {
    this.selectedProveedor = idProveedor;
  }

  obtenerProveedores(): void {
    this.proyectoApiService.getAllProveedores().subscribe(
      (data) => {
        this.proveedores = data;
        console.log(data);
      },
      (error) => {
        console.error('Error al obtener los proveedores', error);
      }
    );
  }

  onRegisterMateriaPrima(): void{
    if (!this.isFormValid()) {
      Swal.fire('Formulario incompleto', 'llena todos los campos para continuar', 'error');
      return;
    }
    const data = {
      provedoresId: this.selectedProveedor,
      nombreMateriaPrima: this.nombre,
      costo: this.costo,
      image_name: this.image_name
    };
    // Mostrar SweetAlert de confirmación
    Swal.fire({
      title: '¿Quieres agregar el proveedor?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.proyectoApiService.onRegisterMateriaPrima(data).subscribe(
          (response) => {
            if(response.statusCode == 200){
              console.log('este es el response',response)
            Swal.fire('¡Registro exitoso!', '', 'success');
            // Esperar 2 segundos antes de recargar la página
            // timer(2000).subscribe(() => window.location.reload());
            }else if (response.statusCode == 409){
              console.log('este es el response',response)
              Swal.fire('¡Proveedor dado de baja!', '', 'error');
            }else if (response.statusCode == 404){
              console.log('este es el response',response)
              Swal.fire('¡Proveedor no existe!', '', 'error');
            }else if (response.statusCode == 500){
              console.log('este es el response',response)
              Swal.fire('¡Error en el servidor!', '', 'error');
            }
            
          },
          (error) => {
            console.error('Error al registrar el proveedor', error);
            Swal.fire('¡Registro fallido!', '', 'error');
          }
        );
      }
    });
  }
}
