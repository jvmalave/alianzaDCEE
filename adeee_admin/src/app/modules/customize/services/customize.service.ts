import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from '../../../config/config';
import { finalize } from 'rxjs/operators';

export interface Config {
  tasaCambio_bcv: number;
  porc_iva: number;
  fecha_vigencia?: string;                // si usas fecha vigencia también
  fechaActualizacion_tasaCambio?: string; // o tipo Date según cómo manejes la fecha
  fechaActualizacion_iva?: string;         // o tipo Date
}

@Injectable({
  providedIn: 'root'
})
export class CustomizeService {

  isLoading$: Observable<boolean>;
  private isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    private authservice: AuthService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  // Obtener configuración
  getConfig(): Observable<Config> {
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({ 'token': this.authservice.token });
    const URL = `${URL_SERVICIOS}/config`;  // Ajusta el endpoint si es necesario
    return this.http.get<Config>(URL, { headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  // Actualiza tasa de Cambio
  updateTasaCambio(data: { tasaCambio_bcv: number; fecha_vigencia: string }): Observable<any> {
  this.isLoadingSubject.next(true);
  const headers = new HttpHeaders({ token: this.authservice.token });
  const URL = `${URL_SERVICIOS}/config/tasa-cambio`;
  return this.http.put(URL, data, { headers }).pipe(finalize(() => this.isLoadingSubject.next(false)));
}

// Actualiza porcentaje de IVA
updatePorcIva(data: { porc_iva: number }): Observable<any> {
  this.isLoadingSubject.next(true);
  const headers = new HttpHeaders({ token: this.authservice.token });
  const URL = `${URL_SERVICIOS}/config/porc-iva`;
  return this.http.put(URL, data, { headers }).pipe(finalize(() => this.isLoadingSubject.next(false)));
}


  // // Actualizar configuración
  // updateConfig(data: Config): Observable<any> {
  //   this.isLoadingSubject.next(true);
  //   const headers = new HttpHeaders({ 'token': this.authservice.token });
  //   const URL = `${URL_SERVICIOS}/config`;  // Igual endpoint PUT
  //   return this.http.put(URL, data, { headers }).pipe(
  //     finalize(() => this.isLoadingSubject.next(false))
  //   );
  // }
}

