import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    HeaderAdmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    ProyectoApiService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


