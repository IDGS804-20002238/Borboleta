import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header-adm',
  templateUrl: './header-adm.component.html',
  styleUrls: ['./header-adm.component.css']
})
export class HeaderAdmComponent {

  Nombre: string | null = localStorage.getItem('Nombre');
  constructor(private router: Router) { }

  onLogOut(): void {
    localStorage.clear();
    this.router.navigate(['/home']);
    
  }

}
