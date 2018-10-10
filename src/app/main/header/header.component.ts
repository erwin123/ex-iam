import { Component, OnInit } from '@angular/core';
import { StatemanagementService } from '../../services/statemanagement.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import {PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean = false;
  traffic: boolean = false;
  isCoach: boolean = false;
  isProjectSelected: boolean = false;
  constructor(private platformLocation: PlatformLocation,private router: Router, private stateService: StatemanagementService, private loginService: LoginService) { }
  ngOnInit() {

    this.stateService.currentStateLogin.subscribe(res => {
      this.isLogin = res;
    });
    this.stateService.currentExistTraffic.subscribe(res => {
      this.traffic = res;
    });
    
    


  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
    setTimeout(() => {
      window.location.href = (this.platformLocation as any).location.origin;
    }, 600);
  }
}
