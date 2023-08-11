import { Component, OnInit, ViewChild  } from '@angular/core';
import { ProyectoApiService } from '../../../proyecto-api.service';
import { Proveedor } from '../../../models/modelo-general.model';
import { materiaPrima } from '../../../models/modelo-general.model';
import Swal from 'sweetalert2';
import { timer } from 'rxjs';


@Component({
  selector: 'app-materia-prima',
  templateUrl: './materia-prima.component.html',
  styleUrls: ['./materia-prima.component.css']
})
export class MateriaPrimaComponent implements OnInit {
  constructor(private proyectoApiService: ProyectoApiService) {}
  ngOnInit(): void {
    this.obtenerProveedores();
    this.obtenerMateriaPrima();
  }

  proveedores: Proveedor[] = [];
  matPrima: materiaPrima[] = [];
  selectedProveedor: number = 0;
  nombre: string = '';
  costo: number | null = null;
  image_name: string = '';
  selectedImage: File | null = null;
  divVisibleComprar: boolean = false;
  divVisibleAgregar: boolean = true;
  pagoTotal: number | null = null;
  cantidadCompra: number | null = null;
  selectedMatPrima: materiaPrima | null = null;

  toggleDiv(matPrima: materiaPrima): void {
    this.divVisibleComprar = !this.divVisibleComprar;
    this.divVisibleAgregar = !this.divVisibleAgregar;
    this.selectedMatPrima = matPrima;

    if (this.divVisibleComprar) {
      localStorage.setItem('selectedMatPrima', JSON.stringify(matPrima));
    } else {
      localStorage.removeItem('selectedMatPrima');
    }
  }





  isFormValid(): boolean {
    return (
      this.nombre.trim() !== '' &&
      (this.selectedProveedor?.toString().trim() ?? '') !== '' &&
      (this.costo?.toString().trim() ?? '') !== '' &&
      (this.selectedImage?.toString().trim() ?? '') !== ''
    );
  }

  isFormValidCompra(): boolean {
    return (
      (this.cantidadCompra?.toString().trim() ?? '') !== ''
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
  

  calcularCostoTotal(): void {
    if (this.cantidadCompra !== null && this.selectedMatPrima !== null && this.selectedMatPrima.costo !== null) {
      this.pagoTotal = this.cantidadCompra * this.selectedMatPrima.costo;
      this.pagoTotal = parseFloat(this.pagoTotal.toFixed(4));
    } else {
      this.pagoTotal = null;
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
    console.log(data);
    // Mostrar SweetAlert de confirmación
    Swal.fire({
      title: '¿Quieres agregar la materia prima?',
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
            Swal.fire('¡Registro exitoso!', '', 'success').then((result) => {
              window.location.reload();
            });;
            }else if (response.statusCode == 500){
              console.log('este es el response',response)
              Swal.fire('¡Error en el servidor!', '', 'error');
            }
            
          },
          (error) => {
            console.error('Error al registrar la materia prima', error);
            Swal.fire('¡Registro fallido!', '', 'error');
          }
        );
      }
    });
  }

  onCompraMateriaPrima(): void{
    if (!this.isFormValidCompra()) {
      Swal.fire('Formulario incompleto', 'llena todos los campos para continuar', 'error');
      return;
    }
    const data = {
      materiaPrimaId: this.selectedMatPrima?.materiaPrimaId,
      cantidadCompra: this.cantidadCompra,
      pagoTotal: this.pagoTotal,
    };
    // Mostrar SweetAlert de confirmación
    Swal.fire({
      title: '¿Quieres comprar la materia prima?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.proyectoApiService.onCompraMateriaPrima(data).subscribe(
          (response) => {
            if(response.statusCode == 200){
              console.log('este es el response',response)
            Swal.fire('¡Compra exitosa!', '', 'success').then((result) => {
              window.location.reload();
            });;
            }else if (response.statusCode == 500){
              console.log('este es el response',response)
              Swal.fire('¡Error en el servidor!', '', 'error');
            }
            
          },
          (error) => {
            console.error('Error al comprar materia prima', error);
            Swal.fire('¡Compra fallida!', '', 'error');
          }
        );
      }
    });
  }
}
