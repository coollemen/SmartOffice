import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {FSM} from '../models/fsm';
import {FsmTransition} from '../models/fsm-transition';
import {FsmEvent} from '../models/fsm-event';
import {FsmState} from '../models/fsm-state';
import {MenuItem} from 'primeng/api';
import {BmobService} from '../../shared/services/bmob.service';
import {log} from 'util';
import {BmobFieldMetadata, bmobFieldMetadataKey} from "../../shared/decorators/bmob-field";
import {BmobPropertyMetadata, bmobPropertyMetadataKey} from "../../shared/decorators/bmob-property";

@Component({
  selector: 'app-finite-state-machine',
  templateUrl: './finite-state-machine.component.html',
  styleUrls: ['./finite-state-machine.component.css']
})
export class FiniteStateMachineComponent implements OnInit {
  private;
  @ViewChild('view') view: ElementRef;
  @Input() fsm: FSM;
  @Input() width: number;
  @Input() height: number;
  private contextMenuItems: MenuItem[];

  constructor(private bmobServicd: BmobService) {
    this.initFsm();
    this.initContextMenu();

  }

  private initFsm() {
    this.fsm = new FSM();
  }

  private initContextMenu() {
    this.contextMenuItems = [
      {
        label: '添加状态',
        icon: 'fa fa-plus',
        command: (event) => {
          this.addState(event);
        }
      },
      {
        label: '粘贴状态',
        icon: 'fa fa-paste'
      },
      {
        label: '粘贴模板',
        icon: 'fa fa-paste'
      },
      {separator: true},
      {
        label: '复制状态机',
        icon: 'fa fa-copy'
      },
      {
        label: '保存模板',
        icon: 'fa fa-save'
      },
      {separator: true},
      {
        label: '打开状态机',
        icon: 'fa fa-file-o'
      },
      {
        label: '保存状态机',
        icon: 'fa fa-save',
        command: (event) => {
          this.onSaveFsm();
        }
      },
    ];
  }

  ngOnInit() {
    this.setViewSize(800, 600);
  }

  public get activeStateName(): string {
    if (this.fsm.activeState !== undefined) {
      return this.fsm.activeState.name;
    } else {
      return '';
    }
  }

  public setViewSize(w: number, h: number) {
    this.width = w;
    this.height = h;
  }

  public getTranslateFromState(s: FsmState) {
    const text = 'translate(' + s.x + 'px,' + s.y + 'px)';
    console.log(text);
    return text;
  }

  /**
   * 添加状态
   * @param event 事件
   */
  public addState(event) {
    const mouseEvent = event.originalEvent as MouseEvent;
    const state = new FsmState(this.getValidStateName());
    const rect = this.view.nativeElement.getBoundingClientRect();
    state.x = mouseEvent.clientX - rect.left;
    state.y = mouseEvent.clientY - rect.top;
    this.fsm.addState(state);
  }

  /**
   * 获取一个有效的{State+数字序号}状态名字，例如State1，State2等
   * @returns {string} 状态名
   */
  private getValidStateName(): string {
    let isExist = true;
    let i = 0;
    while (isExist) {
      i++;
      isExist = this.fsm.hasState(`State${i}`);
    }
    return `State${i}`;
  }

  public onStateClicked(s: FsmState) {
    this.fsm.selectState(s);
  }

  public onSaveFsm() {
    this.fsm.name="first fsm";
    this.fsm.active=false;
     this.bmobServicd.save(this.fsm).then(
       result=>{
       this.fsm.data=result;
       alert("状态机保存成功！");
       },error=>{
       alert(error.code+error.message);
     });
  }
}
