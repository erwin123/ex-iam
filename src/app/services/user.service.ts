import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as globalVar from '../global';
import { User, UserDetail } from '../models/models'

@Injectable({
  providedIn: 'root'
})


export class UserService {
  private url = globalVar.global_um + '/users';  // URL to web api
  private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  private token: any;
  constructor(private httpClient: HttpClient) {
  }

  getUsersUsername(username:string):Observable<User> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    return this.httpClient.get<User>(this.url +'/'+username, { headers: headers }).pipe(map(res =>{return res;}));
  }

  getUserDetailUsername(username:string):Observable<UserDetail> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    let selfUrl = globalVar.global_um + '/userd';
    return this.httpClient.get<UserDetail>(selfUrl +'/'+username, { headers: headers }).pipe(map(res =>{return res;}));
  }

  getUsers():Observable<User[]> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    return this.httpClient.get<User[]>(this.url, { headers: headers }).pipe(map(res =>{return res;}));
  }

  getUserDetails():Observable<UserDetail[]> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    let selfUrl = globalVar.global_um + '/userd';
    return this.httpClient.get<UserDetail[]>(selfUrl, { headers: headers }).pipe(map(res =>{return res;}));
  }

  postUserDetail(userDetail:UserDetail)
  {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    let selfUrl = globalVar.global_um + '/userd';
    return this.httpClient.post(selfUrl,userDetail, { headers: headers }).pipe(map(res =>{return res;}));
  }

  putUserDetail(userDetail:UserDetail){
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    let selfUrl = globalVar.global_um + '/userd';
    return this.httpClient.put(selfUrl +'/'+userDetail.Username,userDetail, { headers: headers }).pipe(map(res =>{return res;}));
  }

  putUser(user:User){
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    return this.httpClient.put(this.url +'/'+user.Username,user, { headers: headers }).pipe(map(res =>{return res;}));
  }
  registerUser(userName:string, password:string){
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    return this.httpClient.post(this.url +'/register', {username:userName, password:password}, { headers: headers }).pipe(map(res =>{return res;}));
  }
}
