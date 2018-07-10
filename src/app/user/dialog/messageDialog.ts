/**
 * Created by nizhihuahome on 2017/1/1.
 */
import {Component} from "@angular/core";
import {MatDialogRef,MatDialog} from "@angular/material";

@Component({
  selector: 'msg-dialog',
  template: `
<div class="diglog">
  <div class="dialog-content">
    <p>{{message}}</p>
  </div>
  <div class="dialog-actions">
    <button mat-button  color="primary" (click)="dialogRef.close('ok')">确定</button>
  </div>
</div>
  `,
  styleUrls:['./dialog.css']
})
export class MessageDialog
{

  public message:string;
  constructor(public dialogRef: MatDialogRef<MessageDialog>)
  {

  }
}
