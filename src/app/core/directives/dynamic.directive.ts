import {Directive, ViewContainerRef} from '@angular/core';

/**
 * 动态组建宿主指令，添加在需要显示动态组件的位置
 */
@Directive({
  selector: '[appDynamic]'
})
export class DynamicDirective {
  constructor(public viewContainerRef: ViewContainerRef) {

  }
}
