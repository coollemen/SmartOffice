/***
 * 状态机事件
 */
export class FsmEvent {
  public name: string;
  public isSystemEvent: boolean;
  public isMouseEvent: boolean;

  constructor(setName: string) {
    this.name = setName;
  }
}
