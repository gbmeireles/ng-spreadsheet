import { ComparissonTypeEnum } from './comparisson-type-enum';
export class NumberExpression {
    comparissonType: ComparissonTypeEnum;
    data: number;

    filter(dataToCompare: any): boolean {
        switch (this.comparissonType) {
            case ComparissonTypeEnum.Equal:
                return dataToCompare === this.data;
            case ComparissonTypeEnum.Greater:
                return dataToCompare > this.data;
            case ComparissonTypeEnum.GreaterOrEqual:
                return dataToCompare >= this.data;
            case ComparissonTypeEnum.Less:
                return dataToCompare < this.data;
            case ComparissonTypeEnum.LessOrEqual:
                return dataToCompare <= this.data;
        }
    }
}