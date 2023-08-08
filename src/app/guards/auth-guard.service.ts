import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HostListener } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  private allowedRoutesForEmployee: string[] = [
    '/login',
    '/home',
    '/homeAdmin',
  ];

  constructor(private router: Router) {}

  currentUrl: string = window.location.href;

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    this.currentUrl = window.location.href;
  }

  canActivate(): boolean {
    const idRole = parseInt(localStorage.getItem('idRole') ?? '0', 10);
    console.log('Esto trae el idrole del auth', idRole);
    switch (idRole) {
      case 1: // Admin
        return true;
  
      case 2: // Empleado
        const currentRoute = this.router.url;
        console.log('Esto trae el currentRoute :', currentRoute);
  
        if (!this.allowedRoutesForEmployee.includes(currentRoute)) {
          // Aquí puedes usar la propiedad currentUrl
          if (this.currentUrl.includes('/homeAdmin')) {
            return true;
          } else {
            this.router.navigate(['/error']);
            return false;
          }
        }
        return true;
  
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
