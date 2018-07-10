/**
 * Created by nizhihuahome on 2017/1/1.
 */
import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public email: string;
  public message = ' ';

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  public resetPassword() {
    this.userService.resetPassword(this.email)
      .then(user => {
          alert("邮件已经成功发送到该邮箱！");
        },
        error => {
          alert('发送失败！');
          switch (error.code) {
            case 101:
              this.message = error.code + ':用户名或密码不正确';
              break;
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
              this.message = error.code +":"+error.message+' 其他错误';
              break;
          }

        });
  }

}
