import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
import { AuthModel } from '../_models/auth.model';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';


// Roles
export enum UserRole {
  ADMIN = 'admin',
  EMPRENDEDOR = 'emprendedor'
}

//Permisos

export const Permissions = {
  MANAGE_USERS: 'manageUsers',
  MANAGE_ALL_PRODUCTS: 'manageAllProducts',
  MANAGE_OWN_PRODUCTS: 'manageOwnProducts',
  VIEW_CATEGORIES: 'viewCategories',
  MANAGE_SLIDERS: 'manageSliders',
  MANAGE_ALL_CUPONES: 'manageAllCupones',
  MANAGE_OWN_CUPONES: 'manageOwnCupones',
  MANAGE_ALL_DESCUENTOS: 'manageAllDescuentos',
  MANAGE_OWN_DESCUENTOS: 'manageOwnDescuentos'
};

// Mapeo de roles a Permisos

const ROLE_PERMISSIONS = {
  [UserRole.ADMIN]: [
    Permissions.MANAGE_USERS,
    Permissions.MANAGE_ALL_PRODUCTS,
    Permissions.VIEW_CATEGORIES,
    Permissions.MANAGE_SLIDERS,
    Permissions.MANAGE_ALL_CUPONES,
    Permissions.MANAGE_ALL_DESCUENTOS
  ],
  [UserRole.EMPRENDEDOR]: [
    Permissions.MANAGE_OWN_PRODUCTS,
    Permissions.VIEW_CATEGORIES,
    Permissions.MANAGE_OWN_CUPONES,
    Permissions.MANAGE_OWN_DESCUENTOS
  ]
};


@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private currentRole: UserRole | null = null;
  private unsubscribe: Subscription[] = []; 
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  // public fields
  currentUser$: Observable<UserModel>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserModel>;
  isLoadingSubject: BehaviorSubject<boolean>;


  get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserModel) {
    this.currentUserSubject.next(user);
  }

  user: any;
  token: string;
  rol: any;

  constructor(
    // private authHttpService: AuthHTTPService,
    private http: HttpClient,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserModel>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    // const subscr = this.getUserByToken().subscribe();
    // this.unsubscribe.push(subscr);
    this.loadstorage();
  }

  loadstorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.user = JSON.parse(localStorage.getItem("user"));
      this.currentRole = this.user?.rol as UserRole; // Define el rol al cargar el storage
    } else {
      this.user = null;
      this.token = '';
      this.currentRole = null;
    }
  }
  
  // public methods
  isLogued() {
    return ( this.token.length > 5 ) ? true : false;
  }

  // Método para verificar permisos
  hasPermission(permission: string): boolean {
  if (!this.currentRole) return false;
  return ROLE_PERMISSIONS[this.currentRole].includes(permission);
  }

  // Método para obtener rol actual
  getCurrentRole(): UserRole | null {
  return this.currentRole;
  }
  
  // Método para hacer login 
  login(email: string, password: string, rol: string): Observable<any> {
    this.isLoadingSubject.next(true);
    let url = URL_SERVICIOS + (rol === 'admin' ? "/users/login_admin" : "/users/login_seller");
    console.log({ email, password, rol });
    return this.http.post(url,{email, password, rol}).pipe(
      map((auth: any) => {
        console.log(auth)
          if(auth.USER_FRONTED && auth.USER_FRONTED.token){
            return this.setAuthFromLocalStorage(auth);
          }else{
            return auth;
          }
      }),
      // switchMap(() => this.getUserByToken()),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

    // Método para salir (deslogear) del adminstrativo
  logout() {
      // localStorage.removeItem(this.authLocalStorageToken);
      this.user = null;
      this.token = '';
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigate(['/auth/login'], {
        queryParams: {},
      });
    }

  // private methods
  private setAuthFromLocalStorage(auth: any): boolean {
    if (auth.USER_FRONTED?.token) {
      localStorage.setItem('token', auth.USER_FRONTED.token);
      localStorage.setItem('user', JSON.stringify(auth.USER_FRONTED.user));
      
      // Asigna el rol desde la respuesta del backend
      this.currentRole = auth.USER_FRONTED.user.rol; 
      this.user = auth.USER_FRONTED.user;
      this.token = auth.USER_FRONTED.token;
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): AuthModel {
    try {
      const authData = JSON.parse(
        localStorage.getItem(this.authLocalStorageToken)
      );
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
