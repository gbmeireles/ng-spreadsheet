import { Injectable } from '@angular/core';
import { NumberExpression, ExpressionGroup, ComparissonTypeEnum } from './model';
enum NumberFilterTokenEnum {
  Greater,
  Equal,
  Less,
  GreaterOrEqual,
  LessOrEqual,
  And,
  Or,
  OpenParenthesis,
  CloseParenthesis,
  Number,
}

@Injectable()
export class NumberFilter {
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
        var tokenList = this.getNumberFilterTokenList(expression);
        if (tokenList.length === 1 && typeof tokenList[0] === 'string') {
          tokenList.unshift(NumberFilterTokenEnum.Equal);
        }
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

  private getExpressionGroupList(tokenList: Array<NumberFilterTokenEnum | string>): ExpressionGroup[] {
    var index = 0;
    var length = tokenList.length;
    var expressionGroupList: ExpressionGroup[] = [];
    var currentExpressionGroup: ExpressionGroup = new ExpressionGroup();
    var currentExpression: NumberExpression;
    while (index < length) {
      var token = tokenList[index];
      switch (token) {
        case NumberFilterTokenEnum.OpenParenthesis:
          var subGroupTokenList = this.getSubgroupTokenList(tokenList, index);
          var subGroupExpressionList = this.getExpressionGroupList(subGroupTokenList);
          if (index > 0 && tokenList[index - 1] === NumberFilterTokenEnum.Or) {
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
        case NumberFilterTokenEnum.And:
        case NumberFilterTokenEnum.CloseParenthesis:
          break;
        case NumberFilterTokenEnum.Equal:
        case NumberFilterTokenEnum.Greater:
        case NumberFilterTokenEnum.GreaterOrEqual:
        case NumberFilterTokenEnum.Less:
        case NumberFilterTokenEnum.LessOrEqual:
          if (currentExpression != null) {
            if (currentExpressionGroup.expressionList.indexOf(currentExpression) < 0) {
              currentExpressionGroup.expressionList.push(currentExpression);
            } else if (tokenList[index - 1] !== NumberFilterTokenEnum.And) {
              console.error('Invalid Token: ' + token);
            }
          }
          currentExpression = new NumberExpression();
          switch (token) {
            case NumberFilterTokenEnum.Equal:
              currentExpression.comparissonType = ComparissonTypeEnum.Equal;
              break;
            case NumberFilterTokenEnum.Greater:
              currentExpression.comparissonType = ComparissonTypeEnum.Greater;
              break;
            case NumberFilterTokenEnum.GreaterOrEqual:
              currentExpression.comparissonType = ComparissonTypeEnum.GreaterOrEqual;
              break;
            case NumberFilterTokenEnum.Less:
              currentExpression.comparissonType = ComparissonTypeEnum.Less;
              break;
            case NumberFilterTokenEnum.LessOrEqual:
              currentExpression.comparissonType = ComparissonTypeEnum.LessOrEqual;
              break;
          }
          break;
        case NumberFilterTokenEnum.Or:
          currentExpressionGroup = new ExpressionGroup();
          break;
        default:
          if (currentExpression == null) {
            console.error('Invalid Token: ' + token);
          }
          currentExpression.data = parseFloat(<string>token);
          currentExpressionGroup.expressionList.push(currentExpression);
          if (expressionGroupList.indexOf(currentExpressionGroup) < 0) {
            expressionGroupList.push(currentExpressionGroup);
          }
      }

      index++;
    }

    return expressionGroupList;
  }

  private getSubgroupTokenList(tokenList: Array<NumberFilterTokenEnum | string>, openParenthesisIndex: number) {
    var index = openParenthesisIndex + 1;
    var length = tokenList.length;
    var openParenthesisCount = 1;
    while (index < length) {
      var token = tokenList[index];
      if (token === NumberFilterTokenEnum.OpenParenthesis) {
        openParenthesisCount++;
      }
      if (token === NumberFilterTokenEnum.CloseParenthesis) {
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

  private getNumberFilterTokenList(expression: string) {
    var charList = expression.replace(new RegExp(' ', 'g'), '').split('');
    var index = 0;
    var length = charList.length;
    var tokenList: Array<NumberFilterTokenEnum | string> = [];
    var lastToken: NumberFilterTokenEnum;
    var data: string = '';
    while (index < length) {
      var char = charList[index];
      var wasNumber = lastToken === NumberFilterTokenEnum.Number;
      let token: NumberFilterTokenEnum;
      switch (char) {
        case '>':
          token = NumberFilterTokenEnum.Greater;
          break;
        case '<':
          token = NumberFilterTokenEnum.Less;
          break;
        case '=':
          if (lastToken === NumberFilterTokenEnum.Greater) {
            tokenList.pop();
            token = NumberFilterTokenEnum.GreaterOrEqual;
          } else if (lastToken === NumberFilterTokenEnum.Less) {
            tokenList.pop();
            token = NumberFilterTokenEnum.LessOrEqual;
          } else {
            token = NumberFilterTokenEnum.Equal;
          }
          break;
        case '+':
          token = NumberFilterTokenEnum.Or;
          break;
        case '&':
          token = NumberFilterTokenEnum.And;
          break;
        case '(':
          token = NumberFilterTokenEnum.OpenParenthesis;
          break;
        case ')':
          token = NumberFilterTokenEnum.CloseParenthesis;
          break;
        default:
          data += char;
          token = NumberFilterTokenEnum.Number;
      }
      if (token !== NumberFilterTokenEnum.Number) {
        if (wasNumber) {
          tokenList.push(data);
          data = '';
        }
        tokenList.push(token);
      }

      lastToken = token;

      index++;
    }
    if (lastToken === NumberFilterTokenEnum.Number) {
      tokenList.push(data);
    }

    return tokenList;
  }
}