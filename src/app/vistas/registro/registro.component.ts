import { Component } from '@angular/core';
import { ProyectoApiService } from '../../proyecto-api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nombre: string = '';
  correo: string = '';
  contrasenia: string = '';
  idRole: number = 3;
  estado: string = '';
  municipio: string = '';
  codigoPostal: number | null = null;
  colonia: string = '';
  calle: string = '';
  numeroExt: number | null = null;
  numeroInt: number | null = null;
  referencia: string = '';
  isFormValid: boolean = false;

  isFieldEmpty(fieldValue: string | number | null): boolean {
    return fieldValue === null || fieldValue === undefined || fieldValue === '';
  }  

  checkFormValidity(): void {
    this.isFormValid = !!this.nombre && !!this.contrasenia && !!this.estado && !!this.municipio &&
      !!this.codigoPostal && !!this.colonia && !!this.calle && !!this.numeroExt && !!this.referencia;
  }

  constructor(private proyectoApiService: ProyectoApiService) { }
  onRegister(): void {
    // Verificar si el formulario es válido
    this.checkFormValidity();
  
    // Si el formulario es válido, enviar los datos al servidor
    if (this.isFormValid) {
      // Crear el objeto con los datos del formulario y realizar la llamada a la API
      const data = {
        nombre: this.nombre,
        correo: this.correo,
        contrasenia: this.contrasenia,
        idRole: this.idRole,
        domicilio: {
          estado: this.estado,
          municipio: this.municipio,
          codigoPostal: this.codigoPostal,
          colonia: this.colonia,
          calle: this.calle,
          numeroExt: this.numeroExt,
          numeroInt: this.numeroInt,
          referencia: this.referencia
        }
      };
      console.log(data);
      this.proyectoApiService.register(data).subscribe(
        (response) => {
          console.log('Respuesta de la API de registro:', response);
          Swal.fire('¡Registro exitoso!', '', 'success');
          window.location.href = '/login';
        },
        (error) => {
          console.error('Error en el registro:', error);
          Swal.fire('¡Error en el registro!', 'Por favor, verifica los datos ingresados.', 'error');
        }
      );
    }
  }
}
