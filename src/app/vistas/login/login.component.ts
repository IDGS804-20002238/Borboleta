// login.component.ts
import { Component } from '@angular/core';
import { ProyectoApiService } from '../../proyecto-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private proyectoApiService: ProyectoApiService, private router: Router) { }

  onLogin(): void {
    // Llamamos al método login del servicio ProyectoApiService para enviar las credenciales
    this.proyectoApiService.login(this.email, this.password)
      .subscribe(
        (data) => {
          // Manejar la respuesta de la API aquí
          if (Array.isArray(data) && data.length === 0) {
            // Si el arreglo está vacío, consideramos que el inicio de sesión fue incorrecto
            console.log('Inicio de sesión incorrecto. No se encontraron registros.');
            alert('¡Error en el inicio de sesión! Credenciales incorrectas.');
          } else {
            // Si el arreglo contiene datos, el inicio de sesión fue exitoso
            localStorage.setItem('idRole', data[0].idRole); // Asegúrate de que el objeto de respuesta tenga la propiedad idRole

            // Utiliza el AuthGuardService para redirigir al usuario a la vista correspondiente según el idRole
            if (data.idRole === 1) {
              this.router.navigate(['/admin-view']);
            } else if (data.idRole === 2) {
              this.router.navigate(['/employee-view']);
            } else if (data.idRole === 3) {
              this.router.navigate(['/client-view']);
            } else if (data.idRole === 4) {
              alert('¡Error en el inicio de sesión! Credenciales incorrectas.');
            }
          }
        },
        (error) => {
          // Manejar el error de la API aquí
          console.error('Error en el inicio de sesión:', error);
          alert('¡Error en el inicio de sesión! Credenciales incorrectas o servidor no disponible.');
        }
      );
  }
}
