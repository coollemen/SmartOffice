/**
 * Created by nizhihuahome on 2016/12/30.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public message = ' ';
  public isLoading=false;
  validateForm: FormGroup;
  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    this.login();
  }
  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ]
    });
  }

  login() {
    console.log('开始登陆');
    this.isLoading=true;
    this.userService.login(this.validateForm.controls['username'].value, this.validateForm.controls['password'].value)
      .then(user => {
          this.router.navigateByUrl('/main');
        },
        error => {
          this.isLoading=false;
          switch (error.code) {
            case 101:
              this.message = error.code + ':用户名或密码不正确';
              break;
            default:
              this.message = error.code + ':' + error.message + ' 其他错误';
              break;
          }
        });
  }
  onGotoRegister(){
    this.router.navigateByUrl('/register');
  }
  onGotoResetPassword(){
    this.router.navigateByUrl('/resetPassword');
  }
}
