import { Component, OnInit } from '@angular/core';
import { trigger, animate, style, group, animateChild, query, stagger, transition, state } from '@angular/animations';
import { StatemanagementService } from '../../services/statemanagement.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger('routerTransition', [
      transition('* => stepboard', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%' })
          , { optional: true }),
        group([
          query(':enter', [
            style({ transform: 'translateX(-100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
          ], { optional: true }),
          query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
          ], { optional: true }),
        ])
      ]),
      transition('stepboard => *', [
        group([
          query(':enter, :leave', style({ position: 'fixed', width: '100%' })
            , { optional: true }),
          query(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
          ], { optional: true }),
          query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
          ], { optional: true }),
        ])
      ])
    ])
  ]
})
export class MainComponent implements OnInit {
  anyGlobalMessage: boolean = false;
  globalMessage: string = "";
  warning:boolean =false;
  success:boolean =false;
  constructor(private stateService: StatemanagementService) { }

  ngOnInit() {
    this.stateService.anyGlobalMessage.subscribe(res => {
      this.anyGlobalMessage = res;
      this.stateService.globalMessage.subscribe(msg => {
        let strMsg:string = msg;
        this.globalMessage = strMsg.split('|')[1];
        this.warning = strMsg.split('|')[0] === '0' ? true : false;
        this.success = strMsg.split('|')[0] === '1' ? true : false;
      });
      
    })
  }

  relaseError() {
    this.stateService.clearError();
  }
}
