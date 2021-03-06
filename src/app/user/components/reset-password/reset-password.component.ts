/**
 * Created by nizhihuahome on 2017/1/1.
 */
import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public email: string;
  public message = ' ';
  public form: FormGroup;
  public isLoading:boolean=false;
  constructor(private userService: UserService, private router: Router,private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.email]],
    });
  }
  submitForm(): void {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    this.email=this.form.controls.email.value;
    console.log(this.email);
    this.resetPassword();
  }
  public resetPassword() {
    this.isLoading=true;
    this.userService.resetPassword(this.email)
      .then(user => {
          this.isLoading=false;
          alert("邮件已经成功发送到该邮箱！");
        },
        error => {
          this.isLoading=false;
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
  onGoBack(){
    this.router.navigateByUrl('/login');
  }
}
