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
          // Si el arreglo contiene datos, el inicio de sesión fue exitoso
          const idRole = data[0].idRole;
          const nombre = data[0].nombre;
          localStorage.setItem('idRole', idRole);
          localStorage.setItem('Nombre', nombre); 

          // Redirige al usuario según su idRole
          if (idRole === 1) {
            this.router.navigate(['/homeAdmin']);
          } else if (idRole === 2) {
            this.router.navigate(['/home']);
          } else if (idRole === 3) {
            this.router.navigate(['/homeCliente']);
          } else {
            this.router.navigate(['/error']);
          }
        },
        (error) => {
          // Manejar el error de la API aquí
          console.error('Error en el inicio de sesión:', error);
          alert('¡Error en el inicio de sesión! Credenciales incorrectas!.');
        }
      );
  }
}
