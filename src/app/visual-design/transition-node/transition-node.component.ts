import {Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FsmTransition} from '../models/fsm-transition';
import {MenuItem} from 'primeng/api';
import {FsmEvent} from '../models/fsm-event';


@Component({
  selector: 'app-transition-node',
  templateUrl: './transition-node.component.html',
  styleUrls: ['./transition-node.component.css']
})
export class TransitionNodeComponent implements OnInit {
  @Input() transition: FsmTransition;
  @Output() transitionChange: EventEmitter<FsmTransition>;
  @Input() isShowConnectPoint: boolean;
  @HostBinding('class.active-transition')
  @Input() active = false;
  @Input() index:number=-1;
  @Input() colorIndex = 0;
  @Input() systemEventNames:string[];
  @Input() customEventNames:string[];
  @Input() stateNames:string[];
  @Output() eventChanged: EventEmitter<FsmEvent>;
  @Output() targetChanged: EventEmitter<FsmEvent>;
  @Output() moveUp: EventEmitter<number>;
  @Output() moveDown: EventEmitter<number>;

  private contextMenuItems: MenuItem[];

  constructor() {

  }

  ngOnInit() {
    this.initContextMenu();
  }

  private initContextMenu() {
    this.contextMenuItems = [
      {label: '过渡事件'},
      {label: '过渡目标'},
      {separator: true},
      {label: '上移过渡'},
      {label: '下移过渡'},
      {separator: true},
      {label: '清除过渡事件'},
      {label: '清除过渡目标'},
      {label: '删除过渡'},
    ];
  }

  private createEventMenuItems() {

  }

  private createTargetMenuItems() {

  }

  public addTransitionClass(): string | string[] {
    if (this.active) {
      return 'active';
    }
    else {
      switch (this.colorIndex) {
        case 0:
          return 'default';
        case 1:
          return 'blue';
        case 2:
          return 'cyan';
        case 3:
          return 'green';
        case 4:
          return 'yellow';
        case 5:
          return 'orange';
        case 6:
          return 'red';
        case 7:
          return 'purple';
        default:
          return 'default';
      }
    }
  }
}
