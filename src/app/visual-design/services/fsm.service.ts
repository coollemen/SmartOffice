import {Injectable} from '@angular/core';
import {FsmEvent} from '../models/fsm-event';
import {FSM} from '../models/fsm';

@Injectable({
  providedIn: 'root'
})
export class FsmService {
  public activeFsm: FSM;
  public fsmArray: FSM[] = [];
  public systemEvents: FsmEvent[] = [];

  constructor() {
    this.initDefaultEvents();
  }

  public initDefaultEvents() {
    // 系统事件
    this.systemEvents.push(new FsmEvent('Mouse Down'));
    this.systemEvents.push(new FsmEvent('Mouse Up'));
    this.systemEvents.push(new FsmEvent('Mouse Over'));
    this.systemEvents.push(new FsmEvent('Mouse Move'));
    this.systemEvents.push(new FsmEvent('Mouse Out'));
    this.systemEvents.push(new FsmEvent('Click'));
    this.systemEvents.push(new FsmEvent('Double Click'));
  }

  public getEvent(name: string): FsmEvent {
    const event = this.systemEvents.find(e => e.name === name);
    return event;
  }

  public addEvent(name: string) {
    const e = new FsmEvent(name);
  }

  public removeEvent(name: string) {
    const index = this.systemEvents.findIndex(e => e.name === name);
    if (index >= 0 && index < this.systemEvents.length) {
      this.systemEvents.splice(index, 1);
    }
  }

  // public guid() {
  //   return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
  //     (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  //   )
  // }
  public guid(): string { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      d += performance.now(); // use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  public createFsm(): FSM {
    let fsm = new FSM();
    fsm.guid = this.guid();
    console.log(fsm.guid);
    return fsm;
  }

  public getFsm(): FSM {

  }

  public saveFsm(fsm: FSM) {

  }

  public loadFsm(guid: string): FSM {

  }
}
