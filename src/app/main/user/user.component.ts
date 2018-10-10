import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User, UserDetail } from '../../models/models';
import { StatemanagementService } from '../../services/statemanagement.service';
import * as XLSX from 'xlsx';
import { join, leftJoin } from 'array-join';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { UploadEvent, UploadFile, FileSystemDirectoryEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[];
  userDetails: UserDetail[];
  usersJoined: any[];
  anyError: boolean = false;
  data: Array<Array<string>>;
  showImportButton: boolean;
  defaultPwd: string = "";

  username: string = "";
  password: string = "";
  cpassword: string = "";
  valid: boolean = false;
  lock: boolean = false;

  modalEdit: boolean = false;
  modalDelete: boolean = false;
  usernameAction: string = "";
  userDetail: UserDetail = new UserDetail();
  public files: UploadFile[] = [];
  constructor(private userService: UserService, private stateService: StatemanagementService) { }

  ngOnInit() {
    this.getUser();
  }

  keyDownFunction(e) {
    if (this.username !== "" && this.password !== "" && this.cpassword !== "") {
      this.valid = true;
    } else {
      this.valid = false;
    }
  }
  addManualAccount() {
    if (this.cpassword !== this.password) {
      this.stateService.setIsGlobalMessage(true);
      this.stateService.setglobalMessage("0|Password and confirmation not matched!");
      return;
    }

    this.userService.registerUser(this.username, this.password).subscribe(reg => {
      this.stateService.setIsGlobalMessage(true);
      this.stateService.setglobalMessage("1|Initial data successfully saved, please complete it with detail!");
      this.getUser();

      this.username = "";
      this.password = "";
      this.cpassword = "";
      this.valid = false;
    }, err => {
      this.stateService.setIsGlobalMessage(true);
      this.stateService.setglobalMessage("0|Something error on network or server!");
    })

    setTimeout(() => {
      this.stateService.clearError();
    }, 5000);
  }

  changeDate(val) {
    setTimeout(() => {
      let date = (val as string).split('/');
      this.userDetail.BornDate = date[2] + "-" + date[0] + "-" + date[1];
    }, 100);

  }

  userActionTable(obj) {
    this.usernameAction = obj.Username;
    if (obj.Action === 1) { //edit
      this.modalEdit = true;
    }

    if (obj.Action === 0) { //delete
      this.modalDelete = true;
    }
    this.userService.getUserDetailUsername(obj.Username).subscribe(ud => {
      if (ud[0]) { //update detail
        this.userDetail = ud[0] as UserDetail;
        console.log(this.userDetail);
        //this.userDetail.BornDate = this.toDateJs(this.userDetail.BornDate).toISOString().split('T')[0];
      }
    });
  }

  putUserDetail() {
    this.userService.getUserDetailUsername(this.usernameAction).subscribe(det => {
      if (det[0]) {
        this.userService.putUserDetail(this.userDetail).subscribe(res => {
          this.stateService.setIsGlobalMessage(true);
          this.stateService.setglobalMessage("1|Data successfully saved!");
          this.getUser();
          this.modalEdit = false;
          this.usernameAction = '';
        });
      }else{
        this.userDetail.Username = this.usernameAction;
        this.userService.postUserDetail(this.userDetail).subscribe(res => {
          this.stateService.setIsGlobalMessage(true);
          this.stateService.setglobalMessage("1|Data successfully saved!");
          this.getUser();
          this.modalEdit = false;
          this.usernameAction = '';
        });
      }
    });
  }

  deleteUser() {
    this.userService.getUsersUsername(this.usernameAction).subscribe(res => {
      if (res[0]) { //update
        let user: User = res[0] as User;
        user.IsActive = 0;
        this.userService.putUser(user).subscribe(del => {
          this.stateService.setIsGlobalMessage(true);
          this.stateService.setglobalMessage("1|Data successfully deleted!");
          this.getUser();
          this.modalDelete = false;
          this.usernameAction = '';
        });
      }
    });

  }

  importData() {
    this.usersJoined.forEach((el, idx) => {
      el.BornDate = new Date(el.BornDate.getTime() - (el.BornDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0]; //problem one day
      this.userService.getUsersUsername(el.Username).subscribe(res => {
        if (res[0]) { //update
          this.userService.getUserDetailUsername(el.Username).subscribe(ud => {
            if (ud[0]) { //update detail
              this.userService.putUserDetail(el).subscribe(update => {

              });
            } else { //add detail
              this.userService.postUserDetail(el).subscribe(add => {

              });
            }
          })
        } else {//reg new user
          this.userService.registerUser(el.Username, this.defaultPwd === "" ? "123456" : this.defaultPwd).subscribe(reg => {
            this.userService.postUserDetail(el).subscribe(add => {

            });
          })

        }
      })
      if (idx === this.usersJoined.length - 1) {
        this.stateService.setIsGlobalMessage(true);
        this.stateService.setglobalMessage("1|Data successfully imported!");
        this.getUser();
      }
    })
  }

  getUser() {
    this.showImportButton = false;
    this.users = null;
    this.usersJoined = null;
    var q = forkJoin(this.userService.getUsers(), this.userService.getUserDetails());
    q.subscribe(res => {
      this.users = res[0];
      this.userDetails = res[1];
      this.usersJoined = leftJoin(res[0], res[1], { key: 'Username' });
    }, err => {
      this.anyError = true;
      this.stateService.setIsGlobalMessage(this.anyError);
      this.stateService.setglobalMessage("0|Somethin not working within your connection or server. Please check your connection");
    })
  }

  catchData(data) {
    this.arrayConvert(data);
  }

  arrayConvert(data: Array<Array<string>>) {
    this.usersJoined = null;
    let userUploaded: Array<any> = new Array<any>();
    try {
      for (let i = 1; i < data.length; i++) {
        let eachRow = {
          Username: data[i][0],
          FirstName: data[i][1],
          LastName: data[i][2],
          Email: data[i][3],
          Phone: data[i][4],
          Gender: data[i][5],
          BornDate: this.newDateConverter(data[i][6])
        }

        userUploaded.push(eachRow);
      }
    } catch (err) {
      this.anyError = true;
      this.stateService.setIsGlobalMessage(this.anyError);
      this.stateService.setglobalMessage("0|Data incorrect format, please check your template!");
    }
    this.usersJoined = userUploaded;
    if (this.usersJoined) {
      this.showImportButton = true;
    }
  }

  newDateConverter(serial) {
    let utc_days = Math.floor(serial - 25569);
    let utc_value = utc_days * 86400;
    let date_info = new Date(utc_value * 1000);

    let fractional_day = serial - Math.floor(serial) + 0.0000001;

    let total_seconds = Math.floor(86400 * fractional_day);

    let seconds = total_seconds % 60;

    total_seconds -= seconds;

    let hours = Math.floor(total_seconds / (60 * 60));
    let minutes = Math.floor(total_seconds / 60) % 60;
    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
  }
}
