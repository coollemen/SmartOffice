/***
 * 状态机事件
 */
export class FsmEvent {
  /**
   * 事件名字
   */
  public name: string;
  /**
   * 是否是系统事件
   */
  public isSystemEvent: boolean;
  /**
   * 是否是全局事件
   */
  public isGlobal: boolean;

  constructor(setName: string,setIsSysEvent:boolean=false,setIsGlobal:boolean=false) {
    this.name = setName;
    this.isSystemEvent=setIsSysEvent;
    this.isGlobal=setIsGlobal;
  }

  /**
   * 克隆事件
   * @returns {FsmEvent} 事件
   */
  public clone():FsmEvent{
    return new FsmEvent(this.name,this.isSystemEvent,this.isGlobal);
  }
}
