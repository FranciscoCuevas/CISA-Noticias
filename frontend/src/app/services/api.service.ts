import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = '/api';  // Usará el proxy

  constructor(private http: HttpClient) { }

  // Método de prueba para conectar con FastAPI
  getHealthCheck(): Observable<any> {
    return this.http.get(`${this.baseUrl}/health`);
  }

  // Método genérico GET
  get(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${endpoint}`);
  }

  // Método genérico POST
  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${endpoint}`, data);
  }

  // Método genérico PUT
  put(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${endpoint}`, data);
  }

  // Método genérico DELETE
  delete(endpoint: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${endpoint}`);
  }
}