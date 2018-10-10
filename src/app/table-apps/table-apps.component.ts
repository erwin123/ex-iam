import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-apps',
  templateUrl: './table-apps.component.html',
  styleUrls: ['./table-apps.component.css']
})
export class TableAppsComponent implements OnInit {
  @Input() apps: any[];
  @Output() appAction:EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onAction(appCode:string,actionCode:number){
    this.appAction.emit({AppCode:appCode, ActionCode:actionCode});
  }

}
