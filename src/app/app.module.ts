import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { AuthGuardService } from './guards/auth-guard.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './vistas/home/home.component';
import { LoginComponent } from './vistas/login/login.component';
import { ProyectoApiService } from './proyecto-api.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegistroComponent } from './vistas/registro/registro.component';
import { HeaderAdmComponent } from './vistas/Admin/header-adm/header-adm.component';
import { ProovedoresComponent } from './vistas/Admin/proovedores/proovedores.component';
import { ErrorsComponent } from './vistas/errors/errors.component';
import { FooterAdminComponent } from './vistas/Admin/footer-admin/footer-admin.component';
import { MateriaPrimaComponent } from './vistas/Admin/materia-prima/materia-prima.component';
import { ProductosAdminComponent } from './vistas/Admin/productos-admin/productos-admin.component';
import { ProductosClienteComponent } from './vistas/Cliente/productos-cliente/productos-cliente.component';
import { ForbiddenComponent } from './vistas/forbidden/forbidden.component';
import { MateriaPrimaComprasComponent } from './vistas/Admin/materia-prima-compras/materia-prima-compras.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    HeaderAdmComponent,
    ProovedoresComponent,
    ErrorsComponent,
    FooterAdminComponent,
    MateriaPrimaComponent,
    ProductosAdminComponent,
    ProductosClienteComponent,
    ForbiddenComponent,
    MateriaPrimaComprasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    ProyectoApiService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


