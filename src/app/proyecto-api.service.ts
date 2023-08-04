import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
