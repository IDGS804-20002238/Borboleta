import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proveedor } from './models/modelo-general.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoApiService {
  private apiUrlLogin = 'https://localhost:7109/tenis/login'; // Reemplaza con la URL de tu API a consumir

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Crear el objeto que contiene los datos de email y password
    const data = {
      email: email,
      password: password
    };

    // Realizar la solicitud HTTP POST con los datos en el cuerpo
    return this.http.post<any>(`${this.apiUrlLogin}`, data, { headers: headers });
  }

  private apiUrlRegistro = 'https://localhost:7109/tenis/Registrase'; 

  register(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Realizar la solicitud HTTP POST con los datos en el cuerpo
    return this.http.post<any>(`${this.apiUrlRegistro}`, data, { headers: headers });
  }

  private apiUrlProveedores = 'https://localhost:7109/tenis/MostrarProveedoresActivos'; 

  getAllProveedores(): Observable<Proveedor[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Realizar la solicitud HTTP POST vacía, ya que no se requiere enviar datos en el cuerpo
    return this.http.post<Proveedor[]>(this.apiUrlProveedores, {}, { headers: headers });
  }

  private apiUrlCambiarEstatus = 'https://localhost:7109/tenis/CambiarEstatusProveedor';

  cambiarEstatusProveedor(idProveedor: number): Observable<any> {
    const url = `${this.apiUrlCambiarEstatus}/${idProveedor}`;

    // Realizar la solicitud HTTP POST
    return this.http.post<any>(url, null);
  }

  




}
