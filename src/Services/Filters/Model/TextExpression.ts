export class TextExpression {
    private _data: string;
    private _regex: RegExp;
    set data(value: string) {
        this._data = value;

        var escapedData = this.escapeRegExp(value);
        escapedData = (value || '').replace(new RegExp('\\*', 'g'), '.*');

        var rule = '^' + escapedData + '$';
        this._regex = new RegExp(rule, 'i');
    }
    get data() {
        return this._data;
    }

    filter(dataToCompare: any): boolean {
        return this._regex.test(dataToCompare);
    }

    private escapeRegExp(str: string) {
        return str.replace(/[\-\[\]\/\{\}\(\)\+\?\.\\\^\$\|]/g, '\\$&');
    }
}