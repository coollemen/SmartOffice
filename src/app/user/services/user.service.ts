import {Injectable} from '@angular/core';
import {MsaUser} from '../models/msa-user';

@Injectable()
export class UserService {
  appId = '921d1bd493411db02d8bcf1a8562b843';
  restApiKey = 'a2171a5687d9e98ca75443ddc431d43c';
  public currUser: MsaUser;

  constructor() {
    Bmob.initialize(this.appId, this.restApiKey);
  }

  /**
   * 获取当前用户信息
   * @returns {Bmob.User}
   */
  public getCurrentUser() {
    const bmobUser = Bmob.User.current();
    const user = new MsaUser();
    user.objectId = bmobUser.id;
    user.username = bmobUser.get('username');
    user.mobilePhoneNumber = bmobUser.get('mobilePhoneNumber');
    user.realName = bmobUser.get('realName');
    user.msaId = bmobUser.get('msaId');
    user.internalPhoneNumber = bmobUser.get('internalPhoneNumber');
    user.region = bmobUser.get('region');
    user.department = bmobUser.get('department');
    user.email = bmobUser.get('email');
    return user;
  }

  public updateUserInfo(user: MsaUser) {
    const bmobUser = Bmob.User.current();
    // 必填的内容
    bmobUser.set('mobilePhoneNumber', user.mobilePhoneNumber);
    bmobUser.set('realName', user.realName);
    bmobUser.set('msaId', user.msaId);
    bmobUser.set('internalPhoneNumber', user.internalPhoneNumber);
    bmobUser.set('region', user.region);
    bmobUser.set('department', user.department);
    bmobUser.set('email', user.email);
    // 保存
    return bmobUser.save();
  }

  public getRoles() {
    const query = new Bmob.Query(Bmob.Object.extend('_Role'));
    return query.find();
  }

  public getUsers() {
    const query = new Bmob.Query(Bmob.Object.extend('_User'));
    return query.find();
  }

  /**
   * 添加角色
   * @param {string} name
   * @returns {Promise<Bmob.Role>}
   */
  public addRole(roleName: string) {
    const roleACL = new Bmob.ACL();
    roleACL.setPublicReadAccess(true);
    roleACL.setPublicWriteAccess(true);
    const role = new Bmob.Role(roleName, roleACL);
    return role.save();
  }

  /**
   * 登录
   * @param {string} username 用户名
   * @param {string} password 密码
   * @returns {Promise<Bmob.User>}
   */
  public login(username: string, password: string): Promise<Bmob.User> {
    return Bmob.User.logIn(username, password);
  }

  /**
   * 登出
   */
  public logout() {
    Bmob.User.logOut();
  }

  /**
   * 注册用户
   * @param {MsaUser} user 用户注册信息
   */
  public register(user: MsaUser): Promise<Bmob.User> {
    const bmobUser = new Bmob.User();
    // 必填的内容
    bmobUser.set('username', user.username);
    bmobUser.set('password', user.password);
    bmobUser.set('mobilePhoneNumber', user.mobilePhoneNumber);
    bmobUser.set('realName', user.realName);
    bmobUser.set('msaId', user.msaId);
    bmobUser.set('internalPhoneNumber', user.internalPhoneNumber);
    bmobUser.set('region', user.region);
    bmobUser.set('department', user.department);
    bmobUser.set('email', user.email);
    // 注册
    return bmobUser.signUp(null, null);
  }

  /**
   * 获取区域服务器信息
   * @returns {Promise<RegionServerInfo[]>} 区域服务器信息数组
   */
  // getRegionServerInfo(): Promise<RegionServerInfo[]> {
  //   const RegionServerAddress = Bmob.Object.extend('RegionServerAddress');
  //   const query = new Bmob.Query(RegionServerAddress);
  //   return query.find().then(function (results) {
  //     console.log('共查询到 ' + results.length + ' 条记录');
  //     const regionServerInfos: RegionServerInfo[] = [];
  //     // 循环处理查询到的数据
  //     for (let i = 0; i < results.length; i++) {
  //       const object = results[i];
  //       const info: RegionServerInfo = new RegionServerInfo();
  //       info.region = object.get('region');
  //       info.ip = object.get('IP');
  //       info.port = object.get('port');
  //       regionServerInfos.push(info);
  //     }
  //     return regionServerInfos;
  //   }, function (error) {
  //     alert('查询失败: ' + error.code + ' ' + error.message);
  //     return error;
  //   });
  // }

  /**
   * 获取区域名数组
   * @returns {Promise<RegionServerInfo[]>} 区域服务器信息数组
   */
  getRegionNames(): Promise<string[]> {
    const RegionServerAddress = Bmob.Object.extend('RegionServerAddress');
    const query = new Bmob.Query(RegionServerAddress);
    query.select('region');
    return query.find().then(function (results) {
      console.log('共查询到 ' + results.length + ' 条记录');
      const regionNames: string[] = [];
      // 循环处理查询到的数据
      for (let i = 0; i < results.length; i++) {
        const object = results[i];
        let name: string;
        name = object.get('region');
        regionNames.push(name);
      }
      return regionNames;
    }, function (error) {
      alert('查询失败: ' + error.code + ' ' + error.message);
      return error;
    });
  }

  /**
   * 根据区域名称获取部门名称数组
   * @param {string} region 区域
   * @returns {Promise<string[]>} 部门名称数组
   */
  getDepartmentNamesByRegion(region: string): Promise<string[]> {
    const Department = Bmob.Object.extend('Department');
    const query = new Bmob.Query(Department);
    query.equalTo('region', region);
    query.select('name');
    return query.find().then(function (results) {
      console.log('共查询到 ' + results.length + ' 条记录');
      const names: string[] = [];
      // 循环处理查询到的数据
      for (let i = 0; i < results.length; i++) {
        const object = results[i];
        let name: string;
        name = object.get('name');
        names.push(name);
      }
      return names;
    }, function (error) {
      alert('查询失败: ' + error.code + ' ' + error.message);
      return error;
    });
  }

  getDepartmentAddressByName(name: string) {
    const Department = Bmob.Object.extend('Department');
    const query = new Bmob.Query(Department);
    query.equalTo('name', name);
    query.select('address');
    return query.first(null);
  }

  /**
   * 重置用户密码
   * @param {string} email 电子邮箱
   * @returns {Promise<void>}
   */
  resetPassword(email: string): Promise<void> {
    return Bmob.User.requestPasswordReset(email, null);
  }
}
