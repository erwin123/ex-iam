import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { User } from "../models/models";

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.css']
})
export class TableUserComponent implements OnInit {
  @Input() users: any[];
  @Output() userAction:EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onAction(username, act){
    let obj:any ={
      Username:username,
      Action:act
    }
    this.userAction.emit(obj);
  }

}
