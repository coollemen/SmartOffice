/**
 * 海事用户模型类
 * 2018-2-12 by nizhihua
 */
export class MsaUser {
  // id
  public objectId: string;
  // 用户名
  public username: string;
  // 密码
  public password: string;
  // 手机号码是否验证
  public mobilePhoneNumberVer: boolean;
  // 手机号码
  public mobilePhoneNumber: string;
  // 姓名
  public realName: string;
  // 执法证号码
  public msaId: string;
  // 短号码
  public internalPhoneNumber: string;
  // 公司（单位）
  public company: string;
  // 部门
  public department: string;
  // 电子邮箱是否验证
  public emailVerified: boolean;
  // 电子邮箱
  public email: string;
}
