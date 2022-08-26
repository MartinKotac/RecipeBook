import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject, tap} from "rxjs";
import {User} from "./user.model";

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new Subject<User>()

  constructor(private http: HttpClient) {
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQBcaLeZw7M5gOPAp8lbp8sFrWwtrzC6s',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(tap(responseData => {
        this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
      }))
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQBcaLeZw7M5gOPAp8lbp8sFrWwtrzC6s', {
      email: email,
      password: password,
      returnSecureToken: true
    })
      .pipe(tap(responseData => {
        this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
      }))
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
  }
}
