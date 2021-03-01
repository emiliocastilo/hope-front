export default class StringUtils {
    static replaceAllSimpleToDoubleQuotes (str: string): string {
        return str.replace(/'/g, '"');
    }

    static replaceAllDoubleToSimpleQuotes (str: string): string {
        return str.replace(/"/g, "'");
    }

    static stringToArray (value: string) {
        return value.split(',');
    }

    static validatorSplitter (value: string) {
        value = value.replace(/,Validators/g, '|Validators');
        value = value.replace(/, Validators/g, '|Validators');
        return value.split('|');
    }

    static getParenthesisValue (value: string) {
        console.log(value);
        const firstParenthesis = value.indexOf('(');
        const secondParenthesis = value.indexOf(')');
        return secondParenthesis - firstParenthesis > 1 ? value.match(/\(([^)]+)\)/)[1] : null;
    }
}
