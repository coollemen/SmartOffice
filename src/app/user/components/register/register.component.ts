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
  public companyNames: string[] = [];
  public message = ' ';
  public form: FormGroup;
  public isLoading=false;
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.form.controls.password.value) {
      return {confirm: true, error: true};
    }
  };

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
    this.user = new MsaUser();
  }

  ngOnInit() {
    this.userService.getRegionNames().then(
      names => {
        this.companyNames = names;
        if (this.companyNames.length > 0) {
          this.onCompanySelectionChange(this.companyNames[0]);
        }
      },
      error => {
        alert('Error: ' + error.code + ' ' + error.message);
      });
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      email: [null, [Validators.email]],
      realName: [null, [Validators.required]],
      msaId: [null, [Validators.required]],
      phoneNumberPrefix: ['+86'],
      mobilePhoneNumber: [null, [Validators.required]],
      internalPhoneNumber: [null, [Validators.required]],
      company: ["浦东新区地方海事处", [Validators.required]],
      department: [null, [Validators.required]],

    });
  }

  submitForm(): void {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    //从控件获取用户注册信息
    this.user.username=this.form.controls.username.value;
    this.user.password=this.form.controls.password.value;
    this.user.mobilePhoneNumber=this.form.controls.mobilePhoneNumber.value;
    this.user.realName=this.form.controls.realName.value;
    this.user.msaId=this.form.controls.msaId.value;
    this.user.internalPhoneNumber=this.form.controls.internalPhoneNumber.value;
    this.user.company=this.form.controls.company.value;
    this.user.department=this.form.controls.department.value;
    this.user.email=this.form.controls.email.value;
    console.log(this.user);
    this.register();
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.form.controls.checkPassword.updateValueAndValidity());
  }

  register() {
    console.log(this.user);
    this.isLoading=true;
    this.userService.register(this.user)
      .then(newUser => {
          console.log('注册完毕！');
          this.isLoading=false;
          alert('注册完毕！');
          this.router.navigateByUrl('/login');
        },
        error => {
          this.isLoading=false;
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
              this.message = error.code + ":" + error.message + ' 其他错误';
              break;
          }
          alert(this.message);
        }
      );
  }

  onCompanySelectionChange(company: any) {
    console.log(company);
    this.userService.getDepartmentNamesByRegion(company)
      .then(names => {
          this.departmentNames = names;
        },
        error => {
          alert('Error: ' + error.code + ' ' + error.message);
        }
      );

  }
  onGoBack(){
    this.router.navigateByUrl('/login');
  }
}
