/**
 * 属性装饰器，用于定义装饰的属性在Bmob表中的字段名
 * @param {string} name 字段名
 * @returns {(target: Object, propertyKey: string) => void}
 * @constructor
 */
export function BmobField(name: string) {
  return function (target: Object, propertyKey: string) {
    return Reflect.defineMetadata('field-name', name, target);
  };
}
