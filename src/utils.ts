export default class Utils {
  static groupBy(xs: any[], key: string) {
    return xs.reduce((rv, x) => {
      rv[x[key]] = true || [];
      return rv;
    }, {});
  }
  static groupByDani(xs:any[], key:string):any[] {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
}
