import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener token guardado en localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // Clonar la petición y añadir el header 'token' con el JWT
      const clonedReq = req.clone({
        setHeaders: {
          token: token
        }
      });
      return next.handle(clonedReq);
    }

    // Si no hay token, enviar la petición sin modificar
    return next.handle(req);
  }
}
