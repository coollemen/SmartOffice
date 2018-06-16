import 'reflect-metadata'
/**
 * 定义一个类为Bmob Object，可以通过Bmob接口保存和读取数据
 * @param {string} name 需要的表名
 * @returns {(constructor) => any}
 * @constructor 构造函数
 */
export function BmobObject(name:string) {
  return function(constructor){
        let objType=Bmob.Object.extend(name);
        Reflect.defineMetadata("type",objType,constructor);
  };
}
