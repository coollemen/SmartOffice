import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import Role = Bmob.Role;
import {MatSelectChange, MatSelectionList, MatSelectionListChange} from '@angular/material';
import User = Bmob.User;

@Component({
  selector: 'role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.css']
})
export class RoleManageComponent implements OnInit {
  @ViewChild('roleUserList') roleUserList: MatSelectionList;
  @ViewChild('userList') userList: MatSelectionList;
  public roles: Bmob.Role[] = [];
  public currRole: Bmob.Role;
  public users: Bmob.User[] = [];
  public roleUsers: Bmob.User[] = [];

  constructor(private userService: UserService) {
    this.userService.getRoles().then(res => {
      this.roles = [];
      for (let i = 0; i < res.length; i++) {
        const object = res[i];
        this.roles.push(object as Role);
      }
    }, error => {
      alert('Error: ' + error.code + ' ' + error.message);
    });
  }

  ngOnInit() {
  }

  /**
   * 当角色表的选择内容改变时
   * @param {MatSelectionListChange} change
   */
  onRoleSelectChange(change: MatSelectChange) {
    this.fillData(change.value);
  }

  /**
   * 根据角色填充列表
   * @param {Bmob.Role} role
   */
  public fillData(role: Bmob.Role) {
    // 清除列表
    this.roleUsers = [];
    this.users = [];
    this.currRole = role;
    const roleUserQuery = this.currRole.getUsers().query();
    roleUserQuery.find().then(
      list => {
        for (let i = 0; i < list.length; i++) {
          this.roleUsers.push(list[i] as Bmob.User);
        }
        // 获取全部用户列表
        this.userService.getUsers().then(res => {
          for (let i = 0; i < res.length; i++) {
            const obj = res[i] as User;
            let hasExistInRole = false;
            // 判断该用户是否已经在角色组里了
            for (let j = 0; j < this.roleUsers.length; j++) {
              if (this.roleUsers[j].id === obj.id) {
                hasExistInRole = true;
              }
            }
            if (!hasExistInRole) {
              this.users.push(obj as User);
            }
          }
        }, error => {
          alert('Error: ' + error.code + ' ' + error.message);
        });
      },
      error => {
        alert('Error: ' + error.code + ' ' + error.message);
      });
  }

  /**
   * 当已添加用户表选择内容改变时
   * @param {MatSelectionListChange} change
   */
  onRoleUserListSelectionChange(change: MatSelectionListChange) {

  }

  /**
   * 当未添加用户选择内容改变时
   * @param {MatSelectionListChange} change
   */
  onUserListSelectionChange(change: MatSelectionListChange) {

  }

  /**
   * 加入到角色组
   */
  addToRoleUsers() {
    const selectUsers: Bmob.User[] = [];
    for (let i = 0; i < this.userList.selectedOptions.selected.length; i++) {
      selectUsers.push(this.userList.selectedOptions.selected[i].value);
    }
    for (const user of selectUsers) {
      this.currRole.getUsers().add(user);
    }
    this.currRole.save().then(res => {
      this.fillData(this.currRole);
    }, error => {
      alert('Error: ' + error.code + ' ' + error.message);
    });
  }

  /**
   * 从角色组移除
   */
  removeFromRoleUsers() {
    const selectUsers: Bmob.User[] = [];
    for (let i = 0; i < this.roleUserList.selectedOptions.selected.length; i++) {
      selectUsers.push(this.roleUserList.selectedOptions.selected[i].value);
    }
    for (const user of selectUsers) {
      this.currRole.getUsers().remove(user);
    }
    this.currRole.save().then(res => {
      this.fillData(this.currRole);
    }, error => {
      alert('Error: ' + error.code + ' ' + error.message);
    });
  }
}
