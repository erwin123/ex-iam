import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StatemanagementService {
  anyGlobalMessage: EventEmitter<boolean> = new EventEmitter(false);
  globalMessage: EventEmitter<string> = new EventEmitter(false);

  private existTraffic = new BehaviorSubject<boolean>(false);
  currentExistTraffic = this.existTraffic.asObservable();

  private stateLogin = new BehaviorSubject<boolean>(localStorage.getItem('currentUser') ? true : false);
  currentStateLogin = this.stateLogin.asObservable();

  constructor(private router: Router) { }

  setCurrentStateLogin(val?: string) {
    if (val) {
      var state = val == "1"? true:false;
      this.stateLogin.next(state);
    }
    else {
      if (localStorage.getItem('currentUser'))
        this.stateLogin.next(true);
    }
  }

  setIsGlobalMessage(val) {
    this.anyGlobalMessage.emit(val);
  };

  setglobalMessage(val) {
    this.globalMessage.emit(val);
  };

  clearError(){
    this.anyGlobalMessage.emit(false);
    this.globalMessage.emit("");
  }
  
  setTraffic(existTraffic: boolean) {
    this.existTraffic.next(existTraffic);
  }

  getStoredUser(){
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  
  redirectLogin(){
    localStorage.clear();
    this.router.navigate(['main/login']);
  }
}