import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Utente } from "../models/utente";


export interface AuthData {
  accessToken: string;
  user: {
    id: number;
    username: string;
    surname: string;
    type: string;
  };
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  URL = environment.pathApi;

  private authSubject = new BehaviorSubject<null|AuthData>(null);
  user$ = this.authSubject.asObservable();
  isLoggedIn$ = this.user$.pipe(map(user=>!!user));

  autologoutTimer:any;

  constructor(private http: HttpClient, private router:Router) {
    this.restoreUser()
  }

  login(data: { username: string; password: string }) {
    return this.http.post<AuthData>(`${this.URL}/api/auth/login`, data).pipe(
      tap((val) => {
      }),
      tap((data) => {
        this.authSubject.next(data);
        localStorage.setItem('user',JSON.stringify(data));
        // const expirationDate = this.jwtHelper.getTokenExpirationDate(data.accessToken) as Date
        // this.autoLogout(expirationDate)
      }),
      catchError(this.errors)
    );
  }

  restoreUser(){
    const userJson = localStorage.getItem('user')
    if (!userJson) {
      return
    }
    const user:AuthData = JSON.parse(userJson)
    // if (this.jwtHelper.isTokenExpired(user.accessToken)) {
     // return
    //}
    this.authSubject.next(user)
    // const expirationDate = this.jwtHelper.getTokenExpirationDate(user.accessToken) as Date
    // this.autoLogout(expirationDate)
  }

  // signup(data: SignupData) {
  //   return this.http
  //     .post(`${this.URL}/api/auth/signup`, data)
  //     .pipe(catchError(this.errors));
  // }

  signup(data: Utente) {
    return this.http.post(`${this.URL}/api/auth/signup`, data).subscribe(res=> {
      console.log(res);
    })
  }

  logout(){
    this.authSubject.next(null)
    this.router.navigate(["/login"])
    localStorage.removeItem('user')
    if (this.autologoutTimer) {
      clearTimeout(this.autologoutTimer)
    }
  }

  autoLogout(expirationDate:Date){
    const expMs = expirationDate.getTime() - new Date().getTime()
   this.autologoutTimer = setTimeout(() => {
      this.logout()
    }, expMs);
  }

  private errors(err: any) {
    switch (err.error) {
      case "Email and password are required":
        return throwError("Email e password sono obbligatorie");
        break;
      case "Email already exists":
        return throwError("Utente gia registrato");
        break;
      case "Email format is invalid":
        return throwError("Email scritta male");
        break;
      case "Cannot find user":
        return throwError("Utente non esiste");
        break;

      default:
        return throwError("Errore nella chiamata");
        break;
    }
  }
}
