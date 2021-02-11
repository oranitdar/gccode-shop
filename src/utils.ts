import { SortOrder, SortType } from './app/sorter';

export default class Utils {
  static groupBy(xs: any[], key: string) {
    return xs.reduce((rv, x) => {
      rv[x[key]] = true || [];
      return rv;
    }, {});
  }

  // static groupByDani(xs:any[], key:string):any[] {
  //   return xs.reduce(function(rv, x) {
  //     (rv[x[key]] = rv[x[key]] || []).push(x);
  //     return rv;
  //   }, {});
  // };

  static sortArr(xs:any[], key:string, type:SortType, order:SortOrder):any[] {
    if (type == SortType.STRING) {
      if (order == SortOrder.ASC) {
        return xs.sort((a, b) => a[key].localeCompare(b[key]));
      }
      else { //DESC
        return xs.sort((a, b) => b[key].localeCompare(a[key]));
      }
    }
    else { //NUMBER
      if (order == SortOrder.ASC) {
        return xs.sort((a, b) => { return a[key] - b[key]});
      }
      else { //DESC
        return xs.sort((a, b) => { return b[key] - a[key]});
      }
    }
  }
}
