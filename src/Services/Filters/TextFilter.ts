import { Injectable } from '@angular/core';
import { TextExpression, ExpressionGroup } from './Model/Model';
enum TextFilterTokenEnum {
    Wildcard,
    And,
    Or,
    OpenParenthesis,
    CloseParenthesis,
    Text,
}

@Injectable()
export class TextFilter {
    private expressionToExpressionGroupListMap: { [expression: string]: ExpressionGroup[] } = {};

    constructor() { }

    filterList<T>(dataList: T[], expression: string): T[] {
        var filterFn = this.getIsMatchFn(expression);
        return dataList.filter(filterFn);
    }

    getIsMatchFn(expression: string): (data: any) => boolean {
        if (expression === '') {
            return () => true;
        }

        var expressionGroupList: ExpressionGroup[];
        if (this.expressionToExpressionGroupListMap[expression]) {
            expressionGroupList = this.expressionToExpressionGroupListMap[expression];
        } else {
            try {
                var tokenList = this.getTextFilterTokenList(expression);
                expressionGroupList = this.getExpressionGroupList(tokenList);
            } catch (err) {
                console.warn('Invalid expression:');
                console.warn(err);
                return () => true;
            }
        }
        this.expressionToExpressionGroupListMap[expression] = expressionGroupList;

        return (data: any) => {
            return expressionGroupList.reduce((pv, cv) => {
                return pv || cv.filter(data);
            }, false);
        };
    }

    private getExpressionGroupList(tokenList: Array<TextFilterTokenEnum | string>): ExpressionGroup[] {
        var index = 0;
        var length = tokenList.length;
        var expressionGroupList: ExpressionGroup[] = [];
        var currentExpressionGroup: ExpressionGroup = new ExpressionGroup();
        var currentExpression: TextExpression;
        while (index < length) {
            var token = tokenList[index];
            switch (token) {
                case TextFilterTokenEnum.OpenParenthesis:
                    var subGroupTokenList = this.getSubgroupTokenList(tokenList, index);
                    var subGroupExpressionList = this.getExpressionGroupList(subGroupTokenList);
                    if (index > 0 && tokenList[index - 1] === TextFilterTokenEnum.Or) {
                        expressionGroupList = expressionGroupList.concat(subGroupExpressionList);
                    } else {
                        if (expressionGroupList.length === 0) {
                            expressionGroupList = subGroupExpressionList;
                        } else if (subGroupExpressionList.length > 0) {
                            var result = [];
                            expressionGroupList.forEach(eg => {
                                subGroupExpressionList.forEach(sg => {
                                    var newGroup = new ExpressionGroup();
                                    newGroup.expressionList = eg.expressionList.slice(0);
                                    newGroup.expressionList.push(sg);
                                    result.push(newGroup);
                                });
                            });
                            expressionGroupList = result;
                        }
                    }
                    index += subGroupTokenList.length;
                    break;
                case TextFilterTokenEnum.And:
                    currentExpression = null;
                    break;
                case TextFilterTokenEnum.CloseParenthesis:
                    break;
                case TextFilterTokenEnum.Or:
                    currentExpressionGroup = new ExpressionGroup();
                    currentExpression = null;
                    break;
                default:
                    if (currentExpression == null) {
                        currentExpression = new TextExpression();
                    }
                    currentExpression.data = <string>token;
                    currentExpressionGroup.expressionList.push(currentExpression);
                    if (expressionGroupList.indexOf(currentExpressionGroup) < 0) {
                        expressionGroupList.push(currentExpressionGroup);
                    }
            }

            index++;
        }

        return expressionGroupList;
    }

    private getSubgroupTokenList(tokenList: Array<TextFilterTokenEnum | string>, openParenthesisIndex: number) {
        var index = openParenthesisIndex + 1;
        var length = tokenList.length;
        var openParenthesisCount = 1;
        while (index < length) {
            var token = tokenList[index];
            if (token === TextFilterTokenEnum.OpenParenthesis) {
                openParenthesisCount++;
            }
            if (token === TextFilterTokenEnum.CloseParenthesis) {
                openParenthesisCount--;
            }
            if (openParenthesisCount === 0) {
                return tokenList.slice(openParenthesisIndex + 1, index);
            }
            index++;
        }
        if (openParenthesisCount > 0) {
            console.error('Unclosed parenthesis');
        }
        return tokenList.slice(0);
    }

    private getTextFilterTokenList(expression: string) {
        var charList = expression.split('');
        var index = 0;
        var length = charList.length;
        var tokenList: Array<TextFilterTokenEnum | string> = [];
        var lastToken: TextFilterTokenEnum;
        var data: string = '';
        while (index < length) {
            var char = charList[index];
            var wasText = lastToken === TextFilterTokenEnum.Text;
            let token: TextFilterTokenEnum;
            let removePreviousSpace: boolean = true;
            switch (char) {
                case '+':
                    token = TextFilterTokenEnum.Or;
                    break;
                case '&':
                    token = TextFilterTokenEnum.And;
                    break;
                case '(':
                    token = TextFilterTokenEnum.OpenParenthesis;
                    break;
                case ')':
                    token = TextFilterTokenEnum.CloseParenthesis;
                    break;
                default:
                    removePreviousSpace = false;
                    data += char;
                    token = TextFilterTokenEnum.Text;
            }
            if (token !== TextFilterTokenEnum.Text) {
                data = (data || '').trim();
                if (wasText && data.length > 0) {
                    tokenList.push(data);
                    data = '';
                }
                tokenList.push(token);
            }

            lastToken = token;

            index++;
        }
        if (lastToken === TextFilterTokenEnum.Text) {
            data = (data || '').trim();
            if (data.length > 0) {
                tokenList.push(data);
            }
        }

        return tokenList;
    }

    private escapeRegExp(str: string) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    }
}