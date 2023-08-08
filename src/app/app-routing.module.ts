import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './vistas/home/home.component';
import { LoginComponent } from './vistas/login/login.component';
import { RegistroComponent } from './vistas/registro/registro.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { HeaderAdmComponent } from './vistas/Admin/header-adm/header-adm.component';
import { ErrorsComponent } from './vistas/errors/errors.component';
import { ProovedoresComponent } from './vistas/Admin/proovedores/proovedores.component';
import { MateriaPrimaComponent } from './vistas/Admin/materia-prima/materia-prima.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'error', component:  ErrorsComponent},
  { 
    path: 'proovedores', 
    canActivate: [AuthGuardService],
    component:  ProovedoresComponent
  },
  { 
    path: 'materiaPrima', 
    canActivate: [AuthGuardService],
    component:  MateriaPrimaComponent
  },
  { 
    path: 'homeAdmin',
    canActivate: [AuthGuardService],
    component: HeaderAdmComponent 
  },
  // Redirige cualquier ruta desconocida a la página de error 404
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   {
//     path: 'admin-view',
//     canActivate: [AuthGuardService], // Protege la ruta con AuthGuardService
//     component: AdminViewComponent,
//   },
//   {
//     path: 'employee-view',
//     canActivate: [AuthGuardService], // Protege la ruta con AuthGuardService
//     component: EmployeeViewComponent,
//   },
//   {
//     path: 'client-view',
//     canActivate: [AuthGuardService], // Protege la ruta con AuthGuardService
//     component: ClientViewComponent,
//   },
//   {
//     path: 'inactive-client-view',
//     canActivate: [AuthGuardService], // Protege la ruta con AuthGuardService
//     component: InactiveClientViewComponent,
//   },
//   // ... Otras rutas públicas
//   { path: '**', redirectTo: 'login', pathMatch: 'full' }, // Redirige cualquier ruta desconocida al login
// ];

