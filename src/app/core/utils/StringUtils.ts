export default class StringUtils {
  static replaceAllSimpleToDoubleQuotes(str: string): string {
    return str.replace(/'/g, '"');
  }

  static replaceAllDoubleToSimpleQuotes(str: string): string {
    return str.replace(/"/g, "'");
  }

  static stringToArray(value: string) {
    return value.split(', ');
  }
}
