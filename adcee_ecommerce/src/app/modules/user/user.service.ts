
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth-profile/_service/auth.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
 

  constructor(
    private http: HttpClient,
    public authservice: AuthService,) 
    {
      this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
     }

  getUserById(id: string) {
  let headers = new HttpHeaders({'token': this.authservice.token});
  return this.http.get(`${URL_SERVICIOS.replace(/\/$/, '')}/users/${id}`,{ headers });
  }
}

