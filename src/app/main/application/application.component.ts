import { Component, OnInit } from '@angular/core';
import { Apps } from '../../models/models';
import { ApplicationService } from '../../services/application.service';
import { StatemanagementService } from '../../services/statemanagement.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  apps: Apps[];
  anyError: boolean = false;
  data: Array<Array<string>>;
  showImportButton: boolean;
  defaultPwd: string = "";

  appsName: string = "";
  appsDesc: string = "";
  valid:boolean=false;
  constructor(private appService:ApplicationService, private stateService:StatemanagementService) { }

  ngOnInit() {
    this.getApp();
  }

  addApps(){
    if (this.appsName === ""){
      this.valid = false;
      return;
    }
    
  }
  keyDownFunction(e) {
    if (this.appsName !== "") {
      this.valid = true;
    } else {
      this.valid = false;
    }
  }

  appsAction(e){
    console.log(e);
  }

  getApp() {
    this.showImportButton = false;
    this.apps = null;
    this.appService.getApps().subscribe(res => {
      this.apps = res;
    }, err => {
      this.anyError = true;
      this.stateService.setIsGlobalMessage(this.anyError);
      this.stateService.setglobalMessage("0|Somethin not working within your connection or server. Please check your connection");
    })
  }

}
