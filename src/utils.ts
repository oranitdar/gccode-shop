export default class Utils {
  static groupBy(xs: any[], key: string) {
    return xs.reduce((rv, x) => {
      rv[x[key]] = true || [];
      return rv;
    }, {});
  }
}
