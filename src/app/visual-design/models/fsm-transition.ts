import {FsmEvent} from './fsm-event';

/**
 * 状态机过渡
 */
export class FsmTransition {
  public toState: string;
  private fsmEvent: FsmEvent;

  public get eventName(): string {
    return this.fsmEvent.name;
  }

  public get event(): FsmEvent {
    return this.fsmEvent;
  }

  public set event(e: FsmEvent) {
    this.fsmEvent = e;
  }

  constructor() {

  }
}
