import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  
  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  
  allUsers(search:any) {
  this.isLoadingSubject.next(true);
  let headers = new HttpHeaders({'token': this.authservice.token});
  let URL = URL_SERVICIOS + "/users/list?search=" + search;
  return this.http.get(URL, { headers: headers }).pipe(
    finalize(() => this.isLoadingSubject.next(false))
  );
}


  createUser(data:any){
    this.isLoadingSubject.next(true);
    let headers =new HttpHeaders({'token':this.authservice.token});
    let URL = URL_SERVICIOS + "/users/register_admin";
    return this.http.post(URL,data,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }


  updateUser(data:any){
    this.isLoadingSubject.next(true);
    let headers =new HttpHeaders({'token':this.authservice.token});
    let URL = URL_SERVICIOS + "/users/update";
    return this.http.put(URL,data,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  deleteUser(user_id:any){
    this.isLoadingSubject.next(true);
    let headers =new HttpHeaders({'token':this.authservice.token});
    let URL = URL_SERVICIOS + "/users/delete?_id="+user_id;
    return this.http.delete(URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
}
