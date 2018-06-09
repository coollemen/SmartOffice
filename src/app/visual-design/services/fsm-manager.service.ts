import {Injectable} from '@angular/core';
import {FsmEvent} from '../models/fsm-event';

@Injectable({
  providedIn: 'root'
})
export class FsmManagerService {
  public events: FsmEvent[];

  constructor() {
  }
  public initDefaultEvents(){

  }
  public getEvent(name: string): FsmEvent {
    const event = this.events.find(e => e.name === name);
    return event;
  }

  public addEvent(name: string) {
    const e = new FsmEvent(name);
  }

  public removeEvent(name: string) {
    const index = this.events.findIndex(e => e.name === name);
    if (index >= 0 && index < this.events.length) {
      this.events.splice(index, 1);
    }
  }
}
