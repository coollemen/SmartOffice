/**
 * Created by nizhihuahome on 2017/1/1.
 */
import {Component, OnInit} from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material';
import {MessageDialog} from '../../dialog/messageDialog';
import {MsaUser} from '../../models/msa-user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'user-info-manage',
  templateUrl: './user-info-manage.component.html',
  styleUrls: ['./user-info-manage.component.css']
})
export class UserInfoManageComponent implements OnInit {
  public user: MsaUser;
  public departmentNames: string[] = [];
  public regionNames: string[] = [];
  public message = ' ';
  dialogRef: MatDialogRef<MessageDialog>;

  constructor(private userService: UserService, private dialog: MatDialog) {
    this.user=userService.getCurrentUser();
  }

  ngOnInit() {
    this.userService.getRegionNames().then(
      names => {
        this.regionNames = names;
      },
      error => {
        alert('Error: ' + error.code + ' ' + error.message);
      });
    this.userService.getDepartmentNamesByRegion(this.user.company)
      .then(names => {
          this.departmentNames = names;
        },
        error => {
          alert('Error: ' + error.code + ' ' + error.message);
        }
      );
  }

  modifyUserInfo() {
    this.message=" ";
    this.userService.updateUserInfo(this.user)
      .then(bmobUser => {
          alert('保存成功！');
          this.user.objectId = bmobUser.id;
          this.user.username = bmobUser.get('username');
          this.user.mobilePhoneNumber = bmobUser.get('mobilePhoneNumber');
          this.user.realName = bmobUser.get('realName');
          this.user.msaId = bmobUser.get('msaId');
          this.user.internalPhoneNumber = bmobUser.get('internalPhoneNumber');
          this.user.company = bmobUser.get('region');
          this.user.department = bmobUser.get('department');
          this.user.email = bmobUser.get('email');
        },
        error => {
          alert('保存失败！');
          switch (error.code) {
            case 201:
              this.message = error.code + ':缺失数据';
              break;
            case 202:
              this.message = error.code + ':用户名已经存在';
              break;
            case 203:
              this.message = error.code + ':邮箱已经存在';
              break;
            case 204:
              this.message = error.code + ':必须提供一个邮箱地址';
              break;
            case 205:
              this.message = error.code + ':没有找到此邮件或用户名的用户';
              break;
            case 206:
              this.message = error.code + ':登录用户才能修改自己的信息。RestAPI的Http Header中没有提供sessionToken的正确值，不能修改或删除用户';
              break;
            case 207:
              this.message = error.code + ':验证码错误';
              break;
            case 208:
              this.message = error.code + ':authData不正确';
              break;
            case 209:
              this.message = error.code + ':该手机号码已经存在';
              break;
            case 210:
              this.message = error.code + ':旧密码不正确';
              break;
            default:
              this.message = error.code +":"+error.message+' 验证错误详细提示';
              break;
          }
        }
      );

  }

}
