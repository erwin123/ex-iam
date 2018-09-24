import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StatemanagementService } from '../services/statemanagement.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username:string = "";
  password:string = "";
  returnUrl: string;
  lock:boolean = false;
  hasError:boolean = false;
  message:string = "";
  constructor(private router: Router, private route: ActivatedRoute, private loginService: LoginService
    , private stateService: StatemanagementService) { }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  keyDownFunction(event) {
    if(event.keyCode == 13) {
      this.login();
    }
  }
  login(){
    if(this.username === "" || this.password ==="")
    {
      this.showMessageError("We need all login information completed.");
      return;
    }
    this.lock = true;
    
    this.stateService.setTraffic(true);
    this.loginService.login(this.username, this.password)
      .subscribe(res => {
        if(res){
          this.router.navigate(['/main/landing']);
          this.lock = false;
          this.stateService.setTraffic(false);
        }
      },
        err => {
          this.lock = false;
          this.stateService.setTraffic(false);
          this.showMessageError("Username or password are not match!");
          this.loginService.logout();
        }
      );
  }

  showMessageError(message:string){
    this.hasError = true;
    this.message = message;
    setTimeout(() => {
      this.hasError = false;
      this.message = "";
    }, 5000);
  }
}
