export * from './NumberFilter';
export * from './TextFilter';
export * from './Model/Model';
export * from './FilteredDataRowListGetter';

import { FilteredDataRowListGetter } from './FilteredDataRowListGetter';
import { NumberFilter } from './NumberFilter';
import { TextFilter } from './TextFilter';

export const FILTERS_PROVIDERS = [
    NumberFilter,
    FilteredDataRowListGetter,
    TextFilter,
]; 