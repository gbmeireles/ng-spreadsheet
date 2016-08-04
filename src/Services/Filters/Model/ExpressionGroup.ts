import { NumberExpression } from './NumberExpression';

export class ExpressionGroup {
    expressionList: Array<NumberExpression | ExpressionGroup>;

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