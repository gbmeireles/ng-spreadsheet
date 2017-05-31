export * from './column-target-width-getter';
export * from './column-size-updater';
export * from './mouse-position-getter';
export * from './column-resize.component';
export * from './model/position';

import { ColumnTargetWidthGetter } from './column-target-width-getter';
import { ColumnSizeUpdater } from './column-size-updater';
import { MousePositionGetter } from './mouse-position-getter';

export const COLUMN_RESIZE_PROVIDERS = [ColumnTargetWidthGetter, ColumnSizeUpdater, MousePositionGetter];