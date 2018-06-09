import {Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FsmState} from '../models/fsm-state';
import {MenuItem} from 'primeng/api';
import {FsmEvent} from '../models/fsm-event';
import {FsmTransition} from '../models/fsm-transition';

@Component({
  selector: 'app-state-node',
  templateUrl: './state-node.component.html',
  styleUrls: ['./state-node.component.css']
})
export class StateNodeComponent implements OnInit, OnChanges {
  @Input() state: FsmState;
  @Input() width: number;
  @Input() height: number;
  @Input()
  @HostBinding('class.active-state')
  private active: boolean = false;
  @HostBinding('style.background-color')
  bgColor: string;
  private contextMenuItems: MenuItem[];
  private backgroundColors: string[];
  private activeTransition: FsmTransition;

  constructor() {
    if (this.state != null) {
      this.height = this.calculateNodeHeight();
    }
  }

  ngOnInit() {
    this.initContextMenu();
    this.initBgColors();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['active']) {
      if (this.active) {
        // this.transitionBgColor = '#0291df';
      } else {
        this.activeTransition = null;
      }
    }
  }

  public get activeTransitionName(): string {
    if (this.activeTransition === undefined || this.activeTransition === null) {
      return '';
    } else {
      return this.activeTransition.eventName;
    }

  }

  /**
   * 初始化组件的背景颜色
   */
  private initBgColors() {
    this.backgroundColors = [
      '#4d5656', // 默认
      '#2b579a', // 蓝色
      '#018b67', // 蓝绿色
      '#00a123', // 绿色
      '#cabc04', // 黄色
      '#bf601c', // 橙色
      '#94000b', // 红色
      '#911679'  // 紫色
    ];
    this.bgColor = this.backgroundColors[this.state.colorIndex];
  }

  /**
   * 初始化右键菜单
   */
  private initContextMenu() {
    const colorMenuItems = [
      {
        label: '默认',
        command: (event) => {
          this.setStateColor(0);
        }
      },
      {
        label: '蓝色',
        command: (event) => {
          this.setStateColor(1);
        }
      },
      {
        label: '蓝绿色',
        command: (event) => {
          this.setStateColor(2);
        }
      },
      {
        label: '绿色',
        command: (event) => {
          this.setStateColor(3);
        }
      },
      {
        label: '黄色',
        command: (event) => {
          this.setStateColor(4);
        }
      },
      {
        label: '橙色',
        command: (event) => {
          this.setStateColor(5);
        }
      },
      {
        label: '红色',
        command: (event) => {
          this.setStateColor(6);
        }
      },
      {
        label: '紫色',
        command: (event) => {
          this.setStateColor(7);
        }
      },
    ];
    const transitionMenuItems: MenuItem[] = [
      {
        label: 'Finished',
        command: (event) => {
          this.addTransition(new FsmEvent('Finished'));
        }
      },
      {
        label: 'Mouse Down',
        command: (event) => {
          this.addTransition(new FsmEvent('Mouse Down'));
        }
      },
      {
        label: '自定义事件'
      },
      {
        label: '系统事件',
        items: this.createSystemEventMenuItems()
      }
    ];
    const globalTransitionMenuItems: MenuItem[] = [
      {
        label: 'Finished'
      },
      {
        label: 'Mouse Down'
      },
      {
        label: '自定义事件'
      },
      {
        label: '系统事件',
        items: this.createSystemEventMenuItems()
      }
    ];
    this.contextMenuItems = [
      {
        label: '添加过渡',
        items: transitionMenuItems
      },
      {
        label: '添加全局过渡',
        items: globalTransitionMenuItems
      },
      {separator: true},
      {
        label: '设置为起始状态',
      },
      {
        label: '颜色',
        items: colorMenuItems
      },
      {separator: true},
      {
        label: '复制状态',
      },
      {
        label: '保存模板',
      },
      {
        label: '删除状态',
      },
      {separator: true},
      {
        label: '切换断点',
      }
    ];
  }

  private createSystemEventMenuItems(): MenuItem[] {
    const items: MenuItem[] = [
      {
        label: 'Mouse Down'
      },
      {
        label: 'Mouse Up'
      },
      {
        label: 'Mouse Move'
      },
      {
        label: 'Mouse Out'
      },
      {
        label: 'Mouse Over'
      },
      {
        label: 'Click'
      },
      {
        label: 'Double Click'
      },
    ];
    return items;
  }

  private createCustomEventMenuItems(): MenuItem[] {
    const items: MenuItem[] = [];
    return items;
  }

  private addTransition(event: FsmEvent) {
    this.state.addTransition(event);
  }

  private addGlobalTransition() {

  }

  private setStateColor(colorIndex: number) {
    this.state.colorIndex = colorIndex;
    this.bgColor = this.backgroundColors[this.state.colorIndex];
  }

  private setNodePosition(x: number, y: number) {
    this.state.x = x;
    this.state.y = y;
  }

  private calculateNodeHeight(): number {
    const cellHeight = 28;
    return cellHeight * (this.state.transitions.length + 1);
  }

  private onTransitionClicked(trans: FsmTransition) {
    this.activeTransition = trans;
    // this.transitionColor = '#f3ffff';
    // this.transitionBgColor = '#0291df';
  }


}
