import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as globalVar from '../global';
import { Apps } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private url = globalVar.global_um + '/apps';  // URL to web api
  private _headers = new HttpHeaders().set('Content-Type', 'application/json');
  private token: any;
  constructor(private httpClient: HttpClient) {
  }

  public getApps():Observable<Apps[]> {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
    const headers = this._headers.append('x-access-token', this.token.token);
    return this.httpClient.get<Apps[]>(this.url, { headers: headers }).pipe(map(res =>{return res;}));
  }
}
