import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  idRole: number = 0;

  constructor(private router: Router) { }

  isNavbarTransparent = true;

  ngOnInit(): void {
    // Obtener el idRole del localStorage
    const storedIdRole = localStorage.getItem('idRole');
    if (storedIdRole) {
      this.idRole = +storedIdRole;
    }
  }

  onLogOut(): void {
    localStorage.clear();
    this.router.navigate(['/home']);
  
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  onScroll() {
    this.isNavbarTransparent = window.scrollY === 0;
  }
  redirectToHome() {
    this.router.navigate(['/home']);
  }
}
