import {Injectable} from '@angular/core';
import {BmobData} from '../models/bmob-data';

@Injectable({
  providedIn: 'root'
})
/**
 * Bmob服务
 */
export class BmobService {

  constructor() {
    Bmob.initialize('921d1bd493411db02d8bcf1a8562b843', 'a2171a5687d9e98ca75443ddc431d43c');
  }

  /**
   * 根据构造函数创建相应的Bmob Query类
   * @param {Function} constructor 构造函数
   * @returns {Bmob.Query} 查询类
   */
  public createQuery(constructor: Function): Bmob.Query {
    let BmobType = Reflect.getMetadata('bmob-type', constructor);
    let query = new Bmob.Query(BmobType);
    return query;
  }

  public load(query: Bmob.Query): any {
    return query.find(null);
  }

  public save(bmobObj: BmobData): any {
    return bmobObj.data.save(null, null);
  }
}
