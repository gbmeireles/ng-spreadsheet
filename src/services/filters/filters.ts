export * from './number-filter';
export * from './text-filter';
export * from './model';
export * from './filtered-data-row-list-getter';

import { FilteredDataRowListGetter } from './filtered-data-row-list-getter';
import { NumberFilter } from './number-filter';
import { TextFilter } from './text-filter';

export const FILTERS_PROVIDERS = [
  NumberFilter,
  FilteredDataRowListGetter,
  TextFilter,
];