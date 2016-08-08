import { NumberExpression } from './NumberExpression';
import { TextExpression } from './TextExpression';

export class ExpressionGroup {
    expressionList: Array<TextExpression | NumberExpression | ExpressionGroup>;

    constructor() {
        this.expressionList = [];
    }

    filter(data: any): boolean {
        if (!this.expressionList.length) {
            return true;
        }

        return this.expressionList.every(exp => {
            return exp.filter(data);
        });
    }
}