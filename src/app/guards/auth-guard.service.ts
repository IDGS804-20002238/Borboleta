// auth-guard.service.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const idRole = localStorage.getItem('idRole');
    if (idRole) {
      switch (parseInt(idRole, 10)) {
        case 1:
          return true;
        case 2:
          this.router.navigate(['/employee-view']);
          break;
        case 3:
          this.router.navigate(['/client-view']);
          break;
        case 4:
          this.router.navigate(['/inactive-client-view']);
          break;
        default:
          // Handle unexpected roles or show an error message
          this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión si el idRole no es válido
          return false;
      }
      return false;
    } else {
      // If idRole is not set, redirect to login page or show an error message
      this.router.navigate(['/login']);
      return false;
    }
  }
}
