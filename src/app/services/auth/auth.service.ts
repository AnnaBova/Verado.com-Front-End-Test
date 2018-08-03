import { Injectable } from '@angular/core';

import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../mock-data/mock-data.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: BehaviorSubject<User | null> = new BehaviorSubject({
    email: 'test@gmail.com',
    role: 'buyer',
    password: '123456',
    nickname: 'SpanchBob',
    firstname: 'Spanch',
    lastname: 'Bob'
  })
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const options = {
      params: new HttpParams().set('email', email).set('password', password)
    }
    this.http.get('/users', options)
        .pipe(
          tap((user: User) => {
            this.currentUser.next(user)
            return user
          }),
          catchError((error): any => console.log(error))
        )
  }

  singIn(user: User): Observable<User> {
    const options = {
      headers: new HttpHeaders().set('Content-type', 'application/json')
    }
    return this.http.post('/users', user, options)
  }

  logout() {
    this.currentUser.next(null)
  }

  all(): Observable<User[]> {
    return this.http.get<User[]>('api/users')
  }

  getUser(nickname: string): Observable<User> {
    const options = {
      params: new HttpParams().set('nickname', nickname)
    }

    return this.http.get<User>('api/users', options)
  }
}
