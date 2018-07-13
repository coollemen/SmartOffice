/**
 * Created by nizhihuahome on 2016/12/30.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MsaUser} from '../../models/msa-user';
import {UserService} from '../../services/user.service';
import {MatSelectChange} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
/**
 * 注册组件
 */
export class RegisterComponent implements OnInit {
  public user: MsaUser;
  public confirmPassword: string;
  public departmentNames: string[] = [];
  public regionNames: string[] = [];
  public message = ' ';
  public form: FormGroup;
  constructor(private userService: UserService, private router: Router,private fb: FormBuilder) {
    this.user = new MsaUser();
  }

  ngOnInit() {
    this.userService.getRegionNames().then(
      names => {
        this.regionNames = names;
      },
      error => {
        alert('Error: ' + error.code + ' ' + error.message);
      });
    this.form = this.fb.group({
      email            : [ null, [ Validators.email ] ],
      password         : [ null, [ Validators.required ] ],
      checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
      nickname         : [ null, [ Validators.required ] ],
      phoneNumberPrefix: [ '+86' ],
      phoneNumber      : [ null, [ Validators.required ] ],
      website          : [ null, [ Validators.required ] ],
      captcha          : [ null, [ Validators.required ] ],
      agree            : [ false ]
    });
  }
  submitForm(): void {
    for (const i in this.form.controls) {
      this.form.controls[ i ].markAsDirty();
      this.form.controls[ i ].updateValueAndValidity();
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.form.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.form.controls.password.value) {
      return { confirm: true, error: true };
    }
  }

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  register() {
    console.log(this.user);
    this.message=" ";
    if (this.user.password !== this.confirmPassword) {
      this.message = '两次输入的密码不一致！';
      return;
    }
    this.userService.register(this.user)
      .then(newUser => {
          console.log('注册完毕！');
          alert('注册完毕！');
          this.router.navigateByUrl('/login');
        },
        error => {
          alert('注册失败！');
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
              this.message = error.code +":"+error.message+' 其他错误';
              break;
          }
        }
      );


  }

  onRegionSelectionChange(e: MatSelectChange) {
    console.log(e);
    this.userService.getDepartmentNamesByRegion(e.value)
      .then(names => {
          this.departmentNames = names;
        },
        error => {
          alert('Error: ' + error.code + ' ' + error.message);
        }
      );

  }

}
