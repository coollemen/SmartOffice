/**
 * Bmob数据服务的基类
 */
export class BmobData {
  static Type: any;
  static TypeName: string;
  public object: Bmob.Object;

  constructor() {
    this.object = new BmobData.Type();
  }

  public static Init(setTypeName: string) {
    BmobData.TypeName = setTypeName;
    BmobData.Type = Bmob.Object.extend(BmobData.TypeName);
  }

  public load() {

  }

  public save() {

  }
}
