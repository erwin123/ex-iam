import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = '/users';  // URL to web api
  constructor(private httpClient: HttpClient) {
  }

  login(username, password): Observable<any> {
    return this.httpClient.post(this.url + '/login', { username: username, password: password }, httpOptions)
    .pipe(map(
        res => {
          localStorage.setItem('currentUser', JSON.stringify(res));
          return res;
        }));
  }

  chPwd(username: string, password: string): Observable<any> {
    let token: any;
    token = JSON.parse(localStorage.getItem('currentUser'));
    let _headers = new HttpHeaders().set('Content-Type', 'application/json');
    const headers = _headers.append('x-access-token', token.token);

    return this.httpClient.post(this.url + '/changepwd', { username: username, password: password }, { headers: headers })
      .pipe(map(
        res => {
          return res;
        }));
  }

  logout() {
    setTimeout(() => {
      localStorage.clear();
    }, 500);
  }
}