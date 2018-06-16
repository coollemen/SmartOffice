import {Injectable} from '@angular/core';

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

  public createQuery(obj:any): Bmob.Query {
    let Type=Reflect.getMetadata('type',obj.constructor);
    let query=new Bmob.Query(Type);
    return query;
  }

  public load<T>(query: Bmob.Query): T[] {
    return null;
  }

  public save(obj: any) {


  }
}
