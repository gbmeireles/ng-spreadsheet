import { Injectable } from '@angular/core';
import { SpreadsheetState } from '../spreadsheet/spreadsheet-state';
import { CellLocation } from '../model';
import { ScrollbarDimensionsGetter } from './scrollbar-dimensions-getter';

@Injectable()
export class CellLocationRelativeToViewportGetter {

  constructor(private spreadsheetState: SpreadsheetState, private scrollbarDimensionsGetter: ScrollbarDimensionsGetter) { }

  get(spreadsheetState: SpreadsheetState, targetCellLocation: CellLocation) {
    if (spreadsheetState == null) {
      spreadsheetState = this.spreadsheetState;
    }
    var targetCellPositionInformation = spreadsheetState.columnPositionInformationMap[targetCellLocation.columnIndex];
    var scrollTop = spreadsheetState.scrollTop;
    var bodyHeight = spreadsheetState.bodyHeight;
    var targetColumn = spreadsheetState.spreadsheetColumnList.find(c => c.index === targetCellLocation.columnIndex);
    var scrollbarDimensions = this.scrollbarDimensionsGetter.get();
    if (targetColumn == null) {
      return {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        isOutsideViewport: false,
        isOutsideViewportHorizontally: false,
        isOutsideViewportVertically: false,
        isTopOutsideViewport: false,
        isBottomOutsideViewport: false,
      };
    }
    var sectionPositionInformation = spreadsheetState.spreadsheetSectionPositionInformationMap[targetColumn.sectionName];
    var width = sectionPositionInformation.width;
    var scrollLeft = spreadsheetState.spreadsheetSectionScrollLeftMap[targetColumn.sectionName];
    var rowHeight = spreadsheetState.dataRowHeight;
    var titleRowCount = spreadsheetState.titleSpreadsheetRowList.length;
    var bodyRowIndex = targetCellLocation.rowIndex - titleRowCount;
    var lastSection = spreadsheetState.spreadsheetSectionList[spreadsheetState.spreadsheetSectionList.length - 1];
    var isLastSection = lastSection.name === targetColumn.sectionName;

    var viewport = {
      top: scrollTop,
      left: scrollLeft,
      bottom: scrollTop + bodyHeight - scrollbarDimensions.height,
      right: width + scrollLeft - (isLastSection ? scrollbarDimensions.width : 0),
    };

    var target = {
      top: bodyRowIndex * rowHeight,
      left: targetCellPositionInformation.left,
      bottom: (bodyRowIndex + 1) * rowHeight,
      right: (targetCellPositionInformation.left + targetCellPositionInformation.width),
    };

    var relative = {
      top: target.top - viewport.top,
      left: target.left - viewport.left,
      bottom: target.bottom - viewport.bottom,
      right: target.right - viewport.right,
      isOutsideViewport: false,
      isOutsideViewportHorizontally: false,
      isOutsideViewportVertically: false,
      isTopOutsideViewport: false,
      isBottomOutsideViewport: false,
    };
    var isLeftBorderInsideViewport = relative.left >= 0;
    var isRightBorderInsideViewport = relative.right <= 0;
    var isHorizontalCenterInsideViewport = relative.left <= 0 && relative.right >= 0;
    var isColumnGreaterThanViewport = targetCellPositionInformation.width > width;
    if (isColumnGreaterThanViewport) {
      relative.isOutsideViewportHorizontally = !isHorizontalCenterInsideViewport && !isLeftBorderInsideViewport && !isRightBorderInsideViewport;
    } else {
      relative.isOutsideViewportHorizontally = !isLeftBorderInsideViewport || !isRightBorderInsideViewport;
    }

    relative.isTopOutsideViewport = relative.top < 0;
    relative.isBottomOutsideViewport = relative.bottom > 0;
    relative.isOutsideViewportVertically = !(relative.top < 0 && relative.bottom > 0) && (relative.top < 0 || relative.bottom > 0);
    relative.isOutsideViewport = relative.isOutsideViewportHorizontally || relative.isOutsideViewportVertically;

    return relative;
  }

}