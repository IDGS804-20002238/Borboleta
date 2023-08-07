import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  // Define las rutas permitidas para el rol de administrador
  private allowedRoutesForEmployee: string[] = [
    '/home',
    // Agrega aquí más rutas permitidas para el rol de administrador
  ];

  constructor(private router: Router) {}

  canActivate(): boolean {
    const idRole = parseInt(localStorage.getItem('idRole') ?? '0', 10);
    console.log('Esto trae el idrole del auth', idRole);

    switch (idRole) {
      case 1: // Admin
        // Verificar si la URL actual está permitida para el rol de administrador
        return true;

      case 2: // Empleado
        const currentRoute = this.router.url;
        if (!this.allowedRoutesForEmployee.includes(currentRoute)) {
          // Si la URL no está permitida, redirigir al administrador a la página de error 404
          this.router.navigate(['/error']);
          return false;
        }else{
           // Si es empleado, redirigir a /homeEmployee
        this.router.navigate(['/homeEmployee']);
        return false;
        }
       

      case 3: // Cliente
        // Si es cliente, redirigir a /homeCliente
        this.router.navigate(['/homeCliente']);
        return false;

      case 4: // Desactivado
        // Si está desactivado, redirigir a /inactive-client-view
        this.router.navigate(['/inactive-client-view']);
        return false;

      default:
        // Si el idRole no es válido, redirigir a /error
        this.router.navigate(['/error']);
        return false;
    }
  }
}
