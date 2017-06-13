(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("rxjs"), require("@angular/common"), require("@angular/platform-browser"));
	else if(typeof define === 'function' && define.amd)
		define("ng-spreadsheet", ["@angular/core", "rxjs", "@angular/common", "@angular/platform-browser"], factory);
	else if(typeof exports === 'object')
		exports["ng-spreadsheet"] = factory(require("@angular/core"), require("rxjs"), require("@angular/common"), require("@angular/platform-browser"));
	else
		root["ng-spreadsheet"] = factory(root["@angular/core"], root["rxjs"], root["@angular/common"], root["@angular/platform-browser"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_142__, __WEBPACK_EXTERNAL_MODULE_143__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 81);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(92));
__export(__webpack_require__(95));
__export(__webpack_require__(84));
__export(__webpack_require__(89));
__export(__webpack_require__(86));
__export(__webpack_require__(94));
__export(__webpack_require__(96));
__export(__webpack_require__(88));
__export(__webpack_require__(91));
__export(__webpack_require__(82));
__export(__webpack_require__(87));
__export(__webpack_require__(93));
__export(__webpack_require__(85));
__export(__webpack_require__(83));
__export(__webpack_require__(90));
exports.COLUMN_NUMBER_WIDTH = 28;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
__export(__webpack_require__(69));
exports.DISPATCHER_TOKEN = new core_1.OpaqueToken('Dispatcher');
exports.DISPATCHER_PROVIDERS = [
    {
        provide: exports.DISPATCHER_TOKEN,
        multi: false,
        useFactory: function () { return new core_1.EventEmitter(false); },
        deps: [],
    },
];


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var data_spreadsheet_row_list_getter_1 = __webpack_require__(20);
exports.DataSpreadsheetRowListGetter = data_spreadsheet_row_list_getter_1.DataSpreadsheetRowListGetter;
var column_list_getter_1 = __webpack_require__(101);
exports.ColumnListGetter = column_list_getter_1.ColumnListGetter;
var spreadsheet_rowspan_setter_1 = __webpack_require__(12);
exports.SpreadsheetRowspanSetter = spreadsheet_rowspan_setter_1.SpreadsheetRowspanSetter;
var title_spreadsheet_row_list_getter_1 = __webpack_require__(27);
exports.TitleSpreadsheetRowListGetter = title_spreadsheet_row_list_getter_1.TitleSpreadsheetRowListGetter;
var column_position_information_map_calculator_1 = __webpack_require__(102);
exports.ColumnPositionInformationMapCalculator = column_position_information_map_calculator_1.ColumnPositionInformationMapCalculator;
var cell_position_updater_1 = __webpack_require__(99);
exports.CellPositionUpdater = cell_position_updater_1.CellPositionUpdater;
var section_position_information_map_calculator_1 = __webpack_require__(110);
exports.SectionPositionInformationMapCalculator = section_position_information_map_calculator_1.SectionPositionInformationMapCalculator;
var column_viewport_updater_1 = __webpack_require__(103);
exports.ColumnViewportUpdater = column_viewport_updater_1.ColumnViewportUpdater;
var row_viewport_updater_1 = __webpack_require__(109);
exports.RowViewportUpdater = row_viewport_updater_1.RowViewportUpdater;
var row_viewport_visible_row_count_getter_1 = __webpack_require__(24);
exports.RowViewportVisibleRowCountGetter = row_viewport_visible_row_count_getter_1.RowViewportVisibleRowCountGetter;
var spreadsheet_column_list_getter_1 = __webpack_require__(111);
exports.SpreadsheetColumnListGetter = spreadsheet_column_list_getter_1.SpreadsheetColumnListGetter;
var spreadsheet_section_list_getter_1 = __webpack_require__(26);
exports.SpreadsheetSectionListGetter = spreadsheet_section_list_getter_1.SpreadsheetSectionListGetter;
var column_to_render_index_list_getter_1 = __webpack_require__(19);
exports.ColumnToRenderIndexListGetter = column_to_render_index_list_getter_1.ColumnToRenderIndexListGetter;
var row_to_render_index_list_getter_1 = __webpack_require__(5);
exports.RowToRenderIndexListGetter = row_to_render_index_list_getter_1.RowToRenderIndexListGetter;
var spreadsheet_section_scroll_width_map_calculator_1 = __webpack_require__(112);
exports.SpreadsheetSectionScrollWidthMapCalculator = spreadsheet_section_scroll_width_map_calculator_1.SpreadsheetSectionScrollWidthMapCalculator;
var number_title_row_list_getter_1 = __webpack_require__(108);
exports.NumberTitleRowListGetter = number_title_row_list_getter_1.NumberTitleRowListGetter;
var number_data_row_list_getter_1 = __webpack_require__(107);
exports.NumberDataRowListGetter = number_data_row_list_getter_1.NumberDataRowListGetter;
var spreadsheet_section_data_row_map_getter_1 = __webpack_require__(25);
exports.SpreadsheetSectionDataRowMapGetter = spreadsheet_section_data_row_map_getter_1.SpreadsheetSectionDataRowMapGetter;
var cell_manager_1 = __webpack_require__(18);
exports.CellManager = cell_manager_1.CellManager;
var cell_location_relative_to_viewport_getter_1 = __webpack_require__(98);
exports.CellLocationRelativeToViewportGetter = cell_location_relative_to_viewport_getter_1.CellLocationRelativeToViewportGetter;
var cell_getter_1 = __webpack_require__(97);
exports.CellGetter = cell_getter_1.CellGetter;
var filters_1 = __webpack_require__(22);
var column_identifier_map_getter_1 = __webpack_require__(100);
exports.ColumnIdentifierMapGetter = column_identifier_map_getter_1.ColumnIdentifierMapGetter;
__export(__webpack_require__(22));
exports.SPREADSHEET_SCOPE_PROVIDERS = [
    column_position_information_map_calculator_1.ColumnPositionInformationMapCalculator,
    data_spreadsheet_row_list_getter_1.DataSpreadsheetRowListGetter,
    column_list_getter_1.ColumnListGetter,
    spreadsheet_rowspan_setter_1.SpreadsheetRowspanSetter,
    spreadsheet_section_list_getter_1.SpreadsheetSectionListGetter,
    title_spreadsheet_row_list_getter_1.TitleSpreadsheetRowListGetter,
    cell_position_updater_1.CellPositionUpdater,
    section_position_information_map_calculator_1.SectionPositionInformationMapCalculator,
    column_viewport_updater_1.ColumnViewportUpdater,
    row_viewport_updater_1.RowViewportUpdater,
    row_viewport_visible_row_count_getter_1.RowViewportVisibleRowCountGetter,
    spreadsheet_column_list_getter_1.SpreadsheetColumnListGetter,
    row_to_render_index_list_getter_1.RowToRenderIndexListGetter,
    cell_location_relative_to_viewport_getter_1.CellLocationRelativeToViewportGetter,
    column_to_render_index_list_getter_1.ColumnToRenderIndexListGetter
].concat(filters_1.FILTERS_PROVIDERS, [
    spreadsheet_section_scroll_width_map_calculator_1.SpreadsheetSectionScrollWidthMapCalculator,
    number_title_row_list_getter_1.NumberTitleRowListGetter,
    number_data_row_list_getter_1.NumberDataRowListGetter,
    spreadsheet_section_data_row_map_getter_1.SpreadsheetSectionDataRowMapGetter,
    cell_manager_1.CellManager,
    cell_getter_1.CellGetter,
    column_identifier_map_getter_1.ColumnIdentifierMapGetter,
]);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var SpreadsheetState = (function () {
    function SpreadsheetState(spreadsheetState) {
        if (spreadsheetState == null) {
            this.activeRowIndexList = [];
            this.activeCellLocation = { rowIndex: 0, columnIndex: 0 };
            this.columnDefinitionList = [];
            this.columnList = [];
            this.spreadsheetColumnList = [];
            this.filterExpressionMap = {};
            this.columnPositionInformationMap = {};
            this.isFilterOpenMap = {};
            this.totalHeight = 0;
            this.bodyHeight = 0;
            this.dataRowHeight = 20;
            this.scrollTop = 0;
            this.spreadsheetSectionList = [];
            this.spreadsheetSectionScrollWidthMap = {};
            this.spreadsheetSectionPositionInformationMap = {};
            this.dataRowList = [];
            this.originalDataRowList = [];
            this.spreadsheetWidth = 0;
            this.numberDataRowList = [];
            this.numberTitleRowList = [];
            this.spreadsheetSectionColumnToRendexIndexListMap = {};
            this.titleSpreadsheetRowList = [];
            this.dataSpreadsheetRowList = [];
            return;
        }
    }
    return SpreadsheetState;
}());
SpreadsheetState = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [SpreadsheetState])
], SpreadsheetState);
exports.SpreadsheetState = SpreadsheetState;
exports.default = SpreadsheetState;
exports.SPREADSHEET_STATE_PROVIDERS = [
    {
        deps: [],
        multi: false,
        provide: SpreadsheetState,
        useFactory: function () { return new SpreadsheetState(); },
    },
];


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var row_viewport_visible_row_count_getter_1 = __webpack_require__(24);
var RowToRenderIndexListGetter = (function () {
    function RowToRenderIndexListGetter(rowViewportVisibleRowCountGetter) {
        this.rowViewportVisibleRowCountGetter = rowViewportVisibleRowCountGetter;
        this.rowToRenderIndexList = [];
    }
    RowToRenderIndexListGetter.prototype.getListForSpreadsheetSection = function (spreadsheetState, spreadsheetSection) {
        var rowHeight = spreadsheetState.dataRowHeight;
        var scrollTop = spreadsheetState.scrollTop;
        var visibleRowCount = this.rowViewportVisibleRowCountGetter.get(spreadsheetState);
        if (scrollTop < 0) {
            return this.rowToRenderIndexList;
        }
        if (rowHeight === 0) {
            return [];
        }
        var firstVisibleRowIndex = Math.floor(scrollTop / rowHeight) || 0;
        firstVisibleRowIndex = Math.max(firstVisibleRowIndex, 0);
        var lastVisibleRowIndex = visibleRowCount + firstVisibleRowIndex;
        var rowList = spreadsheetSection.dataRowList;
        if (lastVisibleRowIndex > rowList.length - 1) {
            lastVisibleRowIndex = rowList.length - 1;
            firstVisibleRowIndex = Math.max(lastVisibleRowIndex - visibleRowCount - 2, 0);
        }
        if (this.previousFirstVisibleRowIndex === firstVisibleRowIndex && this.previousLastVisibleRowIndex === lastVisibleRowIndex) {
            return this.rowToRenderIndexList;
        }
        this.previousFirstVisibleRowIndex = firstVisibleRowIndex;
        this.previousLastVisibleRowIndex = lastVisibleRowIndex;
        this.rowToRenderIndexList = this.getVisibleRowIndexList(visibleRowCount, firstVisibleRowIndex, lastVisibleRowIndex);
        return this.rowToRenderIndexList;
    };
    RowToRenderIndexListGetter.prototype.getList = function (spreadsheetState) {
        var spreadsheetSection = spreadsheetState.spreadsheetSectionList[0];
        if (!spreadsheetSection) {
            return [];
        }
        return this.getListForSpreadsheetSection(spreadsheetState, spreadsheetSection);
    };
    RowToRenderIndexListGetter.prototype.getVisibleRowIndexList = function (visibleRowCount, firstVisibleRowIndex, lastVisibleRowIndex) {
        var visibleRowIndexList = new Array(visibleRowCount);
        var index = firstVisibleRowIndex;
        var counter = 0;
        while (index <= lastVisibleRowIndex) {
            visibleRowIndexList[counter] = index;
            counter++;
            index++;
        }
        return visibleRowIndexList;
    };
    return RowToRenderIndexListGetter;
}());
RowToRenderIndexListGetter = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof row_viewport_visible_row_count_getter_1.RowViewportVisibleRowCountGetter !== "undefined" && row_viewport_visible_row_count_getter_1.RowViewportVisibleRowCountGetter) === "function" && _a || Object])
], RowToRenderIndexListGetter);
exports.RowToRenderIndexListGetter = RowToRenderIndexListGetter;
var _a;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ColumnGetter = (function () {
    function ColumnGetter() {
    }
    ColumnGetter.prototype.getBySpreadsheetColumnIndex = function (columnList, spreadsheetColumnIndex) {
        return columnList.find(function (c) { return c.startIndex <= spreadsheetColumnIndex && c.endIndex >= spreadsheetColumnIndex; });
    };
    return ColumnGetter;
}());
ColumnGetter = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ColumnGetter);
exports.ColumnGetter = ColumnGetter;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var column_getter_1 = __webpack_require__(6);
var ColumnMover = (function () {
    function ColumnMover(columnGetter) {
        this.columnGetter = columnGetter;
    }
    ColumnMover.prototype.moveColumn = function (spreadsheetState, action) {
        var oldColumnIndex = action.payload.oldColumnIndex;
        var newColumnIndex = action.payload.newColumnIndex;
        if (oldColumnIndex === newColumnIndex) {
            return spreadsheetState.columnDefinitionList;
        }
        var columnList = spreadsheetState.columnList.map(function (i) { return Object.assign({}, i); });
        var columnToTarget = this.columnGetter.getBySpreadsheetColumnIndex(columnList, newColumnIndex);
        var columnToMove = this.columnGetter.getBySpreadsheetColumnIndex(columnList, oldColumnIndex);
        if (!columnToMove) {
            return spreadsheetState.columnDefinitionList;
        }
        if (columnToTarget.endIndex !== columnToTarget.startIndex) {
            return spreadsheetState.columnDefinitionList;
        }
        if (columnToMove === columnToTarget) {
            return spreadsheetState.columnDefinitionList;
        }
        var columnDefinitionList = spreadsheetState.columnDefinitionList.map(function (i) { return Object.assign({}, i); });
        var columnDefinitionToTarget = columnDefinitionList.find(function (cd) { return cd.name === columnToTarget.name; });
        var columnDefinitionToMove = columnDefinitionList.find(function (cd) { return cd.name === columnToMove.name; });
        var columnDefinitionIndexToMove = columnDefinitionList.indexOf(columnDefinitionToMove);
        var columnDefinitionIndexToTarget = columnDefinitionList.indexOf(columnDefinitionToTarget);
        columnDefinitionList.splice(columnDefinitionIndexToMove, 1);
        columnDefinitionList.splice(columnDefinitionIndexToTarget, 0, columnDefinitionToMove);
        return columnDefinitionList;
    };
    ColumnMover.prototype.moveFilterExpressionMap = function (filterExpressionMap, oldColumnIndex, newColumnIndex) {
        var originalFilterExpressionMap = Object.assign({}, filterExpressionMap);
        var result = Object.assign({}, filterExpressionMap);
        result[newColumnIndex] = originalFilterExpressionMap[oldColumnIndex];
        if (oldColumnIndex > newColumnIndex) {
            var index = newColumnIndex;
            while (index < oldColumnIndex) {
                result[index + 1] = originalFilterExpressionMap[index];
                index++;
            }
        }
        else {
            var index = oldColumnIndex;
            while (index < newColumnIndex) {
                result[index] = originalFilterExpressionMap[index + 1];
                index++;
            }
        }
        return result;
    };
    return ColumnMover;
}());
ColumnMover = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof column_getter_1.ColumnGetter !== "undefined" && column_getter_1.ColumnGetter) === "function" && _a || Object])
], ColumnMover);
exports.ColumnMover = ColumnMover;
var _a;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ColumnSizeUpdater = (function () {
    function ColumnSizeUpdater() {
    }
    ColumnSizeUpdater.prototype.columnSizeUpdater = function (spreadsheetState, action) {
        var columnList = spreadsheetState.columnList.slice(0).map(function (i) { return Object.assign({}, i); });
        var column = columnList.find(function (c) { return c.name === action.payload.columnName; });
        if (!column) {
            return;
        }
        column.width = action.payload.columnSize;
        return columnList;
    };
    return ColumnSizeUpdater;
}());
ColumnSizeUpdater = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ColumnSizeUpdater);
exports.ColumnSizeUpdater = ColumnSizeUpdater;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(23));
__export(__webpack_require__(105));
__export(__webpack_require__(104));
__export(__webpack_require__(106));


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var model_1 = __webpack_require__(9);
var NumberFilterTokenEnum;
(function (NumberFilterTokenEnum) {
    NumberFilterTokenEnum[NumberFilterTokenEnum["Greater"] = 0] = "Greater";
    NumberFilterTokenEnum[NumberFilterTokenEnum["Equal"] = 1] = "Equal";
    NumberFilterTokenEnum[NumberFilterTokenEnum["Less"] = 2] = "Less";
    NumberFilterTokenEnum[NumberFilterTokenEnum["GreaterOrEqual"] = 3] = "GreaterOrEqual";
    NumberFilterTokenEnum[NumberFilterTokenEnum["LessOrEqual"] = 4] = "LessOrEqual";
    NumberFilterTokenEnum[NumberFilterTokenEnum["And"] = 5] = "And";
    NumberFilterTokenEnum[NumberFilterTokenEnum["Or"] = 6] = "Or";
    NumberFilterTokenEnum[NumberFilterTokenEnum["OpenParenthesis"] = 7] = "OpenParenthesis";
    NumberFilterTokenEnum[NumberFilterTokenEnum["CloseParenthesis"] = 8] = "CloseParenthesis";
    NumberFilterTokenEnum[NumberFilterTokenEnum["Number"] = 9] = "Number";
})(NumberFilterTokenEnum || (NumberFilterTokenEnum = {}));
var NumberFilter = (function () {
    function NumberFilter() {
        this.expressionToExpressionGroupListMap = {};
    }
    NumberFilter.prototype.filterList = function (dataList, expression) {
        var filterFn = this.getIsMatchFn(expression);
        return dataList.filter(filterFn);
    };
    NumberFilter.prototype.getIsMatchFn = function (expression) {
        if (expression === '') {
            return function () { return true; };
        }
        var expressionGroupList;
        if (this.expressionToExpressionGroupListMap[expression]) {
            expressionGroupList = this.expressionToExpressionGroupListMap[expression];
        }
        else {
            try {
                var tokenList = this.getNumberFilterTokenList(expression);
                if (tokenList.length === 1 && typeof tokenList[0] === 'string') {
                    tokenList.unshift(NumberFilterTokenEnum.Equal);
                }
                expressionGroupList = this.getExpressionGroupList(tokenList);
            }
            catch (err) {
                console.warn('Invalid expression:');
                console.warn(err);
                return function () { return true; };
            }
        }
        this.expressionToExpressionGroupListMap[expression] = expressionGroupList;
        return function (data) {
            return expressionGroupList.reduce(function (pv, cv) {
                return pv || cv.filter(data);
            }, false);
        };
    };
    NumberFilter.prototype.getExpressionGroupList = function (tokenList) {
        var index = 0;
        var length = tokenList.length;
        var expressionGroupList = [];
        var currentExpressionGroup = new model_1.ExpressionGroup();
        var currentExpression;
        while (index < length) {
            var token = tokenList[index];
            switch (token) {
                case NumberFilterTokenEnum.OpenParenthesis:
                    var subGroupTokenList = this.getSubgroupTokenList(tokenList, index);
                    var subGroupExpressionList = this.getExpressionGroupList(subGroupTokenList);
                    if (index > 0 && tokenList[index - 1] === NumberFilterTokenEnum.Or) {
                        expressionGroupList = expressionGroupList.concat(subGroupExpressionList);
                    }
                    else {
                        if (expressionGroupList.length === 0) {
                            expressionGroupList = subGroupExpressionList;
                        }
                        else if (subGroupExpressionList.length > 0) {
                            var result = [];
                            expressionGroupList.forEach(function (eg) {
                                subGroupExpressionList.forEach(function (sg) {
                                    var newGroup = new model_1.ExpressionGroup();
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
                        }
                        else if (tokenList[index - 1] !== NumberFilterTokenEnum.And) {
                            console.error('Invalid Token: ' + token);
                        }
                    }
                    currentExpression = new model_1.NumberExpression();
                    switch (token) {
                        case NumberFilterTokenEnum.Equal:
                            currentExpression.comparissonType = model_1.ComparissonTypeEnum.Equal;
                            break;
                        case NumberFilterTokenEnum.Greater:
                            currentExpression.comparissonType = model_1.ComparissonTypeEnum.Greater;
                            break;
                        case NumberFilterTokenEnum.GreaterOrEqual:
                            currentExpression.comparissonType = model_1.ComparissonTypeEnum.GreaterOrEqual;
                            break;
                        case NumberFilterTokenEnum.Less:
                            currentExpression.comparissonType = model_1.ComparissonTypeEnum.Less;
                            break;
                        case NumberFilterTokenEnum.LessOrEqual:
                            currentExpression.comparissonType = model_1.ComparissonTypeEnum.LessOrEqual;
                            break;
                    }
                    break;
                case NumberFilterTokenEnum.Or:
                    currentExpressionGroup = new model_1.ExpressionGroup();
                    break;
                default:
                    if (currentExpression == null) {
                        console.error('Invalid Token: ' + token);
                    }
                    currentExpression.data = parseFloat(token);
                    currentExpressionGroup.expressionList.push(currentExpression);
                    if (expressionGroupList.indexOf(currentExpressionGroup) < 0) {
                        expressionGroupList.push(currentExpressionGroup);
                    }
            }
            index++;
        }
        return expressionGroupList;
    };
    NumberFilter.prototype.getSubgroupTokenList = function (tokenList, openParenthesisIndex) {
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
    };
    NumberFilter.prototype.getNumberFilterTokenList = function (expression) {
        var charList = expression.replace(new RegExp(' ', 'g'), '').split('');
        var index = 0;
        var length = charList.length;
        var tokenList = [];
        var lastToken;
        var data = '';
        while (index < length) {
            var char = charList[index];
            var wasNumber = lastToken === NumberFilterTokenEnum.Number;
            var token = void 0;
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
                    }
                    else if (lastToken === NumberFilterTokenEnum.Less) {
                        tokenList.pop();
                        token = NumberFilterTokenEnum.LessOrEqual;
                    }
                    else {
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
    };
    return NumberFilter;
}());
NumberFilter = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], NumberFilter);
exports.NumberFilter = NumberFilter;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var model_1 = __webpack_require__(9);
var TextFilterTokenEnum;
(function (TextFilterTokenEnum) {
    TextFilterTokenEnum[TextFilterTokenEnum["Wildcard"] = 0] = "Wildcard";
    TextFilterTokenEnum[TextFilterTokenEnum["And"] = 1] = "And";
    TextFilterTokenEnum[TextFilterTokenEnum["Or"] = 2] = "Or";
    TextFilterTokenEnum[TextFilterTokenEnum["OpenParenthesis"] = 3] = "OpenParenthesis";
    TextFilterTokenEnum[TextFilterTokenEnum["CloseParenthesis"] = 4] = "CloseParenthesis";
    TextFilterTokenEnum[TextFilterTokenEnum["Text"] = 5] = "Text";
})(TextFilterTokenEnum || (TextFilterTokenEnum = {}));
var TextFilter = (function () {
    function TextFilter() {
        this.expressionToExpressionGroupListMap = {};
    }
    TextFilter.prototype.filterList = function (dataList, expression) {
        var filterFn = this.getIsMatchFn(expression);
        return dataList.filter(filterFn);
    };
    TextFilter.prototype.getIsMatchFn = function (expression) {
        if (expression === '') {
            return function () { return true; };
        }
        var expressionGroupList;
        if (this.expressionToExpressionGroupListMap[expression]) {
            expressionGroupList = this.expressionToExpressionGroupListMap[expression];
        }
        else {
            try {
                var tokenList = this.getTextFilterTokenList(expression);
                expressionGroupList = this.getExpressionGroupList(tokenList);
            }
            catch (err) {
                console.warn('Invalid expression:');
                console.warn(err);
                return function () { return true; };
            }
        }
        this.expressionToExpressionGroupListMap[expression] = expressionGroupList;
        return function (data) {
            return expressionGroupList.reduce(function (pv, cv) {
                return pv || cv.filter(data);
            }, false);
        };
    };
    TextFilter.prototype.getExpressionGroupList = function (tokenList) {
        var index = 0;
        var length = tokenList.length;
        var expressionGroupList = [];
        var currentExpressionGroup = new model_1.ExpressionGroup();
        var currentExpression;
        while (index < length) {
            var token = tokenList[index];
            switch (token) {
                case TextFilterTokenEnum.OpenParenthesis:
                    var subGroupTokenList = this.getSubgroupTokenList(tokenList, index);
                    var subGroupExpressionList = this.getExpressionGroupList(subGroupTokenList);
                    if (index > 0 && tokenList[index - 1] === TextFilterTokenEnum.Or) {
                        expressionGroupList = expressionGroupList.concat(subGroupExpressionList);
                    }
                    else {
                        if (expressionGroupList.length === 0) {
                            expressionGroupList = subGroupExpressionList;
                        }
                        else if (subGroupExpressionList.length > 0) {
                            var result = [];
                            expressionGroupList.forEach(function (eg) {
                                subGroupExpressionList.forEach(function (sg) {
                                    var newGroup = new model_1.ExpressionGroup();
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
                    currentExpressionGroup = new model_1.ExpressionGroup();
                    currentExpression = null;
                    break;
                default:
                    if (currentExpression == null) {
                        currentExpression = new model_1.TextExpression();
                    }
                    currentExpression.data = token;
                    currentExpressionGroup.expressionList.push(currentExpression);
                    if (expressionGroupList.indexOf(currentExpressionGroup) < 0) {
                        expressionGroupList.push(currentExpressionGroup);
                    }
            }
            index++;
        }
        return expressionGroupList;
    };
    TextFilter.prototype.getSubgroupTokenList = function (tokenList, openParenthesisIndex) {
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
    };
    TextFilter.prototype.getTextFilterTokenList = function (expression) {
        var charList = expression.split('');
        var index = 0;
        var length = charList.length;
        var tokenList = [];
        var lastToken;
        var data = '';
        while (index < length) {
            var char = charList[index];
            var wasText = lastToken === TextFilterTokenEnum.Text;
            var token = void 0;
            var removePreviousSpace = true;
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
    };
    TextFilter.prototype.escapeRegExp = function (str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    };
    return TextFilter;
}());
TextFilter = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], TextFilter);
exports.TextFilter = TextFilter;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var SpreadsheetRowspanSetter = (function () {
    function SpreadsheetRowspanSetter() {
    }
    SpreadsheetRowspanSetter.prototype.set = function (spreadsheetRowList) {
        var rowCount = spreadsheetRowList.length;
        var list = this.getRowCellList(spreadsheetRowList);
        var cellByColumnMapByRowMap = this.getCellByColumnMapByRowMap(list);
        var maxRowIndex = spreadsheetRowList.reduce(function (pv, cv) { return Math.max(cv.rowIndex, pv); }, 0);
        list.forEach(function (rc) {
            var nextRowCellInSameColumn = rc;
            var rowIndex = rc.row.rowIndex + 1;
            while (rowIndex <= maxRowIndex) {
                if (!cellByColumnMapByRowMap[rowIndex]) {
                    rowIndex++;
                    continue;
                }
                var cellByColumnMap = cellByColumnMapByRowMap[rowIndex];
                var columnIndex = rc.cell.columnIndex;
                while (columnIndex >= 0) {
                    if (!cellByColumnMap[columnIndex]) {
                        columnIndex--;
                        continue;
                    }
                    var result = cellByColumnMap[columnIndex];
                    var maxAffectedColumnIndex = result.cell.columnIndex + result.cell.colspan - 1;
                    if (columnIndex < rc.cell.columnIndex && maxAffectedColumnIndex < rc.cell.columnIndex) {
                        break;
                    }
                    if (maxAffectedColumnIndex >= rc.cell.columnIndex) {
                        nextRowCellInSameColumn = result;
                        break;
                    }
                    columnIndex--;
                }
                if (nextRowCellInSameColumn != rc) {
                    break;
                }
                rowIndex++;
            }
            if (nextRowCellInSameColumn == rc) {
                rc.cell.rowspan = rowCount - rc.row.sectionRowIndex;
            }
            else {
                rc.cell.rowspan = (nextRowCellInSameColumn.row.rowIndex + nextRowCellInSameColumn.cell.rowspan - 1) - rc.row.rowIndex;
            }
        });
    };
    SpreadsheetRowspanSetter.prototype.getRowCellList = function (spreadsheetRowList) {
        if (spreadsheetRowList.length === 0) {
            return [];
        }
        var result = new Array(spreadsheetRowList.length * spreadsheetRowList[0].cellList.length);
        spreadsheetRowList = spreadsheetRowList.sort(function (rowA, rowB) { return (rowA.rowIndex > rowB.rowIndex) ? 1 : -1; });
        var counter = 0;
        spreadsheetRowList.forEach(function (row) {
            row.cellList.forEach(function (cell) {
                result[counter] = {
                    cell: cell,
                    row: row,
                };
                counter++;
            });
        });
        result.length = counter;
        return result;
    };
    SpreadsheetRowspanSetter.prototype.getCellByColumnMapByRowMap = function (rowCellList) {
        var result = {};
        var index = 0;
        var length = rowCellList.length;
        while (index < length) {
            var rc = rowCellList[index];
            index++;
            if (!result[rc.row.rowIndex]) {
                result[rc.row.rowIndex] = {};
            }
            result[rc.row.rowIndex][rc.cell.columnIndex] = rc;
        }
        return result;
    };
    return SpreadsheetRowspanSetter;
}());
SpreadsheetRowspanSetter = __decorate([
    core_1.Injectable()
], SpreadsheetRowspanSetter);
exports.SpreadsheetRowspanSetter = SpreadsheetRowspanSetter;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var IsCellActiveChecker = (function () {
    function IsCellActiveChecker() {
    }
    IsCellActiveChecker.prototype.check = function (spreadsheetCell, activeCellLocation) {
        if (!spreadsheetCell || activeCellLocation == null) {
            return false;
        }
        else if (activeCellLocation.rowIndex !== spreadsheetCell.rowIndex) {
            return false;
        }
        else if (activeCellLocation.columnIndex !== spreadsheetCell.columnIndex) {
            return false;
        }
        else {
            return true;
        }
    };
    return IsCellActiveChecker;
}());
IsCellActiveChecker = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], IsCellActiveChecker);
exports.IsCellActiveChecker = IsCellActiveChecker;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var services_1 = __webpack_require__(3);
var ColumnTargetWidthGetter = (function () {
    function ColumnTargetWidthGetter(cellManager) {
        this.cellManager = cellManager;
    }
    ColumnTargetWidthGetter.prototype.getTargetWidth = function (spreadsheetColumnIndex) {
        return this.cellManager.getCellListBySpreadsheetColumnIndex(spreadsheetColumnIndex).reduce(function (targetWidth, cell) {
            return Math.max(cell.getScrollWidth(), targetWidth);
        }, 50) + 5;
    };
    return ColumnTargetWidthGetter;
}());
ColumnTargetWidthGetter = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof services_1.CellManager !== "undefined" && services_1.CellManager) === "function" && _a || Object])
], ColumnTargetWidthGetter);
exports.ColumnTargetWidthGetter = ColumnTargetWidthGetter;
exports.default = ColumnTargetWidthGetter;
var _a;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var MousePositionGetter = (function () {
    function MousePositionGetter() {
    }
    MousePositionGetter.prototype.getPosition = function (evt) {
        if (evt.type.indexOf('touch') === 0) {
            var touchEvt = evt;
            var touch = (touchEvt.touches[0] || touchEvt.changedTouches[0]);
            return {
                x: touch.pageX,
                y: touch.pageY,
            };
        }
        var mouse = evt;
        return {
            x: mouse.pageX,
            y: mouse.pageY,
        };
    };
    return MousePositionGetter;
}());
MousePositionGetter = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], MousePositionGetter);
exports.MousePositionGetter = MousePositionGetter;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var body_1 = __webpack_require__(29);
exports.BodyComponent = body_1.BodyComponent;
var header_1 = __webpack_require__(128);
exports.HeaderComponent = header_1.HeaderComponent;
var row_1 = __webpack_require__(136);
exports.RowComponent = row_1.RowComponent;
var spreadsheet_component_1 = __webpack_require__(139);
exports.SpreadsheetComponent = spreadsheet_component_1.SpreadsheetComponent;
__export(__webpack_require__(30));
__export(__webpack_require__(31));
__export(__webpack_require__(32));
var column_row_1 = __webpack_require__(122);
exports.ColumnRowComponent = column_row_1.ColumnRowComponent;
var body_section_1 = __webpack_require__(28);
exports.BodySectionComponent = body_section_1.BodySectionComponent;
var header_section_1 = __webpack_require__(126);
exports.HeaderSectionComponent = header_section_1.HeaderSectionComponent;
var number_row_list_1 = __webpack_require__(132);
exports.NumberRowListComponent = number_row_list_1.NumberRowListComponent;
var row_list_1 = __webpack_require__(134);
exports.RowListComponent = row_list_1.RowListComponent;
var details_bar_1 = __webpack_require__(124);
exports.DetailsBarComponent = details_bar_1.DetailsBarComponent;
var status_bar_1 = __webpack_require__(140);
exports.StatusBarComponent = status_bar_1.StatusBarComponent;
var column_corner_cell_1 = __webpack_require__(118);
exports.ColumnCornerCellComponent = column_corner_cell_1.ColumnCornerCellComponent;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var CellManager = (function () {
    function CellManager() {
        this.cellList = [];
    }
    CellManager.prototype.getCellList = function () {
        return this.cellList.slice(0);
    };
    CellManager.prototype.getCellListBySpreadsheetColumnIndex = function (spreadsheetColumnIndex) {
        return this.cellList.filter(function (c) { return c.spreadsheetColumnIndex === spreadsheetColumnIndex; });
    };
    CellManager.prototype.getCellByPosition = function (spreadsheetColumnIndex, rowNumberIndex) {
        return this.cellList.find(function (c) { return c.spreadsheetColumnIndex === spreadsheetColumnIndex && c.spreadsheetCell.rowIndex === rowNumberIndex; });
    };
    CellManager.prototype.addCell = function (cell) {
        this.cellList.push(cell);
    };
    CellManager.prototype.removeCell = function (cell) {
        var index = this.cellList.indexOf(cell);
        if (index < 0) {
            return;
        }
        this.cellList.splice(index, 1);
    };
    return CellManager;
}());
CellManager = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], CellManager);
exports.CellManager = CellManager;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ColumnToRenderIndexListGetter = (function () {
    function ColumnToRenderIndexListGetter() {
        this.firstVisibleCellIndex = 0;
        this.lastVisibleCellIndex = 0;
    }
    ColumnToRenderIndexListGetter.prototype.update = function (spreadsheetState, spreadsheetSectionName) {
        if (spreadsheetSectionName === 'RowNumber' || spreadsheetSectionName === 'Scroll') {
            return this.getValidIndexList();
        }
        var spreadsheetSectionWidth = spreadsheetState.spreadsheetSectionPositionInformationMap
            && spreadsheetState.spreadsheetSectionPositionInformationMap[spreadsheetSectionName]
            && spreadsheetState.spreadsheetSectionPositionInformationMap[spreadsheetSectionName].width;
        if (!spreadsheetSectionWidth) {
            return [];
        }
        var spreadsheetSection = spreadsheetState.spreadsheetSectionList.find(function (ts) { return ts.name === spreadsheetSectionName; });
        if (!spreadsheetSection) {
            return this.getValidIndexList();
        }
        var spreadsheetColumnList = spreadsheetState.spreadsheetColumnList.filter(function (gc) { return gc.sectionName === spreadsheetSectionName; });
        if (spreadsheetColumnList.length === 0) {
            return this.getValidIndexList();
        }
        var firstSpreadsheetColumn = spreadsheetColumnList.reduce(function (pv, cv) { return pv.index < cv.index ? pv : cv; }, spreadsheetColumnList[0]);
        var lastSpreadsheetColumn = spreadsheetColumnList.reduce(function (pv, cv) { return pv.index > cv.index ? pv : cv; }, spreadsheetColumnList[0]);
        var firstVisibleCellIndex = firstSpreadsheetColumn.index;
        var totalLeft = 0;
        var scrollLeft = spreadsheetState.spreadsheetSectionScrollLeftMap && spreadsheetState.spreadsheetSectionScrollLeftMap[spreadsheetSectionName];
        spreadsheetColumnList.forEach(function (gc) {
            totalLeft += gc.width;
            if (totalLeft >= scrollLeft) {
                return;
            }
            firstVisibleCellIndex++;
        });
        var lastVisibleCellIndex = firstVisibleCellIndex;
        var totalWidth = 0;
        spreadsheetColumnList.filter(function (gc) { return gc.index > firstVisibleCellIndex; }).forEach(function (gc) {
            totalWidth += gc.width;
            if (totalWidth >= spreadsheetSectionWidth) {
                return;
            }
            lastVisibleCellIndex++;
        });
        firstVisibleCellIndex = Math.max(firstVisibleCellIndex - 1, firstSpreadsheetColumn.index);
        lastVisibleCellIndex = Math.min(lastVisibleCellIndex + 1, lastSpreadsheetColumn.index);
        if (this.firstVisibleCellIndex === firstVisibleCellIndex && this.lastVisibleCellIndex === lastVisibleCellIndex) {
            return this.getValidIndexList();
        }
        this.firstVisibleCellIndex = firstVisibleCellIndex;
        this.lastVisibleCellIndex = lastVisibleCellIndex;
        return this.getValidIndexList();
    };
    ColumnToRenderIndexListGetter.prototype.getValidIndexList = function () {
        var validIndexList = [];
        var validIndex = this.firstVisibleCellIndex;
        while (validIndex <= this.lastVisibleCellIndex) {
            validIndexList.push(validIndex);
            validIndex++;
        }
        return validIndexList;
    };
    return ColumnToRenderIndexListGetter;
}());
ColumnToRenderIndexListGetter = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ColumnToRenderIndexListGetter);
exports.ColumnToRenderIndexListGetter = ColumnToRenderIndexListGetter;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var spreadsheet_rowspan_setter_1 = __webpack_require__(12);
var model_1 = __webpack_require__(1);
var DataSpreadsheetRowListGetter = (function () {
    function DataSpreadsheetRowListGetter(spreadsheetRowRowspanSetter) {
        this.spreadsheetRowRowspanSetter = spreadsheetRowRowspanSetter;
    }
    DataSpreadsheetRowListGetter.prototype.get = function (spreadsheetState, titleRowListCount) {
        var result = new Array(spreadsheetState.dataRowList.length);
        var columnDefinitionMap = {};
        spreadsheetState.columnList.forEach(function (column) {
            var columnDefinition = spreadsheetState.columnDefinitionList.find(function (cd) { return cd.name === column.name; });
            columnDefinitionMap[column.name] = columnDefinition;
        });
        var counter = 0;
        var cellCounter = 0;
        spreadsheetState.dataRowList.forEach(function (rowData) {
            var rowDataSpreadsheetRowList = [];
            spreadsheetState.columnList.forEach(function (column) {
                var columnDefinition = columnDefinitionMap[column.name];
                var dataCellMatrix = columnDefinition.getDataCellMatrix(rowData, column, spreadsheetState.columnList, spreadsheetState.columnDefinitionList);
                for (var i = 0; i < dataCellMatrix.length; i++) {
                    var row = null;
                    if (rowDataSpreadsheetRowList.length >= i + 1) {
                        row = rowDataSpreadsheetRowList[i];
                    }
                    if (row == null) {
                        if (result[counter - 1]) {
                            result[counter - 1].cellList.length = cellCounter;
                        }
                        cellCounter = 0;
                        row = {
                            cellList: new Array(spreadsheetState.columnList.length),
                            height: spreadsheetState.dataRowHeight,
                            rowData: rowData,
                            rowIndex: 0,
                            rowStyle: '',
                            rowType: model_1.ContentTypeEnum.Data,
                            sectionRowIndex: 0,
                        };
                        rowDataSpreadsheetRowList.push(row);
                        result[counter] = row;
                        counter++;
                    }
                    var dataCellMatrixLength = dataCellMatrix[i].length;
                    var dataCellCounter = 0;
                    while (dataCellCounter < dataCellMatrixLength) {
                        var cell = dataCellMatrix[i][dataCellCounter];
                        if (cell != null) {
                            row.cellList[cellCounter] = dataCellMatrix[i][dataCellCounter];
                            cellCounter++;
                        }
                        dataCellCounter++;
                    }
                }
                if (result[counter - 1]) {
                    result[counter - 1].cellList.length = cellCounter;
                }
            });
        });
        var lastIndex = result.length;
        for (var i = 0; i < lastIndex; i++) {
            var row = result[i];
            row.rowIndex = i + titleRowListCount;
            row.sectionRowIndex = i;
            row.cellMap = {};
            if (spreadsheetState.getRowStyle) {
                row.rowStyle = spreadsheetState.getRowStyle(row.rowData, row.rowType, row.sectionRowIndex);
            }
        }
        this.spreadsheetRowRowspanSetter.set(result);
        return result;
    };
    DataSpreadsheetRowListGetter.prototype.getBySection = function (spreadsheetState, spreadsheetSection, completeRowList) {
        var sectionColumnIndexList = spreadsheetState.spreadsheetColumnList.filter(function (sc) { return sc.sectionName === spreadsheetSection.name; }).map(function (sc) { return sc.index; });
        var columnToRenderIndexList = spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap[spreadsheetSection.name];
        var result = new Array(completeRowList.length);
        var resultCount = result.length;
        var resultIndex = 0;
        while (resultIndex < resultCount) {
            var cs = completeRowList[resultIndex];
            var row = Object.assign({}, cs);
            row.cellList = new Array(sectionColumnIndexList.length);
            row.cellMap = {};
            var counter = 0;
            var cellListIndex = 0;
            var cellListLength = cs.cellList.length;
            while (cellListIndex < cellListLength) {
                var cell = cs.cellList[cellListIndex];
                cellListIndex++;
                if (sectionColumnIndexList.indexOf(cell.columnIndex) < 0) {
                    continue;
                }
                cell.rowIndex = row.rowIndex;
                cell.sectionRowIndex = row.sectionRowIndex;
                cell.cellType = row.rowType;
                var columnCellIndex = 0;
                while (columnCellIndex < cell.colspan) {
                    row.cellMap[cell.columnIndex + columnCellIndex] = cell;
                    columnCellIndex++;
                }
                row.cellList[counter] = cell;
                counter++;
            }
            row.cellList.length = counter;
            if (columnToRenderIndexList) {
                row.visibleCellList = new Array(columnToRenderIndexList.length);
                var visibleCellIndex = 0;
                var index = 0;
                while (index < columnToRenderIndexList.length) {
                    var columnToRenderIndex = columnToRenderIndexList[visibleCellIndex];
                    var visibleCell = row.cellMap[columnToRenderIndex];
                    if (row.visibleCellList.indexOf(visibleCell) < 0) {
                        row.visibleCellList[visibleCellIndex] = visibleCell;
                        visibleCellIndex++;
                    }
                    index++;
                }
                row.visibleCellList.length = visibleCellIndex;
            }
            else {
                row.visibleCellList = row.cellList.slice(0, 20);
            }
            result[resultIndex] = row;
            resultIndex++;
        }
        return result;
    };
    return DataSpreadsheetRowListGetter;
}());
DataSpreadsheetRowListGetter = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof spreadsheet_rowspan_setter_1.SpreadsheetRowspanSetter !== "undefined" && spreadsheet_rowspan_setter_1.SpreadsheetRowspanSetter) === "function" && _a || Object])
], DataSpreadsheetRowListGetter);
exports.DataSpreadsheetRowListGetter = DataSpreadsheetRowListGetter;
var _a;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var number_filter_1 = __webpack_require__(10);
var text_filter_1 = __webpack_require__(11);
var model_1 = __webpack_require__(1);
var spreadsheet_section_list_getter_1 = __webpack_require__(26);
var FilteredDataRowListGetter = (function () {
    function FilteredDataRowListGetter(spreadsheetSectionListGetter, numberFilter, textFilter) {
        this.spreadsheetSectionListGetter = spreadsheetSectionListGetter;
        this.numberFilter = numberFilter;
        this.textFilter = textFilter;
    }
    FilteredDataRowListGetter.prototype.getList = function (spreadsheetState) {
        var _this = this;
        var originalSpreadsheetSectionList = this.spreadsheetSectionListGetter.get(spreadsheetState);
        var rowDataToRemoveList = [];
        Object.keys(spreadsheetState.filterExpressionMap).forEach(function (spreadsheetColumnIndexStr) {
            var spreadsheetColumnIndex = parseInt(spreadsheetColumnIndexStr, 10);
            var expression = spreadsheetState.filterExpressionMap[spreadsheetColumnIndex];
            if (!expression || expression.trim() == '') {
                return;
            }
            var spreadsheetColumn = spreadsheetState.spreadsheetColumnList.find(function (gc) { return gc.index == spreadsheetColumnIndex; });
            var spreadsheetSection = originalSpreadsheetSectionList.find(function (gs) { return gs.name === spreadsheetColumn.sectionName; });
            var filterFn = function () { return true; };
            switch (spreadsheetColumn.dataType) {
                case model_1.ColumnDataTypeEnum.Number:
                    filterFn = _this.numberFilter.getIsMatchFn(expression);
                    break;
                case model_1.ColumnDataTypeEnum.Text:
                    filterFn = _this.textFilter.getIsMatchFn(expression);
                    break;
                case model_1.ColumnDataTypeEnum.Date:
                    filterFn = function () { return true; };
                    break;
            }
            spreadsheetSection.dataRowList
                .filter(function (dr) { return !filterFn(dr.cellMap[spreadsheetColumnIndex].data); })
                .forEach(function (dr) {
                if (rowDataToRemoveList.indexOf(dr.rowData) >= 0) {
                    return;
                }
                rowDataToRemoveList.push(dr.rowData);
            });
        });
        var result = new Array(spreadsheetState.dataRowList.length - rowDataToRemoveList.length);
        var index = 0;
        spreadsheetState.dataRowList.forEach(function (dr) {
            if (rowDataToRemoveList.indexOf(dr) < 0) {
                result[index] = dr;
                index++;
            }
        });
        return result;
    };
    return FilteredDataRowListGetter;
}());
FilteredDataRowListGetter = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof spreadsheet_section_list_getter_1.SpreadsheetSectionListGetter !== "undefined" && spreadsheet_section_list_getter_1.SpreadsheetSectionListGetter) === "function" && _a || Object, typeof (_b = typeof number_filter_1.NumberFilter !== "undefined" && number_filter_1.NumberFilter) === "function" && _b || Object, typeof (_c = typeof text_filter_1.TextFilter !== "undefined" && text_filter_1.TextFilter) === "function" && _c || Object])
], FilteredDataRowListGetter);
exports.FilteredDataRowListGetter = FilteredDataRowListGetter;
var _a, _b, _c;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(10));
__export(__webpack_require__(11));
__export(__webpack_require__(9));
__export(__webpack_require__(21));
var filtered_data_row_list_getter_1 = __webpack_require__(21);
var number_filter_1 = __webpack_require__(10);
var text_filter_1 = __webpack_require__(11);
exports.FILTERS_PROVIDERS = [
    number_filter_1.NumberFilter,
    filtered_data_row_list_getter_1.FilteredDataRowListGetter,
    text_filter_1.TextFilter,
];


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ComparissonTypeEnum;
(function (ComparissonTypeEnum) {
    ComparissonTypeEnum[ComparissonTypeEnum["Greater"] = 0] = "Greater";
    ComparissonTypeEnum[ComparissonTypeEnum["Equal"] = 1] = "Equal";
    ComparissonTypeEnum[ComparissonTypeEnum["Less"] = 2] = "Less";
    ComparissonTypeEnum[ComparissonTypeEnum["GreaterOrEqual"] = 3] = "GreaterOrEqual";
    ComparissonTypeEnum[ComparissonTypeEnum["LessOrEqual"] = 4] = "LessOrEqual";
})(ComparissonTypeEnum = exports.ComparissonTypeEnum || (exports.ComparissonTypeEnum = {}));


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var RowViewportVisibleRowCountGetter = (function () {
    function RowViewportVisibleRowCountGetter() {
    }
    RowViewportVisibleRowCountGetter.prototype.get = function (spreadsheetState) {
        var bodyHeight = spreadsheetState.bodyHeight;
        var rowHeight = spreadsheetState.dataRowHeight;
        if (rowHeight === undefined) {
            throw 'Row height is not defined';
        }
        if (rowHeight === 0) {
            return 0;
        }
        var visibleRowCount = Math.ceil(bodyHeight / rowHeight);
        return visibleRowCount;
    };
    return RowViewportVisibleRowCountGetter;
}());
RowViewportVisibleRowCountGetter = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], RowViewportVisibleRowCountGetter);
exports.RowViewportVisibleRowCountGetter = RowViewportVisibleRowCountGetter;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var SpreadsheetSectionDataRowMapGetter = (function () {
    function SpreadsheetSectionDataRowMapGetter() {
    }
    SpreadsheetSectionDataRowMapGetter.prototype.get = function (spreadsheetSection) {
        spreadsheetSection = Object.assign({}, spreadsheetSection);
        spreadsheetSection.dataRowMap = {};
        spreadsheetSection.dataRowList.forEach(function (spreadsheetRow) {
            spreadsheetSection.dataRowMap[spreadsheetRow.sectionRowIndex] = spreadsheetRow;
        });
        return spreadsheetSection;
    };
    return SpreadsheetSectionDataRowMapGetter;
}());
SpreadsheetSectionDataRowMapGetter = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], SpreadsheetSectionDataRowMapGetter);
exports.SpreadsheetSectionDataRowMapGetter = SpreadsheetSectionDataRowMapGetter;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var title_spreadsheet_row_list_getter_1 = __webpack_require__(27);
var data_spreadsheet_row_list_getter_1 = __webpack_require__(20);
var row_to_render_index_list_getter_1 = __webpack_require__(5);
var SpreadsheetSectionListGetter = (function () {
    function SpreadsheetSectionListGetter(titleSpreadsheetRowListGetter, dataSpreadsheetRowListGetter, rowToRenderIndexListGetter) {
        this.titleSpreadsheetRowListGetter = titleSpreadsheetRowListGetter;
        this.dataSpreadsheetRowListGetter = dataSpreadsheetRowListGetter;
        this.rowToRenderIndexListGetter = rowToRenderIndexListGetter;
    }
    SpreadsheetSectionListGetter.prototype.get = function (spreadsheetState) {
        var _this = this;
        var spreadsheetColumnListMap = {};
        spreadsheetState.columnList.forEach(function (column) {
            if (!spreadsheetColumnListMap[column.sectionName]) {
                spreadsheetColumnListMap[column.sectionName] = [];
            }
            spreadsheetColumnListMap[column.sectionName].push(column);
        });
        var spreadsheetSectionList = [];
        Object.keys(spreadsheetColumnListMap).forEach(function (tableSectionName) {
            var spreadsheetSectionColumnList = spreadsheetColumnListMap[tableSectionName];
            spreadsheetSectionList.push({
                columnList: spreadsheetSectionColumnList,
                dataRowList: [],
                dataRowMap: {},
                name: tableSectionName,
                titleRowList: [],
                dataRowListLength: 0,
            });
        });
        spreadsheetSectionList.forEach(function (spreadsheetSection) {
            spreadsheetSection.columnList = spreadsheetSection.columnList.filter(function (gc) { return gc.sectionName === spreadsheetSection.name; });
            var spreadsheetSectionColumnIdList = [];
            spreadsheetSection.columnList.forEach(function (column) {
                var columnIndex = column.startIndex;
                while (columnIndex <= column.endIndex) {
                    spreadsheetSectionColumnIdList.push(columnIndex);
                    columnIndex++;
                }
            });
            var titleRowList = _this.titleSpreadsheetRowListGetter.getBySection(spreadsheetState, spreadsheetSection, spreadsheetState.titleSpreadsheetRowList);
            var dataRowList = _this.dataSpreadsheetRowListGetter.getBySection(spreadsheetState, spreadsheetSection, spreadsheetState.dataSpreadsheetRowList);
            spreadsheetSection.titleRowList = titleRowList.map(function (row) {
                return {
                    cellList: row.cellList.filter(function (c) { return spreadsheetSectionColumnIdList.indexOf(c.columnIndex) >= 0; }),
                    cellMap: row.cellMap,
                    height: spreadsheetState.titleRowHeight,
                    rowData: row.rowData,
                    rowIndex: row.rowIndex,
                    rowStyle: row.rowStyle,
                    rowType: row.rowType,
                    sectionRowIndex: row.sectionRowIndex,
                    top: top,
                    visibleCellList: row.visibleCellList,
                };
            });
            spreadsheetSection.dataRowList = new Array(dataRowList.length);
            spreadsheetSection.dataRowMap = {};
            var counter = 0;
            dataRowList.forEach(function (row) {
                var cellList = new Array(row.cellList.length);
                var index = 0;
                row.cellList.forEach(function (c) {
                    if (spreadsheetSectionColumnIdList.indexOf(c.columnIndex) < 0) {
                        return;
                    }
                    cellList[index] = c;
                    index++;
                });
                cellList.length = index;
                var spreadsheetRow = {
                    cellList: cellList,
                    cellMap: row.cellMap,
                    height: spreadsheetState.dataRowHeight,
                    rowData: row.rowData,
                    rowIndex: row.rowIndex,
                    rowStyle: row.rowStyle,
                    rowType: row.rowType,
                    sectionRowIndex: row.sectionRowIndex,
                    visibleCellList: row.visibleCellList,
                };
                spreadsheetSection.dataRowList[counter] = spreadsheetRow;
                spreadsheetSection.dataRowMap[spreadsheetRow.sectionRowIndex] = spreadsheetRow;
                counter++;
            });
            var rowToRenderIndexList = _this.rowToRenderIndexListGetter.getListForSpreadsheetSection(spreadsheetState, spreadsheetSection);
            spreadsheetSection.visibleDataRowList =
                rowToRenderIndexList.map(function (index) { return spreadsheetSection.dataRowList[index]; }).filter(function (row) { return row != null; });
            spreadsheetSection.dataRowListLength = spreadsheetSection.dataRowList.length;
        });
        return spreadsheetSectionList;
    };
    return SpreadsheetSectionListGetter;
}());
SpreadsheetSectionListGetter = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof title_spreadsheet_row_list_getter_1.TitleSpreadsheetRowListGetter !== "undefined" && title_spreadsheet_row_list_getter_1.TitleSpreadsheetRowListGetter) === "function" && _a || Object, typeof (_b = typeof data_spreadsheet_row_list_getter_1.DataSpreadsheetRowListGetter !== "undefined" && data_spreadsheet_row_list_getter_1.DataSpreadsheetRowListGetter) === "function" && _b || Object, typeof (_c = typeof row_to_render_index_list_getter_1.RowToRenderIndexListGetter !== "undefined" && row_to_render_index_list_getter_1.RowToRenderIndexListGetter) === "function" && _c || Object])
], SpreadsheetSectionListGetter);
exports.SpreadsheetSectionListGetter = SpreadsheetSectionListGetter;
var _a, _b, _c;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var spreadsheet_rowspan_setter_1 = __webpack_require__(12);
var model_1 = __webpack_require__(1);
var TitleSpreadsheetRowListGetter = (function () {
    function TitleSpreadsheetRowListGetter(spreadsheetRowRowspanSetter) {
        this.spreadsheetRowRowspanSetter = spreadsheetRowRowspanSetter;
    }
    TitleSpreadsheetRowListGetter.prototype.get = function (spreadsheetState) {
        var columnDefinitionMap = {};
        spreadsheetState.columnList.forEach(function (column) {
            var columnDefinition = spreadsheetState.columnDefinitionList.find(function (cd) { return cd.name === column.name; });
            columnDefinitionMap[column.name] = columnDefinition;
        });
        var result = [];
        var counter = 0;
        var cellCounterByRow = {};
        spreadsheetState.columnList.forEach(function (column) {
            var columnDefinition = columnDefinitionMap[column.name];
            var titleCellMatrix = columnDefinition.getTitleCellMatrix(column, spreadsheetState.columnList, spreadsheetState.columnDefinitionList);
            for (var i = 0; i < titleCellMatrix.length; i++) {
                var row = null;
                if (result.length >= i + 1) {
                    row = result[i];
                }
                if (row == null) {
                    var previousRow = result[counter - 1];
                    if (previousRow) {
                        previousRow.cellList.length = cellCounterByRow[previousRow.rowIndex];
                    }
                    row = {
                        cellList: [],
                        height: spreadsheetState.titleRowHeight,
                        rowData: null,
                        rowIndex: i,
                        rowStyle: '',
                        rowType: model_1.ContentTypeEnum.Title,
                        sectionRowIndex: i,
                    };
                    result.push(row);
                    cellCounterByRow[row.rowIndex] = 0;
                    counter++;
                }
                var titleCellMatrixLength = titleCellMatrix[i].length;
                var titleCellCounter = 0;
                while (titleCellCounter < titleCellMatrixLength) {
                    var cell = titleCellMatrix[i][titleCellCounter];
                    if (cell != null) {
                        row.cellList[cellCounterByRow[row.rowIndex]] = titleCellMatrix[i][titleCellCounter];
                        cellCounterByRow[row.rowIndex]++;
                    }
                    titleCellCounter++;
                }
            }
        });
        if (result[counter - 1]) {
            result[counter - 1].cellList.length = cellCounterByRow[result[counter - 1].rowIndex];
        }
        for (var i = 0; i < result.length; i++) {
            var row = result[i];
            row.rowIndex = i;
            row.sectionRowIndex = i;
            row.cellMap = {};
            row.cellList.forEach(function (cell) {
                cell.rowIndex = row.rowIndex;
                cell.sectionRowIndex = row.sectionRowIndex;
                cell.cellType = row.rowType;
                row.cellMap[cell.columnIndex] = cell;
            });
            if (spreadsheetState.getRowStyle) {
                row.rowStyle = spreadsheetState.getRowStyle(row.rowData, row.rowType, row.sectionRowIndex);
            }
        }
        this.spreadsheetRowRowspanSetter.set(result);
        return result;
    };
    TitleSpreadsheetRowListGetter.prototype.getBySection = function (spreadsheetState, spreadsheetSection, completeRowList) {
        var sectionColumnIndexList = spreadsheetState.spreadsheetColumnList.filter(function (sc) { return sc.sectionName === spreadsheetSection.name; }).map(function (sc) { return sc.index; });
        var columnToRenderIndexList = spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap[spreadsheetSection.name];
        var result = completeRowList.map(function (cs) {
            var row = Object.assign({}, cs);
            row.cellList = cs.cellList.filter(function (cell) { return sectionColumnIndexList.indexOf(cell.columnIndex) >= 0; });
            row.cellMap = {};
            var counter = 0;
            var cellListIndex = 0;
            var cellListLength = cs.cellList.length;
            while (cellListIndex < cellListLength) {
                var cell = cs.cellList[cellListIndex];
                cellListIndex++;
                if (sectionColumnIndexList.indexOf(cell.columnIndex) < 0) {
                    continue;
                }
                cell.rowIndex = row.rowIndex;
                cell.sectionRowIndex = row.sectionRowIndex;
                cell.cellType = row.rowType;
                var columnCellIndex = 0;
                while (columnCellIndex < cell.colspan) {
                    row.cellMap[cell.columnIndex + columnCellIndex] = cell;
                    columnCellIndex++;
                }
                row.cellList[counter] = cell;
                counter++;
            }
            row.cellList.length = counter;
            if (columnToRenderIndexList) {
                row.visibleCellList = new Array(columnToRenderIndexList.length);
                var visibleCellIndex = 0;
                var index = 0;
                while (index < columnToRenderIndexList.length) {
                    var columnToRenderIndex = columnToRenderIndexList[visibleCellIndex];
                    var visibleCell = row.cellMap[columnToRenderIndex];
                    if (row.visibleCellList.indexOf(visibleCell) < 0) {
                        row.visibleCellList[visibleCellIndex] = visibleCell;
                        visibleCellIndex++;
                    }
                    index++;
                }
                row.visibleCellList.length = visibleCellIndex;
            }
            else {
                row.visibleCellList = row.cellList.slice(0, 20);
            }
            return row;
        });
        return result;
    };
    return TitleSpreadsheetRowListGetter;
}());
TitleSpreadsheetRowListGetter = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof spreadsheet_rowspan_setter_1.SpreadsheetRowspanSetter !== "undefined" && spreadsheet_rowspan_setter_1.SpreadsheetRowspanSetter) === "function" && _a || Object])
], TitleSpreadsheetRowListGetter);
exports.TitleSpreadsheetRowListGetter = TitleSpreadsheetRowListGetter;
var _a;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(113));


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(114));


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var is_cell_active_checker_1 = __webpack_require__(13);
__export(__webpack_require__(13));
__export(__webpack_require__(115));
exports.CELL_PROVIDERS = [is_cell_active_checker_1.IsCellActiveChecker];


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var column_mover_1 = __webpack_require__(7);
var column_getter_1 = __webpack_require__(6);
__export(__webpack_require__(7));
__export(__webpack_require__(6));
__export(__webpack_require__(116));
exports.COLUMN_CELL_PROVIDERS = [column_getter_1.ColumnGetter, column_mover_1.ColumnMover];


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(14));
__export(__webpack_require__(8));
__export(__webpack_require__(15));
__export(__webpack_require__(119));
__export(__webpack_require__(120));
var column_target_width_getter_1 = __webpack_require__(14);
var column_size_updater_1 = __webpack_require__(8);
var mouse_position_getter_1 = __webpack_require__(15);
exports.COLUMN_RESIZE_PROVIDERS = [column_target_width_getter_1.ColumnTargetWidthGetter, column_size_updater_1.ColumnSizeUpdater, mouse_position_getter_1.MousePositionGetter];


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(142);
var spreadsheet_1 = __webpack_require__(17);
var declarations = [
    spreadsheet_1.BodyComponent,
    spreadsheet_1.BodySectionComponent,
    spreadsheet_1.CellComponent,
    spreadsheet_1.ColumnCellComponent,
    spreadsheet_1.ColumnCornerCellComponent,
    spreadsheet_1.ColumnResizeComponent,
    spreadsheet_1.ColumnRowComponent,
    spreadsheet_1.DetailsBarComponent,
    spreadsheet_1.HeaderComponent,
    spreadsheet_1.HeaderSectionComponent,
    spreadsheet_1.NumberRowListComponent,
    spreadsheet_1.RowComponent,
    spreadsheet_1.RowListComponent,
    spreadsheet_1.SpreadsheetComponent,
    spreadsheet_1.StatusBarComponent,
];
var SpreadsheetModule = (function () {
    function SpreadsheetModule() {
    }
    return SpreadsheetModule;
}());
SpreadsheetModule = __decorate([
    core_1.NgModule({
        declarations: declarations,
        providers: [],
        imports: [common_1.CommonModule],
        exports: [spreadsheet_1.SpreadsheetComponent],
    })
], SpreadsheetModule);
exports.SpreadsheetModule = SpreadsheetModule;
exports.default = SpreadsheetModule;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var spreadsheet_event_1 = __webpack_require__(130);
exports.SpreadsheetEvent = spreadsheet_event_1.SpreadsheetEvent;
var editable_component_1 = __webpack_require__(129);
exports.EditableComponent = editable_component_1.EditableComponent;
var viewable_component_1 = __webpack_require__(131);
exports.ViewableComponent = viewable_component_1.ViewableComponent;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = ":host {\r\n  display: block;\r\n  position: absolute;\r\n  height: 100%;\r\n  outline: none;\r\n  z-index: 0;\r\n}\r\n\r\n:host[spreadsheetSectionName=\"Scroll\"] {\r\n  width: 20px;\r\n  right: 0;\r\n  overflow-y: scroll;\r\n}\r\n\r\n:host[spreadsheetSectionName=\"Scroll\"] Row {\r\n  visibility: hidden;\r\n}\r\n\r\n:host {\r\n  overflow-x: scroll;\r\n  overflow-y: hidden;\r\n}"

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = "<ng-content></ng-content>"

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = ":host {\r\n  position: relative;\r\n  overflow-y: hidden;\r\n  display: block;\r\n  height: 400px;\r\n}"

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = "<BodySection spreadsheetSectionName=\"RowNumber\" [scrollTop]=\"scrollTop\">\n  <NumberRowList [numberRowList]=\"numberDataRowList\" [rowHeight]=\"rowHeight\"></NumberRowList>\n  <div [style.height.px]=\"spreadsheetSectionList[0]?.dataRowListLength * rowHeight + 8.5\" style=\"position: absolute; width:2px; top:0;\"></div>\n</BodySection>\n<BodySection *ngFor=\"let spreadsheetSection of spreadsheetSectionList; trackBy:spreadsheetSectionIdentity\"\n  [spreadsheetSectionName]=\"spreadsheetSection.name\"\n  [spreadsheetSectionPositionInformationMap]=\"spreadsheetSectionPositionInformationMap\"\n  [spreadsheetSectionScrollLeftMap]=\"spreadsheetSectionScrollLeftMap\"\n  [scrollTop]=\"scrollTop\"\n  [activeCellLocation]=\"activeCellLocation\"\n  [class.is-separating-section]=\"spreadsheetSection !== spreadsheetSectionList[spreadsheetSectionList.length - 1]\"\n  tabindex=\"0\">\n  <RowList [rowList]=\"spreadsheetSection.visibleDataRowList\"\n    [spreadsheetSectionName]=\"spreadsheetSection.name\"\n    [columnPositionInformationMap]=\"columnPositionInformationMap\"\n    [spreadsheetSectionScrollWidthMap]=\"spreadsheetSectionScrollWidthMap\"\n    [spreadsheetSectionScrollLeftMap]=\"spreadsheetSectionScrollLeftMap\"\n    [activeCellLocation]=\"activeCellLocation\"\n    [rowHeight]=\"rowHeight\"\n    [activeRowIndexList]=\"activeRowIndexList\"></RowList>\n  <div [style.height.px]=\"spreadsheetSection?.dataRowListLength * rowHeight\" style=\"position: absolute; width:2px; top:0;\"></div>\n</BodySection>\n<BodySection spreadsheetSectionName=\"Scroll\" [scrollTop]=\"scrollTop\">\n  <div [style.height.px]=\"spreadsheetSectionList[0]?.dataRowListLength * rowHeight\"></div>\n</BodySection>"

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = ":host {\r\n  display: block;\r\n  overflow: hidden;\r\n  white-space: nowrap;\r\n  -moz-text-overflow: ellipsis;\r\n  text-overflow: ellipsis;\r\n  height: 100%;\r\n  position: absolute;\r\n  /*display: flex;\r\n  align-items: center;\r\n  justify-content: center;*/\r\n  display: flex;\r\n  justify-content: center;\r\n  flex-direction: column;\r\n\r\n}\r\n\r\ndiv {\r\n  padding: 2px;\r\n}\r\n\r\n:host.is-custom div {\r\n  padding: 0px;\r\n}"

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = "<div ref-cellComponent [innerHTML]=\"data\"></div>"

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = ":host {\r\n  background-color: #E6E6E6;\r\n  border-right: 1px inset #A3A3A3;\r\n  text-align: center;\r\n  display: inline-block;\r\n  height: 20px;\r\n  line-height: 20px;\r\n  vertical-align: middle;\r\n  position: relative;\r\n  z-index: 5;\r\n}\r\n\r\n.filter-opener {\r\n  display: block;\r\n  position: absolute;\r\n  right: 4px;\r\n  top: 2px;\r\n  width: 10px;\r\n  height: 10px;\r\n  font-size: 12px;\r\n  cursor: pointer;\r\n}\r\n\r\n.filter {\r\n  position: absolute;\r\n  left: -1px;\r\n  top: 20px;\r\n  right: -1px;\r\n  height: 20px;\r\n  background-color: white;\r\n  border: 1px solid #A3A3A3;\r\n  display: none;\r\n  border-top: none;\r\n  z-index: 1;\r\n}\r\n\r\n.filter.is-visible {\r\n  display: block;\r\n}\r\n\r\n.filter span {\r\n  border: none;\r\n  position: absolute;\r\n  top: 2px;\r\n  right: 4px;\r\n  bottom: 2px;\r\n  cursor: pointer;\r\n}\r\n\r\n.filter span:hover {\r\n  color: black;\r\n}\r\n\r\n.filter-input-container {\r\n  position: absolute;\r\n  top: 0px;\r\n  left: 0px;\r\n  right: 24px;\r\n  bottom: 0px;\r\n}\r\n\r\n.filter-input-container input {\r\n  border: none;\r\n  background-color: white;\r\n  width: 100%;\r\n  height: 100%;\r\n}"

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = "<span>{{columnIdentifier}}</span>\r\n<span [class.is-filtered]=\"isFiltered\" class=\"filter-opener\" (click)=\"toggleFilter()\">\r\n    <i class=\"filter-opener-icon\"></i>\r\n  </span>\r\n<div *ngIf=\"isFilterOpen\" class=\"filter\" [class.is-visible]=\"isFilterOpen\">\r\n  <div class=\"filter-input-container\">\r\n    <input ref-filterExpression type=\"text\" [value]=\"spreadsheetColumn.filterExpression\" (keypress)=\"$event.keyCode === 13 ? filter(filterExpression.value) : true\"\r\n    />\r\n  </div>\r\n  <span (click)=\"filter(filterExpression.value)\">\r\n      <i class=\"filter-check-icon\"></i>\r\n    </span>\r\n</div>"

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = ":host() {\r\n  width: 100%;\r\n  position: absolute;\r\n  background-color: #E6E6E6;\r\n  height: 20px;\r\n  border-bottom: 1px inset #A3A3A3;\r\n  border-right: 1px inset #A3A3A3;\r\n  z-index: 1;\r\n}"

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = "<span class=\"clear-filter-icon\"></span>"

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = ":host {\r\n  display: block;\r\n  position: absolute;\r\n  width: 4px;\r\n  cursor: col-resize;\r\n  top: 0;\r\n  opacity: 0;\r\n  background-color: black;\r\n  transition: opacity 0.4s ease-out;\r\n  height: 20px;\r\n  z-index: 6;\r\n}\r\n\r\n:host:hover,\r\n:host.is-active {\r\n  opacity: 1;\r\n  transition: opacity 0.4s ease-out;\r\n}"

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = "<div></div>"

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = ":host {\r\n  display: block;\r\n  position: relative;\r\n  height: 20px;\r\n}"

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = "<ColumnCell *ngFor=\"let spreadsheetColumn of visibleSpreadsheetColumnList; let columnIndex = index; trackBy:cellIndentity;\"\n  [spreadsheetColumn]=\"spreadsheetColumn\" [columnList]=\"columnList\" [index]=\"columnIndex\" [isFilterOpen]=\"!!isFilterOpenMap[spreadsheetColumn?.index]\"\n  [columnIdentifier]=\"spreadsheetColumnIdentifierMap[spreadsheetColumn.index]\" [columnPositionInformationMap]=\"columnPositionInformationMap\">\n</ColumnCell>"

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = ":host {\r\n  display: block;\r\n  height: 36px;\r\n  position: relative;\r\n  background-color: #E6E6E6;\r\n}\r\n\r\ni {\r\n  display: block;\r\n  position: absolute;\r\n  font-size: 14px;\r\n  top: 10px;\r\n  left: 5px;\r\n}\r\n\r\n.cell-location {\r\n  display: inline-block;\r\n  position: absolute;\r\n  left: 25px;\r\n  top: 6px;\r\n  bottom: 6px;\r\n  width: 55px;\r\n  font-size: 12px;\r\n  background-color: #FAFAFA;\r\n  border: 1px solid #C6C6C6;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  padding-left: 5px;\r\n  line-height: 22px;\r\n  vertical-align: middle;\r\n}\r\n\r\n.cell-content {\r\n  display: inline-block;\r\n  left: 85px;\r\n  top: 6px;\r\n  right: 5px;\r\n  bottom: 6px;\r\n  position: absolute;\r\n  padding-left: 5px;\r\n  font-size: 12px;\r\n  background-color: #FAFAFA;\r\n  border: 1px solid #C6C6C6;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  line-height: 22px;\r\n}\r\n\r\n.download-button {\r\n  display: block;\r\n  top: 11px;\r\n  right: 20px;\r\n  position: absolute;\r\n}\r\n\r\n.toggle-full-button {\r\n  display: block;\r\n  top: 11px;\r\n  right: 9px;\r\n  position: absolute;\r\n}"

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = "<i class=\"icon-logo\"></i>\n<span class=\"cell-location\">{{cellLocation}}</span>\n<span class=\"cell-content\">{{activeCellData}}</span>\n<span class=\"download-button\" (click)=\"onDownload.next()\"></span>\n<span class=\"toggle-full-button\" [class.is-full]=\"isFull\" (click)=\"toggleFullScreen()\"></span>"

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = ":host {\r\n  display: block;\r\n  position: absolute;\r\n  height: 100%;\r\n  outline: none;\r\n  overflow-x: hidden;\r\n}"

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = "<ColumnCornerCell *ngIf=\"spreadsheetSectionName === 'RowNumber'\" [isFiltered]=\"isFiltered\">\n</ColumnCornerCell>\n<ColumnRow [spreadsheetSectionName]=\"spreadsheetSectionName\" [scrollWidth]=\"scrollWidth\" [visibleSpreadsheetColumnList]=\"visibleSpreadsheetColumnList\"\n  [columnList]=\"columnList\" [spreadsheetColumnList]=\"spreadsheetColumnList\" [columnPositionInformationMap]=\"columnPositionInformationMap\"\n  [isFilterOpenMap]=\"isFilterOpenMap\"></ColumnRow>\n<ColumnResize *ngFor=\"let spreadsheetColumn of visibleSpreadsheetColumnList\" [spreadsheetColumn]=\"spreadsheetColumn\" [columnPositionInformationMap]=\"columnPositionInformationMap\"></ColumnResize>\n<ng-content></ng-content>"

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = ":host {\r\n  display: block;\r\n  position: relative;\r\n  overflow-y: scroll;\r\n  overflow-x: hidden;\r\n}"

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = "<HeaderSection spreadsheetSectionName=\"RowNumber\" [columnList]=\"columnList\" [spreadsheetColumnList]=\"spreadsheetColumnList\">\n  <NumberRowList [numberRowList]=\"numberTitleRowList\" [rowHeight]=\"rowHeight\"></NumberRowList>\n</HeaderSection>\n<HeaderSection *ngFor=\"let spreadsheetSection of spreadsheetSectionList; trackBy:spreadsheetSectionIdentity\" [spreadsheetSectionScrollWidthMap]=\"spreadsheetSectionScrollWidthMap\"\n  [spreadsheetSectionName]=\"spreadsheetSection.name\" [spreadsheetSectionPositionInformationMap]=\"spreadsheetSectionPositionInformationMap\"\n  [columnList]=\"columnList\" [spreadsheetColumnList]=\"spreadsheetColumnList\" [spreadsheetSectionScrollLeftMap]=\"spreadsheetSectionScrollLeftMap\"\n  [spreadsheetSectionColumnToRendexIndexListMap]=\"spreadsheetSectionColumnToRendexIndexListMap\" [columnPositionInformationMap]=\"columnPositionInformationMap\"\n  [isFilterOpenMap]=\"isFilterOpenMap\" [class.is-separating-section]=\"spreadsheetSection !== spreadsheetSectionList[spreadsheetSectionList.length - 1]\">\n  <RowList [rowList]=\"spreadsheetSection.titleRowList\" [spreadsheetSectionName]=\"spreadsheetSection.name\" [columnPositionInformationMap]=\"columnPositionInformationMap\"\n    [spreadsheetSectionScrollWidthMap]=\"spreadsheetSectionScrollWidthMap\" [spreadsheetSectionScrollLeftMap]=\"spreadsheetSectionScrollLeftMap\"\n    [rowHeight]=\"rowHeight\"></RowList>\n</HeaderSection>\n<HeaderSection spreadsheetSectionName=\"Scroll\" [columnList]=\"columnList\">\n</HeaderSection>"

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = "div.handler {\r\n  width: 100%;\r\n  background-color: #E6E6E6;\r\n  border-bottom: 1px inset #A3A3A3;\r\n  font-size: 10px;\r\n  text-align: center;\r\n  font-weight: bold;\r\n  height: 100%;\r\n  display: flex;\r\n  justify-content: center;\r\n  flex-direction: column;\r\n}"

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = "<Row *ngFor=\"let numberRow of numberRowList; trackBy:rowIndentity; let i = index\" [row]=\"numberRow\" spreadsheetSectionName=\"RowNumber\"\n  [index]=\"i\">\n  <div class=\"handler\">{{numberRow.rowNumber}}</div>\n</Row>"

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = ":host() {\r\n  display:block;\r\n  min-height: 20px;\r\n}"

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = "<Row *ngFor=\"let row of rowList; trackBy:rowIndentity; let rowIndex = index\"\n  [row]=\"row\" [spreadsheetSectionName]=\"spreadsheetSectionName\" [index]=\"rowIndex\"\n  [scrollWidth]=\"spreadsheetSectionScrollWidth\"\n  [activeCellLocation]=\"activeCellLocation\"\n  [activeRowIndexList]=\"activeRowIndexList\">\n  <Cell *ngFor=\"let cell of row?.visibleCellList; let cellIndex = index; trackBy:cellIdentity\"\n    [cell]=\"cell\"\n    [index]=\"cellIndex\"\n    [rowData]=\"row?.rowData\"\n    [columnPositionInformationMap]=\"columnPositionInformationMap\"\n    [spreadsheetSectionScrollLeft]=\"spreadsheetSectionScrollLeft\"\n    [activeCellLocation]=\"activeCellLocation\"\n    [rowHeight]=\"rowHeight\"\n    >\n  </Cell>\n</Row>"

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = ":host {\r\n  display: block;\r\n  position: relative;\r\n  height: 20px;\r\n}"

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = "<ng-content></ng-content>"

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = ":host() {\r\n  display: block;\r\n}"

/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = "<DetailsBar [activeCellLocation]=\"spreadsheetState?.activeCellLocation\" [spreadsheetColumnList]=\"spreadsheetState?.spreadsheetColumnList\"\r\n  (download)=\"onDownload.next(exportData())\" (toggleFullScreen)=\"onToggleFullScreen.next($event)\" [defaultMessage]=\"defaultDetailsBarMessage\"></DetailsBar>\r\n<Header [rowHeight]=\"spreadsheetState?.titleRowHeight\" [numberTitleRowList]=\"spreadsheetState?.numberTitleRowList\" [spreadsheetSectionList]=\"spreadsheetState?.spreadsheetSectionList\"\r\n  [columnList]=\"spreadsheetState?.columnList\" [spreadsheetColumnList]=\"spreadsheetState?.spreadsheetColumnList\" [columnPositionInformationMap]=\"spreadsheetState?.columnPositionInformationMap\"\r\n  [spreadsheetSectionScrollWidthMap]=\"spreadsheetState?.spreadsheetSectionScrollWidthMap\" [spreadsheetSectionScrollLeftMap]=\"spreadsheetState?.spreadsheetSectionScrollLeftMap\"\r\n  [spreadsheetSectionPositionInformationMap]=\"spreadsheetState?.spreadsheetSectionPositionInformationMap\" [isFilterOpenMap]=\"spreadsheetState?.isFilterOpenMap\"\r\n  [spreadsheetSectionColumnToRendexIndexListMap]=\"spreadsheetState?.spreadsheetSectionColumnToRendexIndexListMap\"></Header>\r\n\r\n<Body [height]=\"spreadsheetState?.bodyHeight\" [rowHeight]=\"spreadsheetState?.dataRowHeight\" [numberDataRowList]=\"spreadsheetState?.numberDataRowList\"\r\n  [spreadsheetSectionList]=\"spreadsheetState?.spreadsheetSectionList\" [scrollTop]=\"spreadsheetState?.scrollTop\" [columnPositionInformationMap]=\"spreadsheetState?.columnPositionInformationMap\"\r\n  [spreadsheetSectionScrollWidthMap]=\"spreadsheetState?.spreadsheetSectionScrollWidthMap\" [spreadsheetSectionScrollLeftMap]=\"spreadsheetState?.spreadsheetSectionScrollLeftMap\"\r\n  [spreadsheetSectionPositionInformationMap]=\"spreadsheetState?.spreadsheetSectionPositionInformationMap\" [activeCellLocation]=\"spreadsheetState?.activeCellLocation\"\r\n  [activeRowIndexList]=\"spreadsheetState?.activeRowIndexList\"></Body>\r\n<StatusBar [message]=\"statusMessage\" [timeout]=\"statusMessageTimeout\" [count]=\"statusMessageCount\"></StatusBar>"

/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = ":host {\r\n  display: block;\r\n  position: relative;\r\n}\r\n\r\ndiv {\r\n  height: 20px;\r\n  background-color: #E6E6E6;\r\n  position: relative;\r\n  border: 1px solid #C6C6C6;\r\n  transition: all 0.4s ease-out;\r\n  transform: translate(0, -100%);\r\n  display: none;\r\n  opacity: 0;\r\n}\r\n\r\ndiv.is-visible {\r\n  display: block;\r\n  transition: all 0.4s ease-out;\r\n  opacity: 1;\r\n  transform: translate(0, 0);\r\n}"

/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = "<div [class.is-visible]=\"isVisible\">\n  <span>{{message}}</span>\n</div>"

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ClearFilterAction = (function () {
    function ClearFilterAction() {
        this.type = ClearFilterAction.type;
    }
    return ClearFilterAction;
}());
ClearFilterAction.type = 'ClearFilter';
exports.ClearFilterAction = ClearFilterAction;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FilterColumnAction = (function () {
    function FilterColumnAction(spreadsheetColumnIndex, expression) {
        this.type = FilterColumnAction.type;
        this.payload = {
            spreadsheetColumnIndex: spreadsheetColumnIndex,
            expression: expression,
        };
    }
    return FilterColumnAction;
}());
FilterColumnAction.type = 'FilterColumn';
exports.FilterColumnAction = FilterColumnAction;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GoToCellLocationAction = (function () {
    function GoToCellLocationAction(rowIndex, spreadsheetColumnIndex, isToUseMinimunScroll, isNavigation) {
        if (isNavigation === void 0) { isNavigation = true; }
        this.type = GoToCellLocationAction.type;
        this.payload = {
            rowIndex: rowIndex,
            spreadsheetColumnIndex: spreadsheetColumnIndex,
            isToUseMinimunScroll: isToUseMinimunScroll,
            isNavigation: isNavigation,
        };
    }
    return GoToCellLocationAction;
}());
GoToCellLocationAction.type = 'GoToCellLocation';
exports.GoToCellLocationAction = GoToCellLocationAction;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(65));
__export(__webpack_require__(71));
__export(__webpack_require__(76));
__export(__webpack_require__(73));
__export(__webpack_require__(72));
__export(__webpack_require__(67));
__export(__webpack_require__(75));
__export(__webpack_require__(77));
__export(__webpack_require__(70));
__export(__webpack_require__(80));
__export(__webpack_require__(78));
__export(__webpack_require__(79));
__export(__webpack_require__(68));
__export(__webpack_require__(66));
__export(__webpack_require__(74));


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InitializeSpreadsheetSizeAction = (function () {
    function InitializeSpreadsheetSizeAction(height, width) {
        this.type = InitializeSpreadsheetSizeAction.type;
        this.payload = {
            height: height,
            width: width,
        };
    }
    return InitializeSpreadsheetSizeAction;
}());
InitializeSpreadsheetSizeAction.type = 'InitializeSpreadsheetSize';
exports.InitializeSpreadsheetSizeAction = InitializeSpreadsheetSizeAction;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MoveColumnTypeEnum;
(function (MoveColumnTypeEnum) {
    MoveColumnTypeEnum[MoveColumnTypeEnum["BeforeReferenceColumn"] = 0] = "BeforeReferenceColumn";
    MoveColumnTypeEnum[MoveColumnTypeEnum["AfterReferenceColumn"] = 1] = "AfterReferenceColumn";
})(MoveColumnTypeEnum = exports.MoveColumnTypeEnum || (exports.MoveColumnTypeEnum = {}));
var MoveColumnAction = (function () {
    function MoveColumnAction(newColumnIndex, oldColumnIndex, columnToMoveName, columnToTargeName, moveType) {
        if (moveType === void 0) { moveType = MoveColumnTypeEnum.AfterReferenceColumn; }
        this.type = MoveColumnAction.type;
        this.payload = {
            newColumnIndex: newColumnIndex,
            oldColumnIndex: oldColumnIndex,
            columnToMoveName: columnToMoveName,
            columnToTargeName: columnToTargeName,
            moveType: moveType,
        };
    }
    return MoveColumnAction;
}());
MoveColumnAction.type = 'ColumnMoved';
exports.MoveColumnAction = MoveColumnAction;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ScrollSpreadsheetAction = (function () {
    function ScrollSpreadsheetAction(scrollTop) {
        this.type = ScrollSpreadsheetAction.type;
        this.payload = scrollTop;
    }
    return ScrollSpreadsheetAction;
}());
ScrollSpreadsheetAction.type = 'SpreadsheetVerticallyScrolled';
exports.ScrollSpreadsheetAction = ScrollSpreadsheetAction;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ScrollSpreadsheetSectionAction = (function () {
    function ScrollSpreadsheetSectionAction(sectionName, scrollLeft) {
        this.type = ScrollSpreadsheetSectionAction.type;
        this.payload = {
            sectionName: sectionName,
            scrollLeft: scrollLeft,
        };
    }
    return ScrollSpreadsheetSectionAction;
}());
ScrollSpreadsheetSectionAction.type = 'SectionHorizontallyScrolled';
exports.ScrollSpreadsheetSectionAction = ScrollSpreadsheetSectionAction;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ToggleFilterAction = (function () {
    function ToggleFilterAction(columnIndex) {
        this.type = ToggleFilterAction.type;
        this.payload = {
            columnIndex: columnIndex,
        };
    }
    return ToggleFilterAction;
}());
ToggleFilterAction.type = 'ToggleFilter';
exports.ToggleFilterAction = ToggleFilterAction;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UpdateColumnDefinitionListAction = (function () {
    function UpdateColumnDefinitionListAction(newColumnDefinitionList) {
        this.type = UpdateColumnDefinitionListAction.type;
        this.payload = {
            newColumnDefinitionList: newColumnDefinitionList,
        };
    }
    return UpdateColumnDefinitionListAction;
}());
UpdateColumnDefinitionListAction.type = 'UpdateColumnDefinitionList';
exports.UpdateColumnDefinitionListAction = UpdateColumnDefinitionListAction;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UpdateColumnSizeAction = (function () {
    function UpdateColumnSizeAction(columnName, columnSize) {
        this.type = UpdateColumnSizeAction.type;
        this.payload = {
            columnName: columnName,
            columnSize: columnSize,
        };
    }
    return UpdateColumnSizeAction;
}());
UpdateColumnSizeAction.type = 'ColumnResized';
exports.UpdateColumnSizeAction = UpdateColumnSizeAction;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UpdateDataRowListAction = (function () {
    function UpdateDataRowListAction(newDataRowList) {
        this.type = UpdateDataRowListAction.type;
        this.payload = {
            newDataRowList: newDataRowList,
        };
    }
    return UpdateDataRowListAction;
}());
UpdateDataRowListAction.type = 'UpdateDataRowList';
exports.UpdateDataRowListAction = UpdateDataRowListAction;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UpdateSpreadsheetGetRowStyleFnAction = (function () {
    function UpdateSpreadsheetGetRowStyleFnAction(newGetRowStyleFn) {
        this.type = UpdateSpreadsheetGetRowStyleFnAction.type;
        this.payload = {
            newGetRowStyleFn: newGetRowStyleFn,
        };
    }
    return UpdateSpreadsheetGetRowStyleFnAction;
}());
UpdateSpreadsheetGetRowStyleFnAction.type = 'UpdateSpreadsheetGetRowStyleFn';
exports.UpdateSpreadsheetGetRowStyleFnAction = UpdateSpreadsheetGetRowStyleFnAction;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UpdateSpreadsheetSizeAction = (function () {
    function UpdateSpreadsheetSizeAction(newHeight, newWidth) {
        this.type = UpdateSpreadsheetSizeAction.type;
        this.payload = {
            newHeight: newHeight,
            newWidth: newWidth,
        };
    }
    return UpdateSpreadsheetSizeAction;
}());
UpdateSpreadsheetSizeAction.type = 'UpdateSpreadsheetHeight';
exports.UpdateSpreadsheetSizeAction = UpdateSpreadsheetSizeAction;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UpdateSpreadsheetRowHeightAction = (function () {
    function UpdateSpreadsheetRowHeightAction(newDataRowHeight, newTitleRowHeight) {
        this.type = UpdateSpreadsheetRowHeightAction.type;
        this.payload = {
            newDataRowHeight: newDataRowHeight,
            newTitleRowHeight: newTitleRowHeight,
        };
    }
    return UpdateSpreadsheetRowHeightAction;
}());
UpdateSpreadsheetRowHeightAction.type = 'UpdateSpreadsheetRowHeight';
exports.UpdateSpreadsheetRowHeightAction = UpdateSpreadsheetRowHeightAction;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var spreadsheet_1 = __webpack_require__(17);
exports.SpreadsheetComponent = spreadsheet_1.SpreadsheetComponent;
exports.CellComponent = spreadsheet_1.CellComponent;
exports.BodySectionComponent = spreadsheet_1.BodySectionComponent;
exports.HeaderSectionComponent = spreadsheet_1.HeaderSectionComponent;
__export(__webpack_require__(2));
__export(__webpack_require__(1));
__export(__webpack_require__(34));
__export(__webpack_require__(33));


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ColumnDataTypeEnum;
(function (ColumnDataTypeEnum) {
    ColumnDataTypeEnum[ColumnDataTypeEnum["Text"] = 0] = "Text";
    ColumnDataTypeEnum[ColumnDataTypeEnum["Number"] = 1] = "Number";
    ColumnDataTypeEnum[ColumnDataTypeEnum["Date"] = 2] = "Date";
})(ColumnDataTypeEnum = exports.ColumnDataTypeEnum || (exports.ColumnDataTypeEnum = {}));


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ContentTypeEnum;
(function (ContentTypeEnum) {
    ContentTypeEnum[ContentTypeEnum["Data"] = 0] = "Data";
    ContentTypeEnum[ContentTypeEnum["Title"] = 1] = "Title";
})(ContentTypeEnum = exports.ContentTypeEnum || (exports.ContentTypeEnum = {}));


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var cell_manager_1 = __webpack_require__(18);
var CellGetter = (function () {
    function CellGetter(cellManager) {
        this.cellManager = cellManager;
    }
    CellGetter.prototype.get = function (cellLocation) {
        var cellList = this.cellManager.getCellListBySpreadsheetColumnIndex(cellLocation.columnIndex);
        return cellList.find(function (cell) { return cell.spreadsheetCell && cell.spreadsheetCell.rowIndex === cellLocation.rowIndex; });
    };
    return CellGetter;
}());
CellGetter = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof cell_manager_1.CellManager !== "undefined" && cell_manager_1.CellManager) === "function" && _a || Object])
], CellGetter);
exports.CellGetter = CellGetter;
var _a;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var spreadsheet_state_1 = __webpack_require__(4);
var CellLocationRelativeToViewportGetter = (function () {
    function CellLocationRelativeToViewportGetter(spreadsheetState) {
        this.spreadsheetState = spreadsheetState;
    }
    CellLocationRelativeToViewportGetter.prototype.get = function (spreadsheetState, targetCellLocation) {
        if (spreadsheetState == null) {
            spreadsheetState = this.spreadsheetState;
        }
        var targetCellPositionInformation = spreadsheetState.columnPositionInformationMap[targetCellLocation.columnIndex];
        var scrollTop = spreadsheetState.scrollTop;
        var bodyHeight = spreadsheetState.bodyHeight;
        var targetColumn = spreadsheetState.spreadsheetColumnList.find(function (c) { return c.index === targetCellLocation.columnIndex; });
        if (targetColumn == null) {
            return {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                isOutsideViewport: false,
                isOutsideViewportHorizontally: false,
                isOutsideViewportVertically: false,
            };
        }
        var sectionPositionInformation = spreadsheetState.spreadsheetSectionPositionInformationMap[targetColumn.sectionName];
        var width = sectionPositionInformation.width;
        var scrollLeft = spreadsheetState.spreadsheetSectionScrollLeftMap[targetColumn.sectionName];
        var rowHeight = spreadsheetState.dataRowHeight;
        var viewport = {
            bottom: scrollTop + bodyHeight,
            left: scrollLeft,
            right: width + scrollLeft,
            top: scrollTop,
        };
        var target = {
            bottom: (targetCellLocation.rowIndex + 1) * rowHeight,
            left: targetCellPositionInformation.left,
            right: (targetCellPositionInformation.left + targetCellPositionInformation.width),
            top: (targetCellLocation.rowIndex - 1) * rowHeight,
        };
        var relative = {
            top: target.top - viewport.top,
            bottom: target.bottom - viewport.bottom,
            left: target.left - viewport.left,
            right: target.right - viewport.right,
            isOutsideViewport: false,
            isOutsideViewportHorizontally: false,
            isOutsideViewportVertically: false,
        };
        var isLeftBorderInsideViewport = relative.left >= 0;
        var isRightBorderInsideViewport = relative.right <= 0;
        var isHorizontalCenterInsideViewport = relative.left <= 0 && relative.right >= 0;
        var isColumnGreaterThanViewport = targetCellPositionInformation.width > width;
        if (isColumnGreaterThanViewport) {
            relative.isOutsideViewportHorizontally = !isHorizontalCenterInsideViewport && !isLeftBorderInsideViewport && !isRightBorderInsideViewport;
        }
        else {
            relative.isOutsideViewportHorizontally = !isLeftBorderInsideViewport || !isRightBorderInsideViewport;
        }
        relative.isOutsideViewportVertically = !(relative.top < 0 && relative.bottom > 0) && (relative.top < 0 || relative.bottom > 0);
        relative.isOutsideViewport = relative.isOutsideViewportHorizontally || relative.isOutsideViewportVertically;
        return relative;
    };
    return CellLocationRelativeToViewportGetter;
}());
CellLocationRelativeToViewportGetter = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof spreadsheet_state_1.SpreadsheetState !== "undefined" && spreadsheet_state_1.SpreadsheetState) === "function" && _a || Object])
], CellLocationRelativeToViewportGetter);
exports.CellLocationRelativeToViewportGetter = CellLocationRelativeToViewportGetter;
var _a;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var CellPositionUpdater = (function () {
    function CellPositionUpdater() {
    }
    CellPositionUpdater.prototype.update = function (cell, columnPositionInformationMap) {
        var columnPositionInformation = columnPositionInformationMap[cell.spreadsheetColumnIndex];
        if (columnPositionInformation) {
            cell.width = columnPositionInformation.width;
            cell.left = columnPositionInformation.left;
        }
    };
    return CellPositionUpdater;
}());
CellPositionUpdater = __decorate([
    core_1.Injectable()
], CellPositionUpdater);
exports.CellPositionUpdater = CellPositionUpdater;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var columnUnitList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var ColumnIdentifierMapGetter = (function () {
    function ColumnIdentifierMapGetter() {
    }
    ColumnIdentifierMapGetter.prototype.getMap = function (spreadsheetColumnList) {
        var spreadsheetColumnIdentifierMap = {};
        if (!spreadsheetColumnList) {
            return spreadsheetColumnIdentifierMap;
        }
        var tensCount = 0;
        var unitCount = 0;
        spreadsheetColumnList.forEach(function (gc) {
            unitCount = gc.index % columnUnitList.length;
            tensCount = Math.floor(gc.index / columnUnitList.length);
            var columnIdentifier = '';
            if (tensCount > 0) {
                columnIdentifier = columnUnitList[tensCount - 1];
            }
            columnIdentifier = columnIdentifier + columnUnitList[unitCount];
            spreadsheetColumnIdentifierMap[gc.index] = columnIdentifier;
        });
        return spreadsheetColumnIdentifierMap;
    };
    return ColumnIdentifierMapGetter;
}());
ColumnIdentifierMapGetter = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ColumnIdentifierMapGetter);
exports.ColumnIdentifierMapGetter = ColumnIdentifierMapGetter;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ColumnListGetter = (function () {
    function ColumnListGetter() {
    }
    ColumnListGetter.prototype.get = function (columnDefinitionList) {
        var lastIndex = -1;
        return columnDefinitionList.filter(function (c) { return !c.isHidden; }).map(function (columnDefinition) {
            var spreadsheetColumn = columnDefinition.getColumn(lastIndex + 1, columnDefinitionList);
            spreadsheetColumn.name = columnDefinition.name;
            lastIndex = spreadsheetColumn.endIndex;
            spreadsheetColumn.width = spreadsheetColumn.width || spreadsheetColumn.defaultWidth;
            spreadsheetColumn.dataType = columnDefinition.dataType;
            spreadsheetColumn.sectionName = columnDefinition.spreadsheetSection;
            spreadsheetColumn.isExportable = columnDefinition.isExportable;
            return spreadsheetColumn;
        });
    };
    return ColumnListGetter;
}());
ColumnListGetter = __decorate([
    core_1.Injectable()
], ColumnListGetter);
exports.ColumnListGetter = ColumnListGetter;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ColumnPositionInformationMapCalculator = (function () {
    function ColumnPositionInformationMapCalculator() {
    }
    ColumnPositionInformationMapCalculator.prototype.calculate = function (spreadsheetColumnList) {
        var initialColumnPositionInformationMap = this.getInitialColumnPositionInformationMap(spreadsheetColumnList);
        return initialColumnPositionInformationMap;
    };
    ColumnPositionInformationMapCalculator.prototype.getInitialColumnPositionInformationMap = function (spreadsheetColumnList) {
        var currentColumnPositionBySectionMap = {};
        var columnPositionInformationMap = {};
        spreadsheetColumnList.forEach(function (spreadsheetColumn) {
            if (!currentColumnPositionBySectionMap[spreadsheetColumn.sectionName]) {
                currentColumnPositionBySectionMap[spreadsheetColumn.sectionName] = 0;
            }
            columnPositionInformationMap[spreadsheetColumn.index] = {
                left: currentColumnPositionBySectionMap[spreadsheetColumn.sectionName],
                width: spreadsheetColumn.width,
            };
            currentColumnPositionBySectionMap[spreadsheetColumn.sectionName] += spreadsheetColumn.width;
        });
        return columnPositionInformationMap;
    };
    return ColumnPositionInformationMapCalculator;
}());
ColumnPositionInformationMapCalculator = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ColumnPositionInformationMapCalculator);
exports.ColumnPositionInformationMapCalculator = ColumnPositionInformationMapCalculator;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var column_to_render_index_list_getter_1 = __webpack_require__(19);
var spreadsheet_section_data_row_map_getter_1 = __webpack_require__(25);
var ColumnViewportUpdater = (function () {
    function ColumnViewportUpdater(columnToRenderIndexListGetter, spreadsheetSectionDataRowMapGetter) {
        this.columnToRenderIndexListGetter = columnToRenderIndexListGetter;
        this.spreadsheetSectionDataRowMapGetter = spreadsheetSectionDataRowMapGetter;
    }
    ColumnViewportUpdater.prototype.update = function (spreadsheetState, spreadsheetSectionName) {
        var _this = this;
        if (spreadsheetSectionName === 'RowNumber' || spreadsheetSectionName === 'Scroll') {
            return;
        }
        var spreadsheetSectionList = spreadsheetState.spreadsheetSectionList.slice(0);
        var spreadsheetSection = spreadsheetSectionList.find(function (ts) { return ts.name === spreadsheetSectionName; });
        if (!spreadsheetSection) {
            return;
        }
        var spreadsheetSectionIndex = spreadsheetSectionList.indexOf(spreadsheetSection);
        spreadsheetSection = Object.assign({}, spreadsheetSection);
        var validIndexList = this.columnToRenderIndexListGetter.update(spreadsheetState, spreadsheetSectionName);
        spreadsheetSection.titleRowList = this.map(spreadsheetSection.titleRowList, function (row) {
            var result = Object.assign({}, row);
            result.visibleCellList = _this.getVisibleCellList(validIndexList, result);
            return result;
        });
        spreadsheetSection.dataRowList = this.map(spreadsheetSection.dataRowList, function (row) {
            var result = Object.assign({}, row);
            result.visibleCellList = _this.getVisibleCellList(validIndexList, result);
            return result;
        });
        spreadsheetSectionList.splice(spreadsheetSectionIndex, 1);
        spreadsheetSectionList.splice(spreadsheetSectionIndex, 0, this.spreadsheetSectionDataRowMapGetter.get(spreadsheetSection));
        return spreadsheetSectionList;
    };
    ColumnViewportUpdater.prototype.map = function (array, mapFunction) {
        var arrayLen = array.length;
        var newArray = new Array(arrayLen);
        for (var i = 0; i < arrayLen; i++) {
            newArray[i] = mapFunction(array[i], i, array);
        }
        return newArray;
    };
    ColumnViewportUpdater.prototype.getVisibleCellList = function (validIndexList, row) {
        var cellToAddList = new Array(validIndexList.length);
        var index = 0;
        var lastCell;
        var length = validIndexList.length;
        for (var arrayIndex = 0; arrayIndex < length; arrayIndex++) {
            var columnIndex = validIndexList[arrayIndex];
            var cell = row.cellMap[columnIndex];
            if (cell && cell !== lastCell) {
                cellToAddList[index] = cell;
                index++;
            }
            lastCell = cell;
        }
        cellToAddList.length = index;
        return cellToAddList;
    };
    return ColumnViewportUpdater;
}());
ColumnViewportUpdater = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof column_to_render_index_list_getter_1.ColumnToRenderIndexListGetter !== "undefined" && column_to_render_index_list_getter_1.ColumnToRenderIndexListGetter) === "function" && _a || Object, typeof (_b = typeof spreadsheet_section_data_row_map_getter_1.SpreadsheetSectionDataRowMapGetter !== "undefined" && spreadsheet_section_data_row_map_getter_1.SpreadsheetSectionDataRowMapGetter) === "function" && _b || Object])
], ColumnViewportUpdater);
exports.ColumnViewportUpdater = ColumnViewportUpdater;
var _a, _b;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ExpressionGroup = (function () {
    function ExpressionGroup() {
        this.expressionList = [];
    }
    ExpressionGroup.prototype.filter = function (data) {
        if (!this.expressionList.length) {
            return true;
        }
        return this.expressionList.every(function (exp) {
            return exp.filter(data);
        });
    };
    return ExpressionGroup;
}());
exports.ExpressionGroup = ExpressionGroup;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var comparisson_type_enum_1 = __webpack_require__(23);
var NumberExpression = (function () {
    function NumberExpression() {
    }
    NumberExpression.prototype.filter = function (dataToCompare) {
        switch (this.comparissonType) {
            case comparisson_type_enum_1.ComparissonTypeEnum.Equal:
                return dataToCompare === this.data;
            case comparisson_type_enum_1.ComparissonTypeEnum.Greater:
                return dataToCompare > this.data;
            case comparisson_type_enum_1.ComparissonTypeEnum.GreaterOrEqual:
                return dataToCompare >= this.data;
            case comparisson_type_enum_1.ComparissonTypeEnum.Less:
                return dataToCompare < this.data;
            case comparisson_type_enum_1.ComparissonTypeEnum.LessOrEqual:
                return dataToCompare <= this.data;
        }
    };
    return NumberExpression;
}());
exports.NumberExpression = NumberExpression;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TextExpression = (function () {
    function TextExpression() {
    }
    Object.defineProperty(TextExpression.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            var escapedData = this.escapeRegExp(value);
            escapedData = (value || '').replace(new RegExp('\\*', 'g'), '.*');
            var rule = '^' + escapedData + '$';
            this._regex = new RegExp(rule, 'i');
        },
        enumerable: true,
        configurable: true
    });
    TextExpression.prototype.filter = function (dataToCompare) {
        return this._regex.test(dataToCompare);
    };
    TextExpression.prototype.escapeRegExp = function (str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\+\?\.\\\^\$\|]/g, '\\$&');
    };
    return TextExpression;
}());
exports.TextExpression = TextExpression;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var model_1 = __webpack_require__(1);
var row_to_render_index_list_getter_1 = __webpack_require__(5);
var NumberDataRowListGetter = (function () {
    function NumberDataRowListGetter(rowToRenderIndexListGetter) {
        this.rowToRenderIndexListGetter = rowToRenderIndexListGetter;
    }
    NumberDataRowListGetter.prototype.get = function (spreadsheetState) {
        var index = 0;
        var spreadsheetSection = spreadsheetState.spreadsheetSectionList[0];
        if (!spreadsheetSection) {
            return [];
        }
        var visibleRowIndexList = this.rowToRenderIndexListGetter.getList(spreadsheetState);
        var rowToCreateCount = Math.max(visibleRowIndexList.length, 14);
        var numberDataRowList = new Array(rowToCreateCount);
        var titleRowCount = spreadsheetState.numberTitleRowList.length;
        var lastRowNumber = null;
        while (index < rowToCreateCount) {
            var visibleRow = spreadsheetSection.visibleDataRowList[index];
            var numberDataRow = {
                cellList: [],
                height: spreadsheetState.dataRowHeight,
                rowData: null,
                rowIndex: visibleRow && visibleRow.rowIndex || 0,
                rowNumber: visibleRow && visibleRow.rowData && visibleRow.rowData.rowNumber
                    ? visibleRow.rowData.rowNumber + titleRowCount
                    : (lastRowNumber || (visibleRow && visibleRow.rowIndex + 1)),
                rowStyle: '',
                rowType: model_1.ContentTypeEnum.Data,
                sectionRowIndex: visibleRow && visibleRow.sectionRowIndex || 0,
                isVisible: true,
            };
            if (visibleRow && visibleRow.rowData && visibleRow.rowData.lastRowNumber) {
                lastRowNumber = visibleRow.rowData.lastRowNumber;
            }
            numberDataRowList[index] = numberDataRow;
            if (lastRowNumber) {
                lastRowNumber++;
            }
            index++;
        }
        return numberDataRowList;
    };
    return NumberDataRowListGetter;
}());
NumberDataRowListGetter = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof row_to_render_index_list_getter_1.RowToRenderIndexListGetter !== "undefined" && row_to_render_index_list_getter_1.RowToRenderIndexListGetter) === "function" && _a || Object])
], NumberDataRowListGetter);
exports.NumberDataRowListGetter = NumberDataRowListGetter;
var _a;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var model_1 = __webpack_require__(1);
var NumberTitleRowListGetter = (function () {
    function NumberTitleRowListGetter() {
    }
    NumberTitleRowListGetter.prototype.get = function (spreadsheetState) {
        var index = 0;
        if (spreadsheetState.titleSpreadsheetRowList.length === 0) {
            return [];
        }
        var numberTitleRowList = new Array(spreadsheetState.titleSpreadsheetRowList.length);
        while (index < spreadsheetState.titleSpreadsheetRowList.length) {
            var visibleRow = spreadsheetState.titleSpreadsheetRowList[index];
            var numberDataRow = {
                cellList: [],
                height: spreadsheetState.titleRowHeight,
                rowData: null,
                rowIndex: visibleRow.rowIndex,
                rowNumber: visibleRow.rowIndex + 1,
                rowStyle: '',
                rowType: model_1.ContentTypeEnum.Title,
                sectionRowIndex: visibleRow.sectionRowIndex,
                isVisible: true,
            };
            numberTitleRowList[index] = numberDataRow;
            index++;
        }
        return numberTitleRowList;
    };
    return NumberTitleRowListGetter;
}());
NumberTitleRowListGetter = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], NumberTitleRowListGetter);
exports.NumberTitleRowListGetter = NumberTitleRowListGetter;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var row_to_render_index_list_getter_1 = __webpack_require__(5);
var RowViewportUpdater = (function () {
    function RowViewportUpdater(rowToRenderIndexListGetter) {
        this.rowToRenderIndexListGetter = rowToRenderIndexListGetter;
    }
    RowViewportUpdater.prototype.update = function (spreadsheetState) {
        var visibleRowIndexList = this.rowToRenderIndexListGetter.getList(spreadsheetState);
        return spreadsheetState.spreadsheetSectionList.map(function (spreadsheetSection) {
            spreadsheetSection = Object.assign({}, spreadsheetSection);
            var rowToAddList = visibleRowIndexList.map(function (sectionRowIndex) { return spreadsheetSection.dataRowMap[sectionRowIndex]; }).filter(function (c) { return c != null; });
            spreadsheetSection.visibleDataRowList = new Array(Math.min(visibleRowIndexList.length, rowToAddList.length));
            var counter = 0;
            rowToAddList.forEach(function (rowToAdd) {
                spreadsheetSection.visibleDataRowList[counter] = rowToAdd;
                counter++;
            });
            return spreadsheetSection;
        });
    };
    return RowViewportUpdater;
}());
RowViewportUpdater = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof row_to_render_index_list_getter_1.RowToRenderIndexListGetter !== "undefined" && row_to_render_index_list_getter_1.RowToRenderIndexListGetter) === "function" && _a || Object])
], RowViewportUpdater);
exports.RowViewportUpdater = RowViewportUpdater;
var _a;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var model_1 = __webpack_require__(1);
var SectionPositionInformationMapCalculator = (function () {
    function SectionPositionInformationMapCalculator() {
    }
    SectionPositionInformationMapCalculator.prototype.calculate = function (spreadsheetState) {
        var sectionPositionInformationMap = {};
        var spreadsheetWidth = spreadsheetState.spreadsheetWidth;
        var totalUsedWidth = 9999999999;
        spreadsheetState.spreadsheetSectionList.forEach(function (gs) {
            if (!sectionPositionInformationMap[gs.name]) {
                sectionPositionInformationMap[gs.name] = {
                    left: 0,
                    width: 0,
                };
            }
            spreadsheetState.spreadsheetColumnList.filter(function (gc) { return gc.sectionName === gs.name; }).forEach(function (gc) {
                sectionPositionInformationMap[gc.sectionName].width += gc.width;
            });
        });
        var sectionNameList = Object.keys(sectionPositionInformationMap);
        var remainingWidth = spreadsheetWidth - 40;
        if (sectionNameList.length === 1) {
            sectionPositionInformationMap[sectionNameList[0]].width = remainingWidth;
        }
        else {
            var expectedWidth = remainingWidth / sectionNameList.length;
            sectionNameList.forEach(function (key) { return totalUsedWidth += sectionPositionInformationMap[key].width; });
            var sectionPositionInformationList = sectionNameList.map(function (key) { return sectionPositionInformationMap[key]; });
            sectionPositionInformationList.filter(function (p) { return p.width <= expectedWidth; }).forEach(function (p) { return remainingWidth = remainingWidth - p.width; });
            var sectionWithWidthGreaterThanExpectedList = sectionPositionInformationList.filter(function (p) { return p.width > expectedWidth; });
            if (sectionWithWidthGreaterThanExpectedList.length !== 0) {
                expectedWidth = remainingWidth / sectionWithWidthGreaterThanExpectedList.length;
                sectionWithWidthGreaterThanExpectedList.forEach(function (p) { return p.width = expectedWidth; });
                sectionWithWidthGreaterThanExpectedList.forEach(function (p) { return remainingWidth = remainingWidth - p.width; });
                sectionWithWidthGreaterThanExpectedList[sectionWithWidthGreaterThanExpectedList.length - 1].width += remainingWidth;
            }
        }
        var currentSectionPosition = model_1.COLUMN_NUMBER_WIDTH;
        sectionNameList.forEach(function (key) {
            sectionPositionInformationMap[key].left = currentSectionPosition;
            currentSectionPosition += sectionPositionInformationMap[key].width;
        });
        return sectionPositionInformationMap;
    };
    return SectionPositionInformationMapCalculator;
}());
SectionPositionInformationMapCalculator = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], SectionPositionInformationMapCalculator);
exports.SectionPositionInformationMapCalculator = SectionPositionInformationMapCalculator;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var SpreadsheetColumnListGetter = (function () {
    function SpreadsheetColumnListGetter() {
    }
    SpreadsheetColumnListGetter.prototype.get = function (columnList, filterExpressionMap) {
        var result = [];
        columnList.forEach(function (column) {
            var columnIndex = column.startIndex;
            while (columnIndex <= column.endIndex) {
                result.push({
                    sectionName: column.sectionName,
                    index: columnIndex,
                    name: column.name,
                    style: column.style,
                    width: column.width,
                    filterExpression: (filterExpressionMap && filterExpressionMap[columnIndex]) || '',
                    dataType: column.dataType,
                });
                columnIndex++;
            }
        });
        return result;
    };
    return SpreadsheetColumnListGetter;
}());
SpreadsheetColumnListGetter = __decorate([
    core_1.Injectable()
], SpreadsheetColumnListGetter);
exports.SpreadsheetColumnListGetter = SpreadsheetColumnListGetter;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var SpreadsheetSectionScrollWidthMapCalculator = (function () {
    function SpreadsheetSectionScrollWidthMapCalculator() {
    }
    SpreadsheetSectionScrollWidthMapCalculator.prototype.calculate = function (spreadsheetState) {
        var result = {};
        spreadsheetState.spreadsheetSectionList.forEach(function (spreadsheetSection) {
            var scrollWidth = 0;
            var spreadsheetColumnList = spreadsheetState.spreadsheetColumnList.filter(function (gc) { return gc.sectionName === spreadsheetSection.name; });
            spreadsheetColumnList.forEach(function (gc) { return scrollWidth += spreadsheetState.columnPositionInformationMap[gc.index].width; });
            result[spreadsheetSection.name] = scrollWidth;
        });
        return result;
    };
    return SpreadsheetSectionScrollWidthMapCalculator;
}());
SpreadsheetSectionScrollWidthMapCalculator = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], SpreadsheetSectionScrollWidthMapCalculator);
exports.SpreadsheetSectionScrollWidthMapCalculator = SpreadsheetSectionScrollWidthMapCalculator;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var model_1 = __webpack_require__(1);
var services_1 = __webpack_require__(3);
var events_1 = __webpack_require__(2);
var spreadsheet_state_1 = __webpack_require__(4);
var BodySectionComponent = (function () {
    function BodySectionComponent(el, eventEmitter, cellGetter, cellLocationRelativeToViewportGetter, spreadsheetState) {
        this.el = el;
        this.eventEmitter = eventEmitter;
        this.cellGetter = cellGetter;
        this.cellLocationRelativeToViewportGetter = cellLocationRelativeToViewportGetter;
        this.spreadsheetState = spreadsheetState;
        this.isInitialized = false;
    }
    Object.defineProperty(BodySectionComponent.prototype, "scrollTop", {
        get: function () {
            if (this._scrollTop == null) {
                this._scrollTop = this.bodyElement.scrollTop;
            }
            if (isNaN(this._scrollTop)) {
                this._scrollTop = 0;
            }
            return this._scrollTop;
        },
        set: function (scrollTop) {
            if (scrollTop < 0 || isNaN(this._scrollTop)) {
                scrollTop = 0;
            }
            if (this._scrollTop !== scrollTop) {
                this.bodyElement.scrollTop = scrollTop;
            }
            this._scrollTop = scrollTop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BodySectionComponent.prototype, "scrollLeft", {
        get: function () {
            if (this._scrollLeft == null) {
                this._scrollLeft = this.bodyElement.scrollLeft;
            }
            return this._scrollLeft;
        },
        set: function (scrollLeft) {
            if (scrollLeft < 0) {
                scrollLeft = 0;
            }
            this._scrollLeft = scrollLeft;
            if (this.bodyElement.scrollLeft !== scrollLeft) {
                this.bodyElement.scrollLeft = this._scrollLeft;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BodySectionComponent.prototype, "bodyElement", {
        get: function () {
            return this.el.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    BodySectionComponent.prototype.focus = function () {
        this.el.nativeElement.focus();
    };
    BodySectionComponent.prototype.ngOnInit = function () {
        if (this.isInitialized) {
            return;
        }
        this.isInitialized = true;
    };
    BodySectionComponent.prototype.ngOnChanges = function (obj) {
        if (obj['spreadsheetSectionPositionInformationMap']) {
            var spreadsheetSectionPositionInformation = this.spreadsheetSectionPositionInformationMap && this.spreadsheetSectionPositionInformationMap[this.spreadsheetSectionName];
            if (spreadsheetSectionPositionInformation) {
                this.left = spreadsheetSectionPositionInformation.left;
                this.width = spreadsheetSectionPositionInformation.width;
            }
        }
        if (this.spreadsheetSectionName === 'RowNumber') {
            this.width = model_1.COLUMN_NUMBER_WIDTH;
        }
        if (obj['spreadsheetSectionScrollLeftMap']) {
            this.el.nativeElement.scrollLeft = this.spreadsheetSectionScrollLeftMap
                && this.spreadsheetSectionScrollLeftMap[this.spreadsheetSectionName];
        }
        if (obj['spreadsheetSectionPositionInformationMap']) {
            this.updateSectionPosition(this.spreadsheetSectionPositionInformationMap);
        }
    };
    BodySectionComponent.prototype.ngOnDestroy = function () {
    };
    BodySectionComponent.prototype.updateSectionPosition = function (sectionPositionInformationMap) {
        var sectionPositionInformation = sectionPositionInformationMap[this.spreadsheetSectionName];
        if (!sectionPositionInformation) {
            return;
        }
        this.left = sectionPositionInformation.left;
        this.width = sectionPositionInformation.width;
    };
    BodySectionComponent.prototype.onKeyUp = function (evt) {
        var _this = this;
        var scrollTop;
        var sourceActiveCell = this.cellGetter.get(this.activeCellLocation);
        var targetActiveCell;
        var rowspan = sourceActiveCell && sourceActiveCell.spreadsheetCell ? sourceActiveCell.spreadsheetCell.rowspan : 1;
        var colspan = sourceActiveCell && sourceActiveCell.spreadsheetCell ? sourceActiveCell.spreadsheetCell.colspan : 1;
        switch (evt.keyCode) {
            case 27:
                if (sourceActiveCell) {
                    sourceActiveCell.cancelEdit();
                    this.bodyElement.focus();
                }
                break;
            case 33:
                scrollTop = Math.min(this.scrollTop - this.bodyElement.clientHeight, 0);
                evt.preventDefault();
                break;
            case 34:
                scrollTop = Math.min(this.scrollTop + this.bodyElement.clientHeight, this.bodyElement.scrollHeight);
                evt.preventDefault();
                break;
            case 35:
                this.bodyElement.style.overflowY = 'scroll';
                scrollTop = this.bodyElement.scrollHeight;
                this.bodyElement.style.overflowY = 'hidden';
                evt.preventDefault();
                break;
            case 36:
                scrollTop = 0;
                evt.preventDefault();
                break;
            case 37: {
                this.eventEmitter.emit(new events_1.GoToCellLocationAction(this.activeCellLocation.rowIndex, this.activeCellLocation.columnIndex - colspan, true));
                break;
            }
            case 38:
                this.eventEmitter.emit(new events_1.GoToCellLocationAction(this.activeCellLocation.rowIndex - rowspan, this.activeCellLocation.columnIndex, true));
                break;
            case 39: {
                this.eventEmitter.emit(new events_1.GoToCellLocationAction(this.activeCellLocation.rowIndex, this.activeCellLocation.columnIndex + colspan, true));
                break;
            }
            case 9:
                evt.preventDefault();
                var isEditing = (sourceActiveCell == null) ? false : sourceActiveCell.isEditing;
                if (evt.shiftKey) {
                    this.eventEmitter.emit(new events_1.GoToCellLocationAction(this.activeCellLocation.rowIndex, this.activeCellLocation.columnIndex - colspan, true));
                }
                else {
                    this.eventEmitter.emit(new events_1.GoToCellLocationAction(this.activeCellLocation.rowIndex, this.activeCellLocation.columnIndex + colspan, true));
                }
                setTimeout(function () {
                    targetActiveCell = _this.cellGetter.get(_this.activeCellLocation);
                    if (sourceActiveCell && isEditing) {
                        targetActiveCell.goToEditMode();
                    }
                });
                break;
            case 13:
                targetActiveCell = this.cellGetter.get(this.activeCellLocation);
                if (targetActiveCell) {
                    targetActiveCell.confirmEdit();
                }
            case 40: {
                this.eventEmitter.emit(new events_1.GoToCellLocationAction(this.activeCellLocation.rowIndex + rowspan, this.activeCellLocation.columnIndex, true));
                break;
            }
            case 113:
                if (sourceActiveCell) {
                    sourceActiveCell.goToEditMode();
                }
                break;
            default:
                return;
        }
        evt.preventDefault();
        if (scrollTop !== undefined) {
            this.eventEmitter.emit(new events_1.ScrollSpreadsheetAction(scrollTop));
        }
    };
    BodySectionComponent.prototype.onWheel = function (evt) {
        var scrollTop = Math.min(this.scrollTop + evt.deltaY, this.bodyElement.scrollHeight);
        this.eventEmitter.emit(new events_1.ScrollSpreadsheetAction(scrollTop));
    };
    BodySectionComponent.prototype.onScroll = function () {
        var scrollLeft = this.bodyElement.scrollLeft;
        if (this.scrollLeft !== scrollLeft) {
            this.scrollLeft = scrollLeft;
            this.eventEmitter.emit(new events_1.ScrollSpreadsheetSectionAction(this.spreadsheetSectionName, scrollLeft));
        }
        if (this.spreadsheetSectionName === 'Scroll') {
            var scrollTop = this.bodyElement.scrollTop;
            this.eventEmitter.emit(new events_1.ScrollSpreadsheetAction(scrollTop));
        }
        else if (this.scrollTop !== this.bodyElement.scrollTop) {
            this.bodyElement.scrollTop = this.scrollTop;
        }
    };
    return BodySectionComponent;
}());
__decorate([
    core_1.HostBinding('style.left'),
    __metadata("design:type", Number)
], BodySectionComponent.prototype, "left", void 0);
__decorate([
    core_1.HostBinding('style.width'),
    __metadata("design:type", Number)
], BodySectionComponent.prototype, "width", void 0);
__decorate([
    core_1.Input('spreadsheetSectionName'),
    __metadata("design:type", String)
], BodySectionComponent.prototype, "spreadsheetSectionName", void 0);
__decorate([
    core_1.Input('spreadsheetSectionPositionInformationMap'),
    __metadata("design:type", typeof (_a = typeof model_1.SpreadsheetSectionPositionInformationMap !== "undefined" && model_1.SpreadsheetSectionPositionInformationMap) === "function" && _a || Object)
], BodySectionComponent.prototype, "spreadsheetSectionPositionInformationMap", void 0);
__decorate([
    core_1.Input('spreadsheetSectionScrollLeftMap'),
    __metadata("design:type", Object)
], BodySectionComponent.prototype, "spreadsheetSectionScrollLeftMap", void 0);
__decorate([
    core_1.Input('activeCellLocation'),
    __metadata("design:type", typeof (_b = typeof model_1.CellLocation !== "undefined" && model_1.CellLocation) === "function" && _b || Object)
], BodySectionComponent.prototype, "activeCellLocation", void 0);
__decorate([
    core_1.Input('scrollTop'),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], BodySectionComponent.prototype, "scrollTop", null);
__decorate([
    core_1.HostListener('keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BodySectionComponent.prototype, "onKeyUp", null);
__decorate([
    core_1.HostListener('wheel', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BodySectionComponent.prototype, "onWheel", null);
__decorate([
    core_1.HostListener('scroll', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BodySectionComponent.prototype, "onScroll", null);
BodySectionComponent = __decorate([
    core_1.Component({
        selector: 'BodySection',
        template: __webpack_require__(36),
        styles: [__webpack_require__(35)],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
    }),
    __param(1, core_1.Inject(events_1.DISPATCHER_TOKEN)),
    __metadata("design:paramtypes", [typeof (_c = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _c || Object, typeof (_d = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" && _d || Object, typeof (_e = typeof services_1.CellGetter !== "undefined" && services_1.CellGetter) === "function" && _e || Object, typeof (_f = typeof services_1.CellLocationRelativeToViewportGetter !== "undefined" && services_1.CellLocationRelativeToViewportGetter) === "function" && _f || Object, typeof (_g = typeof spreadsheet_state_1.SpreadsheetState !== "undefined" && spreadsheet_state_1.SpreadsheetState) === "function" && _g || Object])
], BodySectionComponent);
exports.BodySectionComponent = BodySectionComponent;
var _a, _b, _c, _d, _e, _f, _g;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var model_1 = __webpack_require__(1);
var BodyComponent = (function () {
    function BodyComponent(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.spreadsheetSectionList = [];
        this.numberDataRowList = [];
        this.height = 400;
    }
    BodyComponent.prototype.ngOnInit = function () {
        if (this.isInitialized) {
            return;
        }
        this.isInitialized = true;
    };
    BodyComponent.prototype.ngOnChanges = function (obj) {
        if (obj.columnPositionInformationMap) {
        }
    };
    BodyComponent.prototype.ngOnDestroy = function () {
    };
    BodyComponent.prototype.spreadsheetSectionIdentity = function (index, spreadsheetSection) {
        if (spreadsheetSection) {
            return spreadsheetSection.name;
        }
        return 'spreadsheetSection_' + index;
    };
    return BodyComponent;
}());
__decorate([
    core_1.Input('scrollTop'),
    __metadata("design:type", Number)
], BodyComponent.prototype, "scrollTop", void 0);
__decorate([
    core_1.Input('spreadsheetSectionList'),
    __metadata("design:type", Array)
], BodyComponent.prototype, "spreadsheetSectionList", void 0);
__decorate([
    core_1.Input('numberDataRowList'),
    __metadata("design:type", Array)
], BodyComponent.prototype, "numberDataRowList", void 0);
__decorate([
    core_1.Input('columnPositionInformationMap'),
    __metadata("design:type", typeof (_a = typeof model_1.ColumnPositionInformationMap !== "undefined" && model_1.ColumnPositionInformationMap) === "function" && _a || Object)
], BodyComponent.prototype, "columnPositionInformationMap", void 0);
__decorate([
    core_1.Input('spreadsheetSectionScrollWidthMap'),
    __metadata("design:type", Object)
], BodyComponent.prototype, "spreadsheetSectionScrollWidthMap", void 0);
__decorate([
    core_1.Input('spreadsheetSectionScrollLeftMap'),
    __metadata("design:type", Object)
], BodyComponent.prototype, "spreadsheetSectionScrollLeftMap", void 0);
__decorate([
    core_1.Input('spreadsheetSectionPositionInformationMap'),
    __metadata("design:type", typeof (_b = typeof model_1.SpreadsheetSectionPositionInformationMap !== "undefined" && model_1.SpreadsheetSectionPositionInformationMap) === "function" && _b || Object)
], BodyComponent.prototype, "spreadsheetSectionPositionInformationMap", void 0);
__decorate([
    core_1.Input('rowHeight'),
    __metadata("design:type", Number)
], BodyComponent.prototype, "rowHeight", void 0);
__decorate([
    core_1.Input('activeCellLocation'),
    __metadata("design:type", typeof (_c = typeof model_1.CellLocation !== "undefined" && model_1.CellLocation) === "function" && _c || Object)
], BodyComponent.prototype, "activeCellLocation", void 0);
__decorate([
    core_1.Input('activeRowIndexList'),
    __metadata("design:type", Array)
], BodyComponent.prototype, "activeRowIndexList", void 0);
__decorate([
    core_1.HostBinding('style.height'),
    core_1.HostBinding('style.maxHeight'),
    core_1.Input('height'),
    __metadata("design:type", Number)
], BodyComponent.prototype, "height", void 0);
BodyComponent = __decorate([
    core_1.Component({
        selector: 'Body',
        template: __webpack_require__(38),
        styles: [__webpack_require__(37)],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _d || Object, typeof (_e = typeof core_1.Renderer !== "undefined" && core_1.Renderer) === "function" && _e || Object])
], BodyComponent);
exports.BodyComponent = BodyComponent;
var _a, _b, _c, _d, _e;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var platform_browser_1 = __webpack_require__(143);
var model_1 = __webpack_require__(1);
var events_1 = __webpack_require__(2);
var services_1 = __webpack_require__(3);
var is_cell_active_checker_1 = __webpack_require__(13);
var spreadsheet_state_1 = __webpack_require__(4);
var body_section_1 = __webpack_require__(28);
var CellComponent = (function () {
    function CellComponent(resolver, el, app, cellPositionUpdater, cdr, viewContainerRef, isCellActiveChecker, cellManager, spreadsheetState, domSanitizer, eventEmitter, bodySectionComponent) {
        this.resolver = resolver;
        this.el = el;
        this.app = app;
        this.cellPositionUpdater = cellPositionUpdater;
        this.cdr = cdr;
        this.viewContainerRef = viewContainerRef;
        this.isCellActiveChecker = isCellActiveChecker;
        this.cellManager = cellManager;
        this.spreadsheetState = spreadsheetState;
        this.domSanitizer = domSanitizer;
        this.eventEmitter = eventEmitter;
        this.bodySectionComponent = bodySectionComponent;
        this.zIndex = 1;
        this.isActive = false;
        this.isCustom = false;
        this.isEditing = false;
    }
    CellComponent.prototype.onClick = function (evt) {
        if (!this.spreadsheetCell) {
            return;
        }
        this.eventEmitter.emit(new events_1.GoToCellLocationAction(this.spreadsheetCell.rowIndex, this.spreadsheetCell.columnIndex, true, false));
    };
    CellComponent.prototype.onDoubleClick = function (evt) {
        if (!this.spreadsheetCell) {
            return;
        }
        this.eventEmitter.emit(new events_1.GoToCellLocationAction(this.spreadsheetCell.rowIndex, this.spreadsheetCell.columnIndex, true));
        this.goToEditMode();
    };
    CellComponent.prototype.ngOnChanges = function (changes) {
        if (!this.spreadsheetCell) {
            this.clear();
            this.data = null;
            this.zIndex = 0;
            this.isActive = false;
            this.style = 'is-empty';
            return;
        }
        if (changes['spreadsheetCell']) {
            this.initCell(this.spreadsheetCell);
        }
        if (changes['spreadsheetCell'] || changes['rowHeight']) {
            this.height = this.spreadsheetCell.rowspan * this.rowHeight;
        }
        if (changes['rowData'] || changes['spreadsheetSectionScrollLeft'] || changes['columnPositionInformationMap']) {
            if (this.columnPositionInformationMap) {
                this.width = 0;
                var index = 0;
                while (index < this.spreadsheetCell.colspan) {
                    var columnPositionInformation = this.columnPositionInformationMap[this.spreadsheetColumnIndex + index];
                    this.width += columnPositionInformation ? columnPositionInformation.width : 0;
                    index++;
                }
            }
        }
        if (changes['spreadsheetCell'] || changes['rowData'] || changes['spreadsheetSectionScrollLeft'] || changes['columnPositionInformationMap']) {
            var columnPositionInformation = this.columnPositionInformationMap[this.spreadsheetColumnIndex];
            var left = columnPositionInformation ? columnPositionInformation.left : 0;
            this.left = left;
        }
        if (changes['activeCellLocation']) {
            this.isActive = this.isCellActiveChecker.check(this.spreadsheetCell, this.activeCellLocation);
            if (this.editComponent && !this.isActive) {
                this.confirmEdit();
            }
            else {
                this.updateZIndex();
            }
        }
    };
    CellComponent.prototype.ngOnInit = function () {
    };
    CellComponent.prototype.ngAfterViewInit = function () {
        this.cellManager.addCell(this);
        if (!this.spreadsheetCell) {
            this.style = 'is-empty';
            return;
        }
        this.initCell(this.spreadsheetCell);
    };
    CellComponent.prototype.getElement = function () {
        return this.el.nativeElement;
    };
    CellComponent.prototype.confirmEdit = function () {
        this.editComponent.instance.onEditDone(this.rowData);
        this.goToViewMode();
        this.updateZIndex();
    };
    CellComponent.prototype.goToEditMode = function () {
        var _this = this;
        if (this.spreadsheetCell.editableComponentType && !this.isEditing) {
            this.isCustom = true;
            this.cdr.markForCheck();
            this.isEditing = true;
            this.clear();
            var factory = this.resolver.resolveComponentFactory(this.spreadsheetCell.editableComponentType);
            var componentRef = this.cellViewContainer.createComponent(factory);
            this.editComponent = componentRef;
            componentRef.instance.onEditStarted(this.rowData);
            componentRef.onDestroy(function () {
                _this.isEditing = false;
                _this.bodySectionComponent.focus();
            });
        }
        else {
            this.isCustom = false;
        }
    };
    CellComponent.prototype.cancelEdit = function () {
        if (this.editComponent) {
            var editableComponent = this.editComponent.instance;
            editableComponent.onCancelEdit(this.rowData);
            this.goToViewMode();
        }
    };
    CellComponent.prototype.goToViewMode = function () {
        this.clear();
        if (this.spreadsheetCell.viewableComponentType) {
            this.isCustom = true;
            if (!this.cellViewContainer) {
                return;
            }
            if (this.viewComponent) {
                this.viewComponent.destroy();
            }
            var factory = this.resolver.resolveComponentFactory(this.spreadsheetCell.viewableComponentType);
            var componentRef = this.cellViewContainer.createComponent(factory);
            this.viewComponent = componentRef;
            componentRef.instance.onRowInit(this.rowData);
            this.cdr.markForCheck();
        }
        else if (this.spreadsheetCell.formatData !== undefined) {
            this.isCustom = false;
            var data = this.spreadsheetCell.formatData(this.spreadsheetCell.data);
            if (this.spreadsheetCell.cellType === model_1.ContentTypeEnum.Title) {
                this.data = this.domSanitizer.bypassSecurityTrustHtml(data);
            }
            else {
                this.data = data;
            }
        }
        else {
            this.isCustom = false;
            var data = this.spreadsheetCell.data;
            if (this.spreadsheetCell.cellType === model_1.ContentTypeEnum.Title) {
                this.data = this.domSanitizer.bypassSecurityTrustHtml(data);
            }
            else {
                this.data = data;
            }
        }
    };
    CellComponent.prototype.getScrollWidth = function () {
        return this.el.nativeElement.scrollWidth;
    };
    CellComponent.prototype.ngOnDestroy = function () {
        this.cellManager.removeCell(this);
    };
    CellComponent.prototype.initCell = function (spreadsheetCell) {
        this.spreadsheetColumnIndex = spreadsheetCell.columnIndex;
        this.style = spreadsheetCell.cellStyle;
        if (spreadsheetCell.isEditing) {
            this.goToEditMode();
        }
        else {
            this.goToViewMode();
        }
        this.isActive = this.isCellActiveChecker.check(spreadsheetCell, this.activeCellLocation);
        if (this.isActive && this.style) {
            this.style += ' is-active';
        }
        if (this.isCustom && this.style) {
            this.style += ' is-custom';
        }
        this.updateZIndex();
    };
    CellComponent.prototype.updateZIndex = function () {
        this.zIndex = 1;
        if (this.spreadsheetCell.rowspan > 1) {
            this.zIndex = 2;
        }
        else if (this.spreadsheetCell.colspan > 1) {
            this.zIndex = 3;
        }
        if (this.isActive) {
            this.zIndex = 4;
        }
    };
    CellComponent.prototype.clear = function () {
        this.data = null;
        if (this.viewComponent) {
            this.viewComponent.destroy();
        }
        if (this.editComponent) {
            this.editComponent.destroy();
            this.editComponent = null;
        }
        if (this.cellViewContainer) {
            this.cellViewContainer.clear();
        }
    };
    return CellComponent;
}());
__decorate([
    core_1.Input('cell'),
    __metadata("design:type", typeof (_a = typeof model_1.SpreadsheetCell !== "undefined" && model_1.SpreadsheetCell) === "function" && _a || Object)
], CellComponent.prototype, "spreadsheetCell", void 0);
__decorate([
    core_1.Input('rowData'),
    __metadata("design:type", Object)
], CellComponent.prototype, "rowData", void 0);
__decorate([
    core_1.Input('rowHeight'),
    __metadata("design:type", Number)
], CellComponent.prototype, "rowHeight", void 0);
__decorate([
    core_1.Input('index'),
    __metadata("design:type", Number)
], CellComponent.prototype, "index", void 0);
__decorate([
    core_1.Input('columnPositionInformationMap'),
    __metadata("design:type", typeof (_b = typeof model_1.ColumnPositionInformationMap !== "undefined" && model_1.ColumnPositionInformationMap) === "function" && _b || Object)
], CellComponent.prototype, "columnPositionInformationMap", void 0);
__decorate([
    core_1.Input('spreadsheetSectionScrollLeft'),
    __metadata("design:type", Number)
], CellComponent.prototype, "spreadsheetSectionScrollLeft", void 0);
__decorate([
    core_1.Input('activeCellLocation'),
    __metadata("design:type", typeof (_c = typeof model_1.CellLocation !== "undefined" && model_1.CellLocation) === "function" && _c || Object)
], CellComponent.prototype, "activeCellLocation", void 0);
__decorate([
    core_1.HostBinding('style.zIndex'),
    __metadata("design:type", Number)
], CellComponent.prototype, "zIndex", void 0);
__decorate([
    core_1.HostBinding('style.height.px'),
    __metadata("design:type", Number)
], CellComponent.prototype, "height", void 0);
__decorate([
    core_1.HostBinding('style.width.px'),
    __metadata("design:type", Number)
], CellComponent.prototype, "width", void 0);
__decorate([
    core_1.HostBinding('style.left.px'),
    __metadata("design:type", Number)
], CellComponent.prototype, "left", void 0);
__decorate([
    core_1.HostBinding('style.margin-left.px'),
    __metadata("design:type", Number)
], CellComponent.prototype, "marginLeft", void 0);
__decorate([
    core_1.HostBinding('class.is-active'),
    __metadata("design:type", Boolean)
], CellComponent.prototype, "isActive", void 0);
__decorate([
    core_1.HostBinding('class.is-custom'),
    __metadata("design:type", Boolean)
], CellComponent.prototype, "isCustom", void 0);
__decorate([
    core_1.HostBinding('class'),
    __metadata("design:type", Object)
], CellComponent.prototype, "style", void 0);
__decorate([
    core_1.ViewChild('cellComponent', { read: core_1.ViewContainerRef }),
    __metadata("design:type", typeof (_d = typeof core_1.ViewContainerRef !== "undefined" && core_1.ViewContainerRef) === "function" && _d || Object)
], CellComponent.prototype, "cellViewContainer", void 0);
__decorate([
    core_1.HostListener('mousedown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CellComponent.prototype, "onClick", null);
__decorate([
    core_1.HostListener('dblclick', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CellComponent.prototype, "onDoubleClick", null);
CellComponent = __decorate([
    core_1.Component({
        selector: 'Cell',
        template: __webpack_require__(40),
        styles: [__webpack_require__(39)],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
    }),
    __param(10, core_1.Inject(events_1.DISPATCHER_TOKEN)),
    __param(11, core_1.Optional()), __param(11, core_1.Inject(core_1.forwardRef(function () { return body_section_1.BodySectionComponent; }))),
    __metadata("design:paramtypes", [typeof (_e = typeof core_1.ComponentFactoryResolver !== "undefined" && core_1.ComponentFactoryResolver) === "function" && _e || Object, typeof (_f = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _f || Object, typeof (_g = typeof core_1.ApplicationRef !== "undefined" && core_1.ApplicationRef) === "function" && _g || Object, typeof (_h = typeof services_1.CellPositionUpdater !== "undefined" && services_1.CellPositionUpdater) === "function" && _h || Object, typeof (_j = typeof core_1.ChangeDetectorRef !== "undefined" && core_1.ChangeDetectorRef) === "function" && _j || Object, typeof (_k = typeof core_1.ViewContainerRef !== "undefined" && core_1.ViewContainerRef) === "function" && _k || Object, typeof (_l = typeof is_cell_active_checker_1.IsCellActiveChecker !== "undefined" && is_cell_active_checker_1.IsCellActiveChecker) === "function" && _l || Object, typeof (_m = typeof services_1.CellManager !== "undefined" && services_1.CellManager) === "function" && _m || Object, typeof (_o = typeof spreadsheet_state_1.SpreadsheetState !== "undefined" && spreadsheet_state_1.SpreadsheetState) === "function" && _o || Object, typeof (_p = typeof platform_browser_1.DomSanitizer !== "undefined" && platform_browser_1.DomSanitizer) === "function" && _p || Object, typeof (_q = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" && _q || Object, typeof (_r = typeof body_section_1.BodySectionComponent !== "undefined" && body_section_1.BodySectionComponent) === "function" && _r || Object])
], CellComponent);
exports.CellComponent = CellComponent;
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var model_1 = __webpack_require__(1);
var events_1 = __webpack_require__(2);
var column_mover_1 = __webpack_require__(7);
var column_getter_1 = __webpack_require__(6);
var ColumnCellComponent = ColumnCellComponent_1 = (function () {
    function ColumnCellComponent(el, renderer, columnMover, columnGetter, eventEmitter) {
        this.el = el;
        this.renderer = renderer;
        this.columnMover = columnMover;
        this.columnGetter = columnGetter;
        this.eventEmitter = eventEmitter;
        this.isActive = false;
        this.draggable = true;
        this.marginLeft = 0;
        this.isFilterOpen = false;
        this.spreadsheetColumnIndex = 0;
        this.isFiltered = false;
    }
    ColumnCellComponent.prototype.ngOnInit = function () {
        this.spreadsheetColumnIndex = this.spreadsheetColumn.index;
        this.updatePosition();
    };
    ColumnCellComponent.prototype.ngOnChanges = function (changes) {
        if (changes['spreadsheetColumn']) {
            this.spreadsheetColumnIndex = this.spreadsheetColumn.index;
            this.isFiltered = this.spreadsheetColumn.filterExpression && this.spreadsheetColumn.filterExpression.length > 0;
        }
        if (changes['columnPositionInformationMap']) {
        }
        this.updatePosition();
    };
    ColumnCellComponent.prototype.ngOnDestroy = function () {
    };
    ColumnCellComponent.prototype.getElement = function () {
        return this.el.nativeElement;
    };
    ColumnCellComponent.prototype.toggleFilter = function () {
        this.eventEmitter.emit(new events_1.ToggleFilterAction(this.spreadsheetColumnIndex));
    };
    ColumnCellComponent.prototype.filter = function (expression) {
        this.eventEmitter.emit(new events_1.FilterColumnAction(this.spreadsheetColumnIndex, expression));
    };
    ColumnCellComponent.prototype.onDragStart = function (evt) {
        var columnToMove = this.columnGetter.getBySpreadsheetColumnIndex(this.columnList, this.spreadsheetColumnIndex);
        if (columnToMove.endIndex !== columnToMove.startIndex) {
            evt.preventDefault();
        }
        ColumnCellComponent_1.columnToMove = columnToMove;
    };
    ColumnCellComponent.prototype.onDragEnd = function (evt) {
        ColumnCellComponent_1.columnToMove = null;
    };
    ColumnCellComponent.prototype.onDragOver = function (evt) {
        var currentColumn = this.columnGetter.getBySpreadsheetColumnIndex(this.columnList, this.spreadsheetColumnIndex);
        if (currentColumn.sectionName === ColumnCellComponent_1.columnToMove.sectionName) {
            evt.preventDefault();
        }
    };
    ColumnCellComponent.prototype.onDrop = function (evt) {
        var columnToMove = ColumnCellComponent_1.columnToMove;
        var currentColumn = this.columnGetter.getBySpreadsheetColumnIndex(this.columnList, this.spreadsheetColumnIndex);
        var oldColumnIndex = this.columnList.indexOf(columnToMove);
        var newColumnIndex = this.columnList.indexOf(currentColumn);
        var moveType = newColumnIndex < oldColumnIndex ? events_1.MoveColumnTypeEnum.BeforeReferenceColumn : events_1.MoveColumnTypeEnum.AfterReferenceColumn;
        this.eventEmitter.emit(new events_1.MoveColumnAction(newColumnIndex, oldColumnIndex, columnToMove.name, currentColumn.name, moveType));
    };
    ColumnCellComponent.prototype.getScrollWidth = function () {
        return this.el.nativeElement.scrollWidth;
    };
    ColumnCellComponent.prototype.updatePosition = function () {
        var columnPositionInformation = this.columnPositionInformationMap && this.columnPositionInformationMap[this.spreadsheetColumnIndex];
        if (!columnPositionInformation) {
            return;
        }
        if (this.index === 0) {
            this.marginLeft = columnPositionInformation.left;
        }
        this.width = columnPositionInformation.width;
    };
    return ColumnCellComponent;
}());
__decorate([
    core_1.HostBinding('class.is-active'),
    __metadata("design:type", Boolean)
], ColumnCellComponent.prototype, "isActive", void 0);
__decorate([
    core_1.HostBinding('style.width'),
    __metadata("design:type", Number)
], ColumnCellComponent.prototype, "width", void 0);
__decorate([
    core_1.HostBinding('draggable'),
    __metadata("design:type", Boolean)
], ColumnCellComponent.prototype, "draggable", void 0);
__decorate([
    core_1.HostBinding('style.margin-left.px'),
    __metadata("design:type", Number)
], ColumnCellComponent.prototype, "marginLeft", void 0);
__decorate([
    core_1.Input('spreadsheetColumn'),
    __metadata("design:type", typeof (_a = typeof model_1.SpreadsheetColumn !== "undefined" && model_1.SpreadsheetColumn) === "function" && _a || Object)
], ColumnCellComponent.prototype, "spreadsheetColumn", void 0);
__decorate([
    core_1.Input('columnIdentifier'),
    __metadata("design:type", String)
], ColumnCellComponent.prototype, "columnIdentifier", void 0);
__decorate([
    core_1.Input('columnList'),
    __metadata("design:type", Array)
], ColumnCellComponent.prototype, "columnList", void 0);
__decorate([
    core_1.Input('columnPositionInformationMap'),
    __metadata("design:type", typeof (_b = typeof model_1.ColumnPositionInformationMap !== "undefined" && model_1.ColumnPositionInformationMap) === "function" && _b || Object)
], ColumnCellComponent.prototype, "columnPositionInformationMap", void 0);
__decorate([
    core_1.Input('index'),
    __metadata("design:type", Number)
], ColumnCellComponent.prototype, "index", void 0);
__decorate([
    core_1.Input('isFilterOpen'),
    __metadata("design:type", Boolean)
], ColumnCellComponent.prototype, "isFilterOpen", void 0);
__decorate([
    core_1.HostListener('dragstart', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ColumnCellComponent.prototype, "onDragStart", null);
__decorate([
    core_1.HostListener('dragend', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ColumnCellComponent.prototype, "onDragEnd", null);
__decorate([
    core_1.HostListener('dragover', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ColumnCellComponent.prototype, "onDragOver", null);
__decorate([
    core_1.HostListener('drop', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ColumnCellComponent.prototype, "onDrop", null);
ColumnCellComponent = ColumnCellComponent_1 = __decorate([
    core_1.Component({
        selector: 'ColumnCell',
        template: __webpack_require__(42),
        styles: [__webpack_require__(41)],
    }),
    __param(4, core_1.Inject(events_1.DISPATCHER_TOKEN)),
    __metadata("design:paramtypes", [typeof (_c = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _c || Object, typeof (_d = typeof core_1.Renderer !== "undefined" && core_1.Renderer) === "function" && _d || Object, typeof (_e = typeof column_mover_1.ColumnMover !== "undefined" && column_mover_1.ColumnMover) === "function" && _e || Object, typeof (_f = typeof column_getter_1.ColumnGetter !== "undefined" && column_getter_1.ColumnGetter) === "function" && _f || Object, typeof (_g = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" && _g || Object])
], ColumnCellComponent);
exports.ColumnCellComponent = ColumnCellComponent;
var ColumnCellComponent_1, _a, _b, _c, _d, _e, _f, _g;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var events_1 = __webpack_require__(2);
var model_1 = __webpack_require__(1);
var ColumnCornerCellComponent = (function () {
    function ColumnCornerCellComponent(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.width = model_1.COLUMN_NUMBER_WIDTH;
    }
    ColumnCornerCellComponent.prototype.ngOnInit = function () { };
    ColumnCornerCellComponent.prototype.clearFilter = function () {
        if (this.isFiltered) {
            this.eventEmitter.emit(new events_1.ClearFilterAction());
        }
    };
    return ColumnCornerCellComponent;
}());
__decorate([
    core_1.HostBinding('class.is-filtered'),
    core_1.Input('isFiltered'),
    core_1.HostBinding('style.width'),
    __metadata("design:type", Object)
], ColumnCornerCellComponent.prototype, "width", void 0);
__decorate([
    core_1.HostListener('click'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ColumnCornerCellComponent.prototype, "clearFilter", null);
ColumnCornerCellComponent = __decorate([
    core_1.Component({
        selector: 'ColumnCornerCell',
        template: __webpack_require__(44),
        styles: [__webpack_require__(43)],
    }),
    __param(0, core_1.Inject(events_1.DISPATCHER_TOKEN)),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" && _a || Object])
], ColumnCornerCellComponent);
exports.ColumnCornerCellComponent = ColumnCornerCellComponent;
var _a;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(117));


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var core_2 = __webpack_require__(0);
var events_1 = __webpack_require__(2);
var model_1 = __webpack_require__(1);
var column_target_width_getter_1 = __webpack_require__(14);
var column_size_updater_1 = __webpack_require__(8);
var mouse_position_getter_1 = __webpack_require__(15);
var ColumnResizeComponent = (function () {
    function ColumnResizeComponent(el, renderer, app, columnTargetWidthGetter, columnSizeUpdater, mousePositionGetter, eventEmitter) {
        this.el = el;
        this.renderer = renderer;
        this.app = app;
        this.columnTargetWidthGetter = columnTargetWidthGetter;
        this.columnSizeUpdater = columnSizeUpdater;
        this.mousePositionGetter = mousePositionGetter;
        this.eventEmitter = eventEmitter;
        this.isDragging = false;
        this.isInitialized = false;
        this.originalLeft = 0;
        this.startPosition = 0;
        this.currentPosition = 0;
    }
    ColumnResizeComponent.prototype.ngOnInit = function () {
        this.updateHandlerPosition();
    };
    ColumnResizeComponent.prototype.ngOnChanges = function (obj) {
        if (obj['columnPositionInformationMap'] || obj['spreadsheetColumn']) {
            var positionInformation = this.columnPositionInformationMap
                && this.spreadsheetColumn
                && this.columnPositionInformationMap[this.spreadsheetColumn.index];
            if (positionInformation) {
                this.left = positionInformation.left + positionInformation.width - 2;
            }
        }
    };
    ColumnResizeComponent.prototype.ngOnDestroy = function () {
    };
    ColumnResizeComponent.prototype.updateHandlerPosition = function () {
    };
    ColumnResizeComponent.prototype.onDoubleClick = function (evt) {
        this.eventEmitter.emit(new events_1.UpdateColumnSizeAction(this.spreadsheetColumn.name, 50));
        this.app.tick();
        var newColumnSize = this.columnTargetWidthGetter.getTargetWidth(this.spreadsheetColumn.index);
        this.eventEmitter.emit(new events_1.UpdateColumnSizeAction(this.spreadsheetColumn.name, newColumnSize));
    };
    ColumnResizeComponent.prototype.onMouseDown = function (evt) {
        this.removeResizeListeners();
        evt.preventDefault();
        this.originalLeft = this.left;
        this.startPosition = this.mousePositionGetter.getPosition(evt).x;
        if (evt.type.indexOf('touch') === 0) {
            this.removeMouseMoveListener = this.renderer.listenGlobal('document', 'touchmove', this.onMouseMove.bind(this));
            this.removeMouseUpListener = this.renderer.listenGlobal('document', 'touchend', this.onMouseUp.bind(this));
        }
        else {
            this.removeMouseMoveListener = this.renderer.listenGlobal('document', 'mousemove', this.onMouseMove.bind(this));
            this.removeMouseUpListener = this.renderer.listenGlobal('document', 'mouseup', this.onMouseUp.bind(this));
        }
    };
    ColumnResizeComponent.prototype.onMouseMove = function (evt) {
        this.currentPosition = this.mousePositionGetter.getPosition(evt).x;
        var movementX = this.currentPosition - this.startPosition;
        if (!this.isDragging && Math.abs(movementX) > 0) {
            this.isDragging = true;
        }
        this.left = this.originalLeft + movementX;
    };
    ColumnResizeComponent.prototype.onMouseUp = function (evt) {
        this.removeResizeListeners();
        if (!this.isDragging) {
            return;
        }
        this.isDragging = false;
        this.currentPosition = this.mousePositionGetter.getPosition(evt).x;
        var newColumnSize = this.spreadsheetColumn.width + (this.currentPosition - this.startPosition);
        this.eventEmitter.emit(new events_1.UpdateColumnSizeAction(this.spreadsheetColumn.name, newColumnSize));
        this.startPosition = 0;
        this.currentPosition = 0;
    };
    ColumnResizeComponent.prototype.removeResizeListeners = function () {
        if (this.removeMouseUpListener) {
            this.removeMouseUpListener();
        }
        if (this.removeMouseMoveListener) {
            this.removeMouseMoveListener();
        }
        this.removeMouseUpListener = null;
        this.removeMouseMoveListener = null;
    };
    return ColumnResizeComponent;
}());
__decorate([
    core_1.Input('spreadsheetColumn'),
    __metadata("design:type", typeof (_a = typeof model_1.SpreadsheetColumn !== "undefined" && model_1.SpreadsheetColumn) === "function" && _a || Object)
], ColumnResizeComponent.prototype, "spreadsheetColumn", void 0);
__decorate([
    core_1.Input('columnPositionInformationMap'),
    __metadata("design:type", typeof (_b = typeof model_1.ColumnPositionInformationMap !== "undefined" && model_1.ColumnPositionInformationMap) === "function" && _b || Object)
], ColumnResizeComponent.prototype, "columnPositionInformationMap", void 0);
__decorate([
    core_1.HostBinding('class.is-active'),
    __metadata("design:type", Boolean)
], ColumnResizeComponent.prototype, "isDragging", void 0);
__decorate([
    core_1.HostBinding('style.left'),
    __metadata("design:type", Number)
], ColumnResizeComponent.prototype, "left", void 0);
__decorate([
    core_1.HostListener('dblclick', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ColumnResizeComponent.prototype, "onDoubleClick", null);
__decorate([
    core_1.HostListener('mousedown', ['$event']),
    core_1.HostListener('touchstart', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ColumnResizeComponent.prototype, "onMouseDown", null);
ColumnResizeComponent = __decorate([
    core_1.Component({
        selector: 'ColumnResize',
        template: __webpack_require__(46),
        styles: [__webpack_require__(45)],
    }),
    __param(6, core_2.Inject(events_1.DISPATCHER_TOKEN)),
    __metadata("design:paramtypes", [typeof (_c = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _c || Object, typeof (_d = typeof core_1.Renderer !== "undefined" && core_1.Renderer) === "function" && _d || Object, typeof (_e = typeof core_1.ApplicationRef !== "undefined" && core_1.ApplicationRef) === "function" && _e || Object, typeof (_f = typeof column_target_width_getter_1.ColumnTargetWidthGetter !== "undefined" && column_target_width_getter_1.ColumnTargetWidthGetter) === "function" && _f || Object, typeof (_g = typeof column_size_updater_1.ColumnSizeUpdater !== "undefined" && column_size_updater_1.ColumnSizeUpdater) === "function" && _g || Object, typeof (_h = typeof mouse_position_getter_1.MousePositionGetter !== "undefined" && mouse_position_getter_1.MousePositionGetter) === "function" && _h || Object, typeof (_j = typeof core_2.EventEmitter !== "undefined" && core_2.EventEmitter) === "function" && _j || Object])
], ColumnResizeComponent);
exports.ColumnResizeComponent = ColumnResizeComponent;
var _a, _b, _c, _d, _e, _f, _g, _h, _j;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var model_1 = __webpack_require__(1);
var services_1 = __webpack_require__(3);
var ColumnRowComponent = (function () {
    function ColumnRowComponent(el, renderer, columnIdentifierMapGetter) {
        this.el = el;
        this.renderer = renderer;
        this.columnIdentifierMapGetter = columnIdentifierMapGetter;
        this.spreadsheetColumnIdentifierMap = {};
    }
    ColumnRowComponent.prototype.cellIndentity = function (index, cell) {
        return index;
    };
    ColumnRowComponent.prototype.updateColumnIdentifierList = function () {
        this.spreadsheetColumnIdentifierMap = this.columnIdentifierMapGetter.getMap(this.spreadsheetColumnList);
    };
    ColumnRowComponent.prototype.ngOnInit = function () {
        this.updateColumnIdentifierList();
    };
    ColumnRowComponent.prototype.ngOnChanges = function (obj) {
        if (obj['spreadsheetColumnList'] || obj['visibleSpreadsheetColumnList']) {
            this.updateColumnIdentifierList();
        }
    };
    ColumnRowComponent.prototype.ngOnDestroy = function () {
    };
    return ColumnRowComponent;
}());
__decorate([
    core_1.Input('spreadsheetSectionName'),
    __metadata("design:type", String)
], ColumnRowComponent.prototype, "spreadsheetSectionName", void 0);
__decorate([
    core_1.HostBinding('style.height'),
    __metadata("design:type", Number)
], ColumnRowComponent.prototype, "height", void 0);
__decorate([
    core_1.Input('visibleSpreadsheetColumnList'),
    __metadata("design:type", Array)
], ColumnRowComponent.prototype, "visibleSpreadsheetColumnList", void 0);
__decorate([
    core_1.Input('spreadsheetColumnList'),
    __metadata("design:type", Array)
], ColumnRowComponent.prototype, "spreadsheetColumnList", void 0);
__decorate([
    core_1.Input('columnList'),
    __metadata("design:type", Array)
], ColumnRowComponent.prototype, "columnList", void 0);
__decorate([
    core_1.Input('isFilterOpenMap'),
    __metadata("design:type", Object)
], ColumnRowComponent.prototype, "isFilterOpenMap", void 0);
__decorate([
    core_1.Input('columnPositionInformationMap'),
    __metadata("design:type", typeof (_a = typeof model_1.ColumnPositionInformationMap !== "undefined" && model_1.ColumnPositionInformationMap) === "function" && _a || Object)
], ColumnRowComponent.prototype, "columnPositionInformationMap", void 0);
__decorate([
    core_1.Input('scrollWidth'),
    core_1.HostBinding('style.minWidth'),
    __metadata("design:type", Number)
], ColumnRowComponent.prototype, "scrollWidth", void 0);
ColumnRowComponent = __decorate([
    core_1.Component({
        selector: 'ColumnRow',
        template: __webpack_require__(48),
        styles: [__webpack_require__(47)],
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _b || Object, typeof (_c = typeof core_1.Renderer !== "undefined" && core_1.Renderer) === "function" && _c || Object, typeof (_d = typeof services_1.ColumnIdentifierMapGetter !== "undefined" && services_1.ColumnIdentifierMapGetter) === "function" && _d || Object])
], ColumnRowComponent);
exports.ColumnRowComponent = ColumnRowComponent;
var _a, _b, _c, _d;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(121));


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var services_1 = __webpack_require__(3);
var model_1 = __webpack_require__(1);
var rxjs_1 = __webpack_require__(16);
var DetailsBarComponent = (function () {
    function DetailsBarComponent(cellManager, columnIdentifierMapGetter) {
        this.cellManager = cellManager;
        this.columnIdentifierMapGetter = columnIdentifierMapGetter;
        this.onDownload = new rxjs_1.Subject();
        this.onToggleFullScreen = new rxjs_1.Subject();
        this.columnIdentifierMap = {};
        this.cellLocation = '--';
        this.isFull = false;
    }
    DetailsBarComponent.prototype.ngOnInit = function () {
    };
    DetailsBarComponent.prototype.ngOnChanges = function (obj) {
        var _this = this;
        this.activeCellData = this.activeCellData || this.defaultMessage;
        if (obj['spreadsheetColumnList']) {
            this.columnIdentifierMap = this.columnIdentifierMapGetter.getMap(this.spreadsheetColumnList);
        }
        if (obj['activeCellLocation']) {
            var activeCell = this.cellManager.getCellListBySpreadsheetColumnIndex(this.activeCellLocation.columnIndex)
                .find(function (cell) { return cell.spreadsheetCell && cell.spreadsheetCell.rowIndex === _this.activeCellLocation.rowIndex; });
            if (!activeCell) {
                return;
            }
            var spreadsheetCell = activeCell.spreadsheetCell;
            if (spreadsheetCell.formatData == undefined) {
                this.activeCellData = spreadsheetCell.data;
            }
            else {
                this.activeCellData = spreadsheetCell.formatData(spreadsheetCell.data);
            }
            this.cellLocation = this.columnIdentifierMap[this.activeCellLocation.columnIndex] + (spreadsheetCell.rowIndex + 1);
        }
    };
    DetailsBarComponent.prototype.toggleFullScreen = function () {
        this.isFull = !this.isFull;
        this.onToggleFullScreen.next(this.isFull);
    };
    return DetailsBarComponent;
}());
__decorate([
    core_1.Input('activeCellLocation'),
    __metadata("design:type", typeof (_a = typeof model_1.CellLocation !== "undefined" && model_1.CellLocation) === "function" && _a || Object)
], DetailsBarComponent.prototype, "activeCellLocation", void 0);
__decorate([
    core_1.Input('spreadsheetColumnList'),
    __metadata("design:type", Array)
], DetailsBarComponent.prototype, "spreadsheetColumnList", void 0);
__decorate([
    core_1.Input('defaultMessage'),
    __metadata("design:type", String)
], DetailsBarComponent.prototype, "defaultMessage", void 0);
__decorate([
    core_1.Output('download'),
    __metadata("design:type", typeof (_b = typeof rxjs_1.Subject !== "undefined" && rxjs_1.Subject) === "function" && _b || Object)
], DetailsBarComponent.prototype, "onDownload", void 0);
__decorate([
    core_1.Output('toggleFullScreen'),
    __metadata("design:type", typeof (_c = typeof rxjs_1.Subject !== "undefined" && rxjs_1.Subject) === "function" && _c || Object)
], DetailsBarComponent.prototype, "onToggleFullScreen", void 0);
DetailsBarComponent = __decorate([
    core_1.Component({
        selector: 'DetailsBar',
        template: __webpack_require__(50),
        styles: [__webpack_require__(49)],
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof services_1.CellManager !== "undefined" && services_1.CellManager) === "function" && _d || Object, typeof (_e = typeof services_1.ColumnIdentifierMapGetter !== "undefined" && services_1.ColumnIdentifierMapGetter) === "function" && _e || Object])
], DetailsBarComponent);
exports.DetailsBarComponent = DetailsBarComponent;
var _a, _b, _c, _d, _e;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(123));


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var events_1 = __webpack_require__(2);
var model_1 = __webpack_require__(1);
var HeaderSectionComponent = (function () {
    function HeaderSectionComponent(el, eventEmitter) {
        this.el = el;
        this.eventEmitter = eventEmitter;
        this.isFiltered = false;
    }
    HeaderSectionComponent.prototype.ngOnInit = function () {
    };
    HeaderSectionComponent.prototype.ngOnChanges = function (obj) {
        if (obj['spreadsheetSectionPositionInformationMap']) {
            var spreadsheetSectionPositionInformation = this.spreadsheetSectionPositionInformationMap && this.spreadsheetSectionPositionInformationMap[this.spreadsheetSectionName];
            if (spreadsheetSectionPositionInformation) {
                this.left = spreadsheetSectionPositionInformation.left;
                this.width = spreadsheetSectionPositionInformation.width;
            }
        }
        if (this.spreadsheetSectionName === 'RowNumber') {
            this.width = model_1.COLUMN_NUMBER_WIDTH;
        }
        if (obj['spreadsheetSectionColumnToRendexIndexListMap'] || obj['spreadsheetColumnList']) {
            var spreadsheetSectionColumnToRendexIndexList = this.spreadsheetSectionColumnToRendexIndexListMap
                && this.spreadsheetSectionColumnToRendexIndexListMap[this.spreadsheetSectionName];
            if (spreadsheetSectionColumnToRendexIndexList) {
                this.visibleSpreadsheetColumnList =
                    this.spreadsheetColumnList.filter(function (gc) { return spreadsheetSectionColumnToRendexIndexList.indexOf(gc.index) >= 0; });
            }
        }
        if (obj['spreadsheetSectionScrollWidthMap']) {
            this.scrollWidth = this.spreadsheetSectionScrollWidthMap && this.spreadsheetSectionScrollWidthMap[this.spreadsheetSectionName];
        }
        if (obj['spreadsheetSectionScrollLeftMap']) {
            this.el.nativeElement.scrollLeft =
                this.spreadsheetSectionScrollLeftMap && this.spreadsheetSectionScrollLeftMap[this.spreadsheetSectionName];
        }
        if (obj['spreadsheetColumnList']) {
            this.isFiltered = this.spreadsheetColumnList.some(function (gc) { return gc.filterExpression && gc.filterExpression.length > 0; });
        }
    };
    HeaderSectionComponent.prototype.ngOnDestroy = function () {
    };
    return HeaderSectionComponent;
}());
__decorate([
    core_1.HostBinding('style.left'),
    __metadata("design:type", Number)
], HeaderSectionComponent.prototype, "left", void 0);
__decorate([
    core_1.HostBinding('style.width'),
    __metadata("design:type", Number)
], HeaderSectionComponent.prototype, "width", void 0);
__decorate([
    core_1.Input('spreadsheetSectionScrollWidthMap'),
    __metadata("design:type", Object)
], HeaderSectionComponent.prototype, "spreadsheetSectionScrollWidthMap", void 0);
__decorate([
    core_1.Input('spreadsheetSectionName'),
    __metadata("design:type", String)
], HeaderSectionComponent.prototype, "spreadsheetSectionName", void 0);
__decorate([
    core_1.Input('rowHeight'),
    __metadata("design:type", String)
], HeaderSectionComponent.prototype, "rowHeight", void 0);
__decorate([
    core_1.Input('columnList'),
    __metadata("design:type", Array)
], HeaderSectionComponent.prototype, "columnList", void 0);
__decorate([
    core_1.Input('isFilterOpenMap'),
    __metadata("design:type", Object)
], HeaderSectionComponent.prototype, "isFilterOpenMap", void 0);
__decorate([
    core_1.Input('spreadsheetColumnList'),
    __metadata("design:type", Array)
], HeaderSectionComponent.prototype, "spreadsheetColumnList", void 0);
__decorate([
    core_1.Input('columnPositionInformationMap'),
    __metadata("design:type", typeof (_a = typeof model_1.ColumnPositionInformationMap !== "undefined" && model_1.ColumnPositionInformationMap) === "function" && _a || Object)
], HeaderSectionComponent.prototype, "columnPositionInformationMap", void 0);
__decorate([
    core_1.Input('spreadsheetSectionPositionInformationMap'),
    __metadata("design:type", typeof (_b = typeof model_1.SpreadsheetSectionPositionInformationMap !== "undefined" && model_1.SpreadsheetSectionPositionInformationMap) === "function" && _b || Object)
], HeaderSectionComponent.prototype, "spreadsheetSectionPositionInformationMap", void 0);
__decorate([
    core_1.Input('spreadsheetSectionColumnToRendexIndexListMap'),
    __metadata("design:type", Object)
], HeaderSectionComponent.prototype, "spreadsheetSectionColumnToRendexIndexListMap", void 0);
__decorate([
    core_1.Input('spreadsheetSectionScrollLeftMap'),
    __metadata("design:type", Object)
], HeaderSectionComponent.prototype, "spreadsheetSectionScrollLeftMap", void 0);
HeaderSectionComponent = __decorate([
    core_1.Component({
        selector: 'HeaderSection',
        template: __webpack_require__(52),
        styles: [__webpack_require__(51)],
    }),
    __param(1, core_1.Inject(events_1.DISPATCHER_TOKEN)),
    __metadata("design:paramtypes", [typeof (_c = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _c || Object, typeof (_d = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" && _d || Object])
], HeaderSectionComponent);
exports.HeaderSectionComponent = HeaderSectionComponent;
var _a, _b, _c, _d;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(125));


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var model_1 = __webpack_require__(1);
var NUMBER_ROW_HEIGHT = 20;
var HeaderComponent = (function () {
    function HeaderComponent() {
    }
    HeaderComponent.prototype.ngOnChanges = function (obj) {
        if (obj['numberTitleRowList'] || obj['rowHeight']) {
            this.updateHeight();
        }
    };
    HeaderComponent.prototype.ngOnDestroy = function () {
    };
    HeaderComponent.prototype.spreadsheetSectionIdentity = function (index, spreadsheetSection) {
        if (spreadsheetSection) {
            return spreadsheetSection.name;
        }
        return 'spreadsheetSection_' + index;
    };
    HeaderComponent.prototype.updateHeight = function () {
        this.height = this.numberTitleRowList.length * this.rowHeight + NUMBER_ROW_HEIGHT;
    };
    return HeaderComponent;
}());
__decorate([
    core_1.HostBinding('style.height'),
    __metadata("design:type", Number)
], HeaderComponent.prototype, "height", void 0);
__decorate([
    core_1.Input('numberTitleRowList'),
    __metadata("design:type", Array)
], HeaderComponent.prototype, "numberTitleRowList", void 0);
__decorate([
    core_1.Input('spreadsheetSectionList'),
    __metadata("design:type", Array)
], HeaderComponent.prototype, "spreadsheetSectionList", void 0);
__decorate([
    core_1.Input('spreadsheetColumnList'),
    __metadata("design:type", Array)
], HeaderComponent.prototype, "spreadsheetColumnList", void 0);
__decorate([
    core_1.Input('columnList'),
    __metadata("design:type", Array)
], HeaderComponent.prototype, "columnList", void 0);
__decorate([
    core_1.Input('rowHeight'),
    __metadata("design:type", Number)
], HeaderComponent.prototype, "rowHeight", void 0);
__decorate([
    core_1.Input('columnPositionInformationMap'),
    __metadata("design:type", typeof (_a = typeof model_1.ColumnPositionInformationMap !== "undefined" && model_1.ColumnPositionInformationMap) === "function" && _a || Object)
], HeaderComponent.prototype, "columnPositionInformationMap", void 0);
__decorate([
    core_1.Input('spreadsheetSectionScrollWidthMap'),
    __metadata("design:type", Object)
], HeaderComponent.prototype, "spreadsheetSectionScrollWidthMap", void 0);
__decorate([
    core_1.Input('spreadsheetSectionScrollLeftMap'),
    __metadata("design:type", Object)
], HeaderComponent.prototype, "spreadsheetSectionScrollLeftMap", void 0);
__decorate([
    core_1.Input('spreadsheetSectionPositionInformationMap'),
    __metadata("design:type", typeof (_b = typeof model_1.SpreadsheetSectionPositionInformationMap !== "undefined" && model_1.SpreadsheetSectionPositionInformationMap) === "function" && _b || Object)
], HeaderComponent.prototype, "spreadsheetSectionPositionInformationMap", void 0);
__decorate([
    core_1.Input('isFilterOpenMap'),
    __metadata("design:type", Object)
], HeaderComponent.prototype, "isFilterOpenMap", void 0);
__decorate([
    core_1.Input('spreadsheetSectionColumnToRendexIndexListMap'),
    __metadata("design:type", Object)
], HeaderComponent.prototype, "spreadsheetSectionColumnToRendexIndexListMap", void 0);
HeaderComponent = __decorate([
    core_1.Component({
        selector: 'Header',
        template: __webpack_require__(54),
        styles: [__webpack_require__(53)],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
    }),
    __metadata("design:paramtypes", [])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
var _a, _b;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(127));


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(133));


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var NumberRowListComponent = (function () {
    function NumberRowListComponent() {
    }
    NumberRowListComponent.prototype.rowIndentity = function (index, row) {
        return index;
    };
    return NumberRowListComponent;
}());
__decorate([
    core_1.Input('numberRowList'),
    __metadata("design:type", Array)
], NumberRowListComponent.prototype, "numberRowList", void 0);
__decorate([
    core_1.Input('rowHeight'),
    __metadata("design:type", Number)
], NumberRowListComponent.prototype, "rowHeight", void 0);
NumberRowListComponent = __decorate([
    core_1.Component({
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        selector: "NumberRowList",
        template: __webpack_require__(56),
        styles: [__webpack_require__(55)],
    })
], NumberRowListComponent);
exports.NumberRowListComponent = NumberRowListComponent;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(135));


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var model_1 = __webpack_require__(1);
var RowListComponent = (function () {
    function RowListComponent(cdr) {
        this.cdr = cdr;
    }
    RowListComponent.prototype.ngOnChanges = function (obj) {
        if (obj['spreadsheetSectionScrollWidthMap']) {
            this.spreadsheetSectionScrollWidth =
                this.spreadsheetSectionScrollWidthMap ? this.spreadsheetSectionScrollWidthMap[this.spreadsheetSectionName] : 0;
        }
        if (obj['spreadsheetSectionScrollLeftMap']) {
            this.spreadsheetSectionScrollLeft =
                this.spreadsheetSectionScrollLeftMap ? this.spreadsheetSectionScrollLeftMap[this.spreadsheetSectionName] : 0;
        }
    };
    RowListComponent.prototype.rowIndentity = function (index, row) {
        return index;
    };
    RowListComponent.prototype.cellIdentity = function (index, cell) {
        return cell ? cell.columnIndex : (-1 * index);
    };
    return RowListComponent;
}());
__decorate([
    core_1.Input('rowList'),
    __metadata("design:type", Array)
], RowListComponent.prototype, "rowList", void 0);
__decorate([
    core_1.Input('rowHeight'),
    __metadata("design:type", Number)
], RowListComponent.prototype, "rowHeight", void 0);
__decorate([
    core_1.Input('spreadsheetSectionName'),
    __metadata("design:type", String)
], RowListComponent.prototype, "spreadsheetSectionName", void 0);
__decorate([
    core_1.Input('columnPositionInformationMap'),
    __metadata("design:type", typeof (_a = typeof model_1.ColumnPositionInformationMap !== "undefined" && model_1.ColumnPositionInformationMap) === "function" && _a || Object)
], RowListComponent.prototype, "columnPositionInformationMap", void 0);
__decorate([
    core_1.Input('spreadsheetSectionScrollWidthMap'),
    __metadata("design:type", Object)
], RowListComponent.prototype, "spreadsheetSectionScrollWidthMap", void 0);
__decorate([
    core_1.Input('spreadsheetSectionScrollLeftMap'),
    __metadata("design:type", Object)
], RowListComponent.prototype, "spreadsheetSectionScrollLeftMap", void 0);
__decorate([
    core_1.Input('activeCellLocation'),
    __metadata("design:type", typeof (_b = typeof model_1.CellLocation !== "undefined" && model_1.CellLocation) === "function" && _b || Object)
], RowListComponent.prototype, "activeCellLocation", void 0);
__decorate([
    core_1.Input('activeRowIndexList'),
    __metadata("design:type", Array)
], RowListComponent.prototype, "activeRowIndexList", void 0);
__decorate([
    core_1.HostBinding('style.minWidth'),
    __metadata("design:type", Number)
], RowListComponent.prototype, "spreadsheetSectionScrollWidth", void 0);
RowListComponent = __decorate([
    core_1.Component({
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        selector: "RowList",
        template: __webpack_require__(58),
        styles: [__webpack_require__(57)],
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof core_1.ChangeDetectorRef !== "undefined" && core_1.ChangeDetectorRef) === "function" && _c || Object])
], RowListComponent);
exports.RowListComponent = RowListComponent;
var _a, _b, _c;


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(137));


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var core_2 = __webpack_require__(0);
var model_1 = __webpack_require__(1);
var RowComponent = (function () {
    function RowComponent(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.isActive = false;
    }
    RowComponent.prototype.ngOnChanges = function (changes) {
        if (changes['row']) {
            this.updateRow(changes['row'].currentValue);
        }
        if (this.activeRowIndexList && (changes['activeRowIndexList'] || changes['row'])) {
            this.isActive = this.activeRowIndexList.indexOf(this.row.rowIndex) >= 0;
            this.updateStyle(this.row);
        }
    };
    RowComponent.prototype.ngOnInit = function () {
        if (this.isInitialized) {
            return;
        }
        this.isInitialized = true;
        if (!this.row) {
            return;
        }
        var height = this.row.height;
        this.renderer.setElementStyle(this.el.nativeElement, 'height', height + "px");
    };
    RowComponent.prototype.ngOnDestroy = function () {
    };
    RowComponent.prototype.updateRow = function (row) {
        if (!row) {
            return;
        }
        var height = row.height;
        var top = 0;
        if (row.rowType === model_1.ContentTypeEnum.Title) {
            top = row.sectionRowIndex * height + 20;
        }
        else {
            top = row.sectionRowIndex * height;
        }
        if (this.index === 0 && row.rowType === model_1.ContentTypeEnum.Data) {
            this.renderer.setElementStyle(this.el.nativeElement, 'marginTop', top + "px");
        }
        this.updateStyle(row);
    };
    RowComponent.prototype.updateStyle = function (row) {
        var style = row.rowStyle;
        if (this.activeCellLocation) {
            this.isActive = this.activeCellLocation.rowIndex === this.row.rowIndex;
        }
        if (this.isActive) {
            style = style + ' is-active';
        }
        this.renderer.setElementProperty(this.el.nativeElement, 'className', style);
    };
    return RowComponent;
}());
__decorate([
    core_1.Input('index'),
    __metadata("design:type", Number)
], RowComponent.prototype, "index", void 0);
__decorate([
    core_1.Input('row'),
    __metadata("design:type", typeof (_a = typeof model_1.SpreadsheetRow !== "undefined" && model_1.SpreadsheetRow) === "function" && _a || Object)
], RowComponent.prototype, "row", void 0);
__decorate([
    core_1.Input('spreadsheetSectionName'),
    __metadata("design:type", String)
], RowComponent.prototype, "spreadsheetSectionName", void 0);
__decorate([
    core_1.Input('activeCellLocation'),
    __metadata("design:type", typeof (_b = typeof model_1.CellLocation !== "undefined" && model_1.CellLocation) === "function" && _b || Object)
], RowComponent.prototype, "activeCellLocation", void 0);
__decorate([
    core_1.Input('activeRowIndexList'),
    __metadata("design:type", Array)
], RowComponent.prototype, "activeRowIndexList", void 0);
__decorate([
    core_1.Input('scrollWidth'),
    core_1.HostBinding('style.minWidth'),
    __metadata("design:type", Number)
], RowComponent.prototype, "scrollWidth", void 0);
__decorate([
    core_1.HostBinding('class.is-active'),
    __metadata("design:type", Boolean)
], RowComponent.prototype, "isActive", void 0);
RowComponent = __decorate([
    core_1.Component({
        selector: 'Row',
        template: __webpack_require__(60),
        styles: [__webpack_require__(59)],
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof core_2.ElementRef !== "undefined" && core_2.ElementRef) === "function" && _c || Object, typeof (_d = typeof core_1.Renderer !== "undefined" && core_1.Renderer) === "function" && _d || Object])
], RowComponent);
exports.RowComponent = RowComponent;
var _a, _b, _c, _d;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var spreadsheet_state_1 = __webpack_require__(4);
var services_1 = __webpack_require__(3);
var events_1 = __webpack_require__(2);
var column_mover_1 = __webpack_require__(7);
var column_size_updater_1 = __webpack_require__(8);
var statusBarHeight = 20;
var detailsBarHeight = 36;
var SpreadsheetStore = (function () {
    function SpreadsheetStore(dispatcher, columnListGetter, spreadsheetSectionListGetter, spreadsheetColumnListGetter, columnPositionInformationMapCalculator, spreadsheetSectionScrollWidthMapCalculator, columnViewportUpdater, columnMover, rowViewportUpdater, columnSizeUpdater, sectionPositionInformationMapCalculator, numberTitleRowListGetter, numberDataRowListGetter, columnToRenderIndexListGetter, spreadsheetSectionDataRowMapGetter, numberFilter, filteredDataRowListGetter, cellLocationRelativeToViewportGetter, dataSpreadsheetRowListGetter, titleSpreadsheetRowListGetter) {
        var _this = this;
        this.dispatcher = dispatcher;
        this.columnListGetter = columnListGetter;
        this.spreadsheetSectionListGetter = spreadsheetSectionListGetter;
        this.spreadsheetColumnListGetter = spreadsheetColumnListGetter;
        this.columnPositionInformationMapCalculator = columnPositionInformationMapCalculator;
        this.spreadsheetSectionScrollWidthMapCalculator = spreadsheetSectionScrollWidthMapCalculator;
        this.columnViewportUpdater = columnViewportUpdater;
        this.columnMover = columnMover;
        this.rowViewportUpdater = rowViewportUpdater;
        this.columnSizeUpdater = columnSizeUpdater;
        this.sectionPositionInformationMapCalculator = sectionPositionInformationMapCalculator;
        this.numberTitleRowListGetter = numberTitleRowListGetter;
        this.numberDataRowListGetter = numberDataRowListGetter;
        this.columnToRenderIndexListGetter = columnToRenderIndexListGetter;
        this.spreadsheetSectionDataRowMapGetter = spreadsheetSectionDataRowMapGetter;
        this.numberFilter = numberFilter;
        this.filteredDataRowListGetter = filteredDataRowListGetter;
        this.cellLocationRelativeToViewportGetter = cellLocationRelativeToViewportGetter;
        this.dataSpreadsheetRowListGetter = dataSpreadsheetRowListGetter;
        this.titleSpreadsheetRowListGetter = titleSpreadsheetRowListGetter;
        this.onChanged = new core_1.EventEmitter(false);
        this.spreadsheetState = new spreadsheet_state_1.SpreadsheetState();
        this.dispatcher.subscribe(function (action) {
            if (window['isToLogSpreadsheetEvents']) {
                console.time('SpreadsheetAction');
                console.log("Action requested: " + action.type);
            }
            switch (action.type) {
                case events_1.UpdateColumnDefinitionListAction.type: {
                    _this.spreadsheetState = _this.updateColumnDefinitionList(action);
                    break;
                }
                case events_1.ToggleFilterAction.type: {
                    _this.spreadsheetState = _this.toggleFilter(action);
                    break;
                }
                case events_1.UpdateDataRowListAction.type: {
                    _this.spreadsheetState = _this.updateDataRowList(action);
                    break;
                }
                case events_1.MoveColumnAction.type: {
                    _this.spreadsheetState = _this.moveColumn(action);
                    break;
                }
                case events_1.UpdateColumnSizeAction.type: {
                    _this.spreadsheetState = _this.resizeColumn(action);
                    break;
                }
                case events_1.ScrollSpreadsheetSectionAction.type: {
                    _this.spreadsheetState = _this.scrollSpreadsheetSection(action);
                    break;
                }
                case events_1.ScrollSpreadsheetAction.type: {
                    _this.spreadsheetState = _this.scrollSpreadsheet(action);
                    break;
                }
                case events_1.InitializeSpreadsheetSizeAction.type: {
                    _this.spreadsheetState = _this.initializeSpreadsheetSize(action);
                    break;
                }
                case events_1.UpdateSpreadsheetRowHeightAction.type: {
                    _this.spreadsheetState = _this.updateRowHeight(action);
                    break;
                }
                case events_1.UpdateSpreadsheetGetRowStyleFnAction.type: {
                    _this.spreadsheetState = _this.updateRowStyleFn(action);
                    break;
                }
                case events_1.UpdateSpreadsheetSizeAction.type: {
                    _this.spreadsheetState = _this.updateSpreadsheetSize(action);
                    break;
                }
                case events_1.FilterColumnAction.type: {
                    _this.spreadsheetState = _this.filterSpreadsheetData(action);
                    break;
                }
                case events_1.GoToCellLocationAction.type: {
                    _this.spreadsheetState = _this.goToCellLocation(action);
                    break;
                }
                case events_1.ClearFilterAction.type: {
                    _this.spreadsheetState = _this.clearFilter(action);
                    break;
                }
                default:
                    return;
            }
            if (window['isToLogSpreadsheetEvents']) {
                console.log("Action executed: " + action.type);
                console.timeEnd('SpreadsheetAction');
            }
            _this.onChanged.emit(_this.spreadsheetState);
        });
    }
    SpreadsheetStore.prototype.goToCellLocation = function (action) {
        var _this = this;
        if (action.payload.spreadsheetColumnIndex === this.spreadsheetState.activeCellLocation.columnIndex
            && action.payload.rowIndex === this.spreadsheetState.activeCellLocation.rowIndex) {
            return this.spreadsheetState;
        }
        var spreadsheetState = Object.assign({}, this.spreadsheetState);
        var firstRowIndex = spreadsheetState.numberTitleRowList.length;
        var lastRowIndex = spreadsheetState.numberDataRowList.reduce(function (pv, cv) { return Math.max(cv.rowIndex, pv); }, 0);
        var firstColumnIndex = spreadsheetState.spreadsheetColumnList.reduce(function (pv, cv) { return Math.min(cv.index, pv); }, 999999999);
        var lastColumnIndex = spreadsheetState.spreadsheetColumnList.reduce(function (pv, cv) { return Math.max(cv.index, pv); }, 0);
        if (action.payload.rowIndex <= lastRowIndex
            && action.payload.rowIndex >= firstRowIndex
            && action.payload.spreadsheetColumnIndex <= lastColumnIndex
            && action.payload.spreadsheetColumnIndex >= firstColumnIndex) {
            spreadsheetState.activeCellLocation = {
                columnIndex: action.payload.spreadsheetColumnIndex,
                rowIndex: action.payload.rowIndex,
            };
        }
        var activeCellLocation = spreadsheetState.activeCellLocation;
        var dataRowListLength = spreadsheetState.dataSpreadsheetRowList.length;
        var dataRowIndex = 0;
        var targetRow;
        var targetCell;
        while (dataRowIndex < dataRowListLength) {
            var row = spreadsheetState.dataSpreadsheetRowList[dataRowIndex];
            dataRowIndex++;
            if (row.rowIndex > activeCellLocation.rowIndex) {
                break;
            }
            var cell = row.cellList.find(function (c) {
                var isInTargetRowRange = (c.rowIndex + c.rowspan - 1) >= activeCellLocation.rowIndex && c.rowIndex <= activeCellLocation.rowIndex;
                if (!isInTargetRowRange) {
                    return false;
                }
                var isInTargetColumnRange = (c.columnIndex + c.colspan - 1) >= activeCellLocation.columnIndex && c.columnIndex <= activeCellLocation.columnIndex;
                return isInTargetColumnRange;
            });
            if (cell) {
                targetRow = row;
                targetCell = cell;
                break;
            }
        }
        if (!targetCell && action.payload.rowData === undefined) {
            return spreadsheetState;
        }
        spreadsheetState.activeCellLocation = {
            columnIndex: targetCell ? targetCell.columnIndex : action.payload.spreadsheetColumnIndex,
            rowIndex: targetCell ? targetCell.rowIndex : action.payload.rowIndex,
        };
        spreadsheetState.activeRowIndexList = spreadsheetState.dataSpreadsheetRowList
            .filter(function (sRow) { return sRow.rowData === (action.payload.rowData !== undefined ? action.payload.rowData : targetRow.rowData); })
            .map(function (sRow) { return sRow.rowIndex; });
        var relative = this.cellLocationRelativeToViewportGetter.get(spreadsheetState, spreadsheetState.activeCellLocation);
        if (relative.isOutsideViewport && action.payload.isNavigation) {
            var targetSpreadsheetColumn = spreadsheetState.spreadsheetColumnList.find(function (gc) { return gc.index === action.payload.spreadsheetColumnIndex; });
            if (relative.isOutsideViewportVertically) {
                var targetScrollTop = action.payload.isToUseMinimunScroll ?
                    spreadsheetState.scrollTop + (relative.top <= 0 ? relative.top : relative.bottom) :
                    action.payload.rowIndex * spreadsheetState.dataRowHeight;
                spreadsheetState.scrollTop = Math.max(targetScrollTop, 0);
            }
            if (relative.isOutsideViewportHorizontally) {
                var targetScrollLeft = action.payload.isToUseMinimunScroll ?
                    spreadsheetState.spreadsheetSectionScrollLeftMap[targetSpreadsheetColumn.sectionName] +
                        (relative.left <= 0 ? relative.left : relative.right) :
                    spreadsheetState.columnPositionInformationMap[targetSpreadsheetColumn.index].left;
                spreadsheetState.spreadsheetSectionScrollLeftMap = Object.assign({}, spreadsheetState.spreadsheetSectionScrollLeftMap);
                spreadsheetState.spreadsheetSectionScrollLeftMap[targetSpreadsheetColumn.sectionName] = Math.max(targetScrollLeft, 0);
                spreadsheetState.spreadsheetSectionList = this.columnViewportUpdater.update(spreadsheetState, targetSpreadsheetColumn.sectionName);
            }
            spreadsheetState.spreadsheetSectionList = this.rowViewportUpdater.update(spreadsheetState);
            spreadsheetState.numberTitleRowList = this.numberTitleRowListGetter.get(spreadsheetState);
            spreadsheetState.numberDataRowList = this.numberDataRowListGetter.get(spreadsheetState);
            if (relative.isOutsideViewportHorizontally && action.payload.isNavigation) {
                spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap = {};
                spreadsheetState.spreadsheetSectionList.forEach(function (gs) {
                    if (targetSpreadsheetColumn.sectionName === gs.name) {
                        spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap[gs.name] =
                            _this.columnToRenderIndexListGetter.update(spreadsheetState, gs.name);
                    }
                    else {
                        spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap[gs.name] =
                            _this.spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap[gs.name];
                    }
                });
            }
        }
        return spreadsheetState;
    };
    SpreadsheetStore.prototype.initializeSpreadsheetSize = function (action) {
        var spreadsheetState = Object.assign({}, this.spreadsheetState);
        var evt = action;
        spreadsheetState.spreadsheetWidth = evt.payload.width;
        spreadsheetState.bodyHeight = evt.payload.height;
        return spreadsheetState;
    };
    SpreadsheetStore.prototype.filterSpreadsheetData = function (action) {
        var spreadsheetState = Object.assign({}, this.spreadsheetState);
        spreadsheetState.dataRowList = spreadsheetState.originalDataRowList.slice(0);
        spreadsheetState.spreadsheetColumnList = spreadsheetState.spreadsheetColumnList.slice(0);
        var spreadsheetColumn = spreadsheetState.spreadsheetColumnList.find(function (gc) { return gc.index === action.payload.spreadsheetColumnIndex; });
        var spreadsheetColumnIndex = spreadsheetState.spreadsheetColumnList.indexOf(spreadsheetColumn);
        spreadsheetColumn = Object.assign({}, spreadsheetColumn, { filterExpression: action.payload.expression });
        spreadsheetState.spreadsheetColumnList.splice(spreadsheetColumnIndex, 1, spreadsheetColumn);
        spreadsheetState.filterExpressionMap[action.payload.spreadsheetColumnIndex] = action.payload.expression;
        spreadsheetState.dataRowList = this.filteredDataRowListGetter.getList(spreadsheetState);
        spreadsheetState.dataSpreadsheetRowList =
            this.dataSpreadsheetRowListGetter.get(spreadsheetState, spreadsheetState.titleSpreadsheetRowList.length);
        spreadsheetState.spreadsheetSectionList = this.spreadsheetSectionListGetter.get(spreadsheetState);
        spreadsheetState.spreadsheetSectionList = this.rowViewportUpdater.update(spreadsheetState);
        spreadsheetState.numberTitleRowList = this.numberTitleRowListGetter.get(spreadsheetState);
        spreadsheetState.numberDataRowList = this.numberDataRowListGetter.get(spreadsheetState);
        return spreadsheetState;
    };
    SpreadsheetStore.prototype.clearFilter = function (action) {
        var spreadsheetState = Object.assign({}, this.spreadsheetState);
        spreadsheetState.dataRowList = spreadsheetState.originalDataRowList.slice(0);
        spreadsheetState.filterExpressionMap = {};
        spreadsheetState.spreadsheetColumnList =
            this.spreadsheetColumnListGetter.get(spreadsheetState.columnList, spreadsheetState.filterExpressionMap);
        spreadsheetState.dataRowList = this.filteredDataRowListGetter.getList(spreadsheetState);
        spreadsheetState.dataSpreadsheetRowList =
            this.dataSpreadsheetRowListGetter.get(spreadsheetState, spreadsheetState.titleSpreadsheetRowList.length);
        spreadsheetState.spreadsheetSectionList = this.spreadsheetSectionListGetter.get(spreadsheetState);
        spreadsheetState.spreadsheetSectionList = this.rowViewportUpdater.update(spreadsheetState);
        spreadsheetState.numberTitleRowList = this.numberTitleRowListGetter.get(spreadsheetState);
        spreadsheetState.numberDataRowList = this.numberDataRowListGetter.get(spreadsheetState);
        return spreadsheetState;
    };
    SpreadsheetStore.prototype.updateRowStyleFn = function (action) {
        var spreadsheetState = Object.assign({}, this.spreadsheetState);
        spreadsheetState.getRowStyle = action.payload.newGetRowStyleFn;
        spreadsheetState.spreadsheetSectionList = this.spreadsheetSectionListGetter.get(spreadsheetState);
        return spreadsheetState;
    };
    SpreadsheetStore.prototype.updateSpreadsheetSize = function (action) {
        var _this = this;
        var spreadsheetState = Object.assign({}, this.spreadsheetState);
        var headerHeight = spreadsheetState.numberTitleRowList.length * spreadsheetState.titleRowHeight + 20;
        spreadsheetState.spreadsheetWidth = action.payload.newWidth;
        spreadsheetState.totalHeight = action.payload.newHeight;
        var bodyHeight = Math.max(spreadsheetState.totalHeight - headerHeight - statusBarHeight - detailsBarHeight, spreadsheetState.dataRowHeight * 3);
        spreadsheetState.bodyHeight = bodyHeight;
        spreadsheetState.spreadsheetSectionPositionInformationMap = this.sectionPositionInformationMapCalculator.calculate(spreadsheetState);
        spreadsheetState.spreadsheetSectionList.slice(0).forEach(function (gs) {
            spreadsheetState.spreadsheetSectionList = _this.columnViewportUpdater.update(spreadsheetState, gs.name);
        });
        spreadsheetState.spreadsheetSectionList = this.rowViewportUpdater.update(spreadsheetState);
        spreadsheetState.numberTitleRowList = this.numberTitleRowListGetter.get(spreadsheetState);
        spreadsheetState.numberDataRowList = this.numberDataRowListGetter.get(spreadsheetState);
        spreadsheetState.spreadsheetSectionScrollWidthMap = this.spreadsheetSectionScrollWidthMapCalculator.calculate(spreadsheetState);
        spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap = {};
        spreadsheetState.spreadsheetSectionList.forEach(function (gs) {
            spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap[gs.name] =
                _this.columnToRenderIndexListGetter.update(spreadsheetState, gs.name);
        });
        return spreadsheetState;
    };
    SpreadsheetStore.prototype.updateRowHeight = function (action) {
        var spreadsheetState = Object.assign({}, this.spreadsheetState);
        spreadsheetState.dataRowHeight = action.payload.newDataRowHeight;
        spreadsheetState.titleRowHeight = action.payload.newTitleRowHeight;
        spreadsheetState.spreadsheetSectionList = this.rowViewportUpdater.update(spreadsheetState);
        spreadsheetState.numberTitleRowList = this.numberTitleRowListGetter.get(spreadsheetState);
        spreadsheetState.numberDataRowList = this.numberDataRowListGetter.get(spreadsheetState);
        return spreadsheetState;
    };
    SpreadsheetStore.prototype.scrollSpreadsheet = function (action) {
        var spreadsheetState = Object.assign({}, this.spreadsheetState);
        var maxScrollTop = spreadsheetState.spreadsheetSectionList.length > 0 ?
            ((spreadsheetState.spreadsheetSectionList[0].dataRowListLength) * spreadsheetState.dataRowHeight - spreadsheetState.bodyHeight + 17)
            : 999999999;
        var newScrollTop = Math.min(Math.max(action.payload, 0), Math.max(maxScrollTop, 0));
        if (spreadsheetState.scrollTop === newScrollTop) {
            return spreadsheetState;
        }
        spreadsheetState.scrollTop = newScrollTop;
        spreadsheetState.spreadsheetSectionList = this.rowViewportUpdater.update(spreadsheetState);
        spreadsheetState.numberTitleRowList = this.numberTitleRowListGetter.get(spreadsheetState);
        spreadsheetState.numberDataRowList = this.numberDataRowListGetter.get(spreadsheetState);
        return spreadsheetState;
    };
    SpreadsheetStore.prototype.scrollSpreadsheetSection = function (action) {
        var _this = this;
        var spreadsheetState = Object.assign({}, this.spreadsheetState);
        spreadsheetState.spreadsheetSectionScrollLeftMap = Object.assign({}, spreadsheetState.spreadsheetSectionScrollLeftMap);
        spreadsheetState.spreadsheetSectionScrollLeftMap[action.payload.sectionName] = Math.min(action.payload.scrollLeft);
        spreadsheetState.spreadsheetSectionList = this.columnViewportUpdater.update(spreadsheetState, action.payload.sectionName);
        spreadsheetState.spreadsheetSectionList = this.rowViewportUpdater.update(spreadsheetState);
        spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap = {};
        spreadsheetState.spreadsheetSectionList.forEach(function (gs) {
            spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap[gs.name] =
                _this.columnToRenderIndexListGetter.update(spreadsheetState, gs.name);
        });
        return spreadsheetState;
    };
    SpreadsheetStore.prototype.moveColumn = function (action) {
        var _this = this;
        var spreadsheetState = Object.assign({}, this.spreadsheetState);
        spreadsheetState.columnDefinitionList = this.columnMover.moveColumn(spreadsheetState, action);
        spreadsheetState.columnList = this.columnListGetter.get(spreadsheetState.columnDefinitionList);
        spreadsheetState.filterExpressionMap =
            this.columnMover.moveFilterExpressionMap(spreadsheetState.filterExpressionMap, action.payload.oldColumnIndex, action.payload.newColumnIndex);
        spreadsheetState.spreadsheetColumnList =
            this.spreadsheetColumnListGetter.get(spreadsheetState.columnList, spreadsheetState.filterExpressionMap);
        spreadsheetState.columnPositionInformationMap =
            this.columnPositionInformationMapCalculator.calculate(spreadsheetState.spreadsheetColumnList);
        var spreadsheetColumn = spreadsheetState.spreadsheetColumnList.find(function (gc) { return gc.index === action.payload.newColumnIndex; });
        spreadsheetState.titleSpreadsheetRowList = this.titleSpreadsheetRowListGetter.get(spreadsheetState);
        spreadsheetState.dataSpreadsheetRowList =
            this.dataSpreadsheetRowListGetter.get(spreadsheetState, spreadsheetState.titleSpreadsheetRowList.length);
        spreadsheetState.spreadsheetSectionList = this.spreadsheetSectionListGetter.get(spreadsheetState);
        spreadsheetState.spreadsheetSectionList = this.columnViewportUpdater.update(spreadsheetState, spreadsheetColumn.sectionName);
        spreadsheetState.spreadsheetSectionList = this.rowViewportUpdater.update(spreadsheetState);
        spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap = {};
        spreadsheetState.spreadsheetSectionList.forEach(function (gs) {
            spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap[gs.name] =
                _this.columnToRenderIndexListGetter.update(spreadsheetState, gs.name);
        });
        return spreadsheetState;
    };
    SpreadsheetStore.prototype.resizeColumn = function (action) {
        var _this = this;
        var spreadsheetState = Object.assign({}, this.spreadsheetState);
        var columnList = this.columnSizeUpdater.columnSizeUpdater(spreadsheetState, action);
        if (spreadsheetState.columnList === columnList) {
            return this.spreadsheetState;
        }
        spreadsheetState.columnList = columnList;
        spreadsheetState.spreadsheetColumnList =
            this.spreadsheetColumnListGetter.get(spreadsheetState.columnList, spreadsheetState.filterExpressionMap);
        spreadsheetState.columnPositionInformationMap =
            this.columnPositionInformationMapCalculator.calculate(spreadsheetState.spreadsheetColumnList);
        spreadsheetState.spreadsheetSectionScrollWidthMap = this.spreadsheetSectionScrollWidthMapCalculator.calculate(spreadsheetState);
        spreadsheetState.spreadsheetSectionPositionInformationMap = this.sectionPositionInformationMapCalculator.calculate(spreadsheetState);
        spreadsheetState.spreadsheetSectionList.map(function (gs) { return gs.name; }).forEach(function (spreadsheetSectionName) {
            spreadsheetState.spreadsheetSectionList = _this.columnViewportUpdater.update(spreadsheetState, spreadsheetSectionName);
        });
        spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap = {};
        spreadsheetState.spreadsheetSectionList.forEach(function (gs) {
            spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap[gs.name] =
                _this.columnToRenderIndexListGetter.update(spreadsheetState, gs.name);
        });
        return spreadsheetState;
    };
    SpreadsheetStore.prototype.toggleFilter = function (action) {
        var spreadsheetState = Object.assign(new spreadsheet_state_1.SpreadsheetState(), this.spreadsheetState);
        var columnIndex = action.payload.columnIndex;
        spreadsheetState.isFilterOpenMap[columnIndex] = !spreadsheetState.isFilterOpenMap[columnIndex];
        return spreadsheetState;
    };
    SpreadsheetStore.prototype.updateColumnDefinitionList = function (action) {
        var _this = this;
        if (action.payload.newColumnDefinitionList === this.spreadsheetState.columnDefinitionList) {
            return this.spreadsheetState;
        }
        var spreadsheetState = Object.assign({}, this.spreadsheetState);
        spreadsheetState.columnDefinitionList = action.payload.newColumnDefinitionList || [];
        spreadsheetState.columnList = this.columnListGetter.get(spreadsheetState.columnDefinitionList);
        spreadsheetState.spreadsheetColumnList =
            this.spreadsheetColumnListGetter.get(spreadsheetState.columnList, spreadsheetState.filterExpressionMap);
        spreadsheetState.titleSpreadsheetRowList = this.titleSpreadsheetRowListGetter.get(spreadsheetState);
        spreadsheetState.dataSpreadsheetRowList =
            this.dataSpreadsheetRowListGetter.get(spreadsheetState, spreadsheetState.titleSpreadsheetRowList.length);
        var headerHeight = (spreadsheetState.titleSpreadsheetRowList.length * spreadsheetState.titleRowHeight + 20) || 0;
        var bodyHeight = Math.max(spreadsheetState.totalHeight - headerHeight - statusBarHeight - detailsBarHeight, spreadsheetState.dataRowHeight * 3);
        spreadsheetState.bodyHeight = bodyHeight;
        spreadsheetState.spreadsheetSectionList = this.spreadsheetSectionListGetter.get(spreadsheetState);
        spreadsheetState.columnPositionInformationMap = this.columnPositionInformationMapCalculator.calculate(spreadsheetState.spreadsheetColumnList);
        spreadsheetState.spreadsheetSectionPositionInformationMap = this.sectionPositionInformationMapCalculator.calculate(spreadsheetState);
        spreadsheetState.spreadsheetSectionScrollWidthMap = this.spreadsheetSectionScrollWidthMapCalculator.calculate(spreadsheetState);
        spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap = {};
        spreadsheetState.spreadsheetSectionScrollLeftMap = Object.assign({}, spreadsheetState.spreadsheetSectionScrollLeftMap);
        spreadsheetState.spreadsheetSectionList.forEach(function (gs) {
            if (!spreadsheetState.spreadsheetSectionScrollLeftMap[gs.name]) {
                spreadsheetState.spreadsheetSectionScrollLeftMap[gs.name] = 0;
            }
            spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap[gs.name] =
                _this.columnToRenderIndexListGetter.update(spreadsheetState, gs.name);
        });
        spreadsheetState.spreadsheetSectionList.forEach(function (gs) {
            spreadsheetState.spreadsheetSectionList = _this.columnViewportUpdater.update(spreadsheetState, gs.name);
        });
        spreadsheetState.spreadsheetSectionList = this.rowViewportUpdater.update(spreadsheetState);
        spreadsheetState.numberTitleRowList = this.numberTitleRowListGetter.get(spreadsheetState);
        return spreadsheetState;
    };
    SpreadsheetStore.prototype.updateDataRowList = function (action) {
        var _this = this;
        if (action.payload.newDataRowList === this.spreadsheetState.dataRowList) {
            return this.spreadsheetState;
        }
        var spreadsheetState = Object.assign({}, this.spreadsheetState);
        spreadsheetState.originalDataRowList = (action.payload.newDataRowList || []).slice(0);
        spreadsheetState.dataRowList = action.payload.newDataRowList || [];
        spreadsheetState.dataRowList = this.filteredDataRowListGetter.getList(spreadsheetState);
        spreadsheetState.titleSpreadsheetRowList = this.titleSpreadsheetRowListGetter.get(spreadsheetState);
        spreadsheetState.dataSpreadsheetRowList =
            this.dataSpreadsheetRowListGetter.get(spreadsheetState, spreadsheetState.titleSpreadsheetRowList.length);
        spreadsheetState.spreadsheetSectionList = this.spreadsheetSectionListGetter.get(spreadsheetState);
        spreadsheetState.numberTitleRowList = this.numberTitleRowListGetter.get(spreadsheetState);
        spreadsheetState.numberDataRowList = this.numberDataRowListGetter.get(spreadsheetState);
        spreadsheetState.spreadsheetSectionList.forEach(function (ss) {
            spreadsheetState.spreadsheetSectionList = _this.columnViewportUpdater.update(spreadsheetState, ss.name);
        });
        spreadsheetState.spreadsheetSectionList = this.rowViewportUpdater.update(spreadsheetState);
        spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap = {};
        spreadsheetState.spreadsheetSectionList.forEach(function (gs) {
            spreadsheetState.spreadsheetSectionColumnToRendexIndexListMap[gs.name] =
                _this.columnToRenderIndexListGetter.update(spreadsheetState, gs.name);
        });
        return spreadsheetState;
    };
    return SpreadsheetStore;
}());
SpreadsheetStore = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(events_1.DISPATCHER_TOKEN)),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" && _a || Object, typeof (_b = typeof services_1.ColumnListGetter !== "undefined" && services_1.ColumnListGetter) === "function" && _b || Object, typeof (_c = typeof services_1.SpreadsheetSectionListGetter !== "undefined" && services_1.SpreadsheetSectionListGetter) === "function" && _c || Object, typeof (_d = typeof services_1.SpreadsheetColumnListGetter !== "undefined" && services_1.SpreadsheetColumnListGetter) === "function" && _d || Object, typeof (_e = typeof services_1.ColumnPositionInformationMapCalculator !== "undefined" && services_1.ColumnPositionInformationMapCalculator) === "function" && _e || Object, typeof (_f = typeof services_1.SpreadsheetSectionScrollWidthMapCalculator !== "undefined" && services_1.SpreadsheetSectionScrollWidthMapCalculator) === "function" && _f || Object, typeof (_g = typeof services_1.ColumnViewportUpdater !== "undefined" && services_1.ColumnViewportUpdater) === "function" && _g || Object, typeof (_h = typeof column_mover_1.ColumnMover !== "undefined" && column_mover_1.ColumnMover) === "function" && _h || Object, typeof (_j = typeof services_1.RowViewportUpdater !== "undefined" && services_1.RowViewportUpdater) === "function" && _j || Object, typeof (_k = typeof column_size_updater_1.ColumnSizeUpdater !== "undefined" && column_size_updater_1.ColumnSizeUpdater) === "function" && _k || Object, typeof (_l = typeof services_1.SectionPositionInformationMapCalculator !== "undefined" && services_1.SectionPositionInformationMapCalculator) === "function" && _l || Object, typeof (_m = typeof services_1.NumberTitleRowListGetter !== "undefined" && services_1.NumberTitleRowListGetter) === "function" && _m || Object, typeof (_o = typeof services_1.NumberDataRowListGetter !== "undefined" && services_1.NumberDataRowListGetter) === "function" && _o || Object, typeof (_p = typeof services_1.ColumnToRenderIndexListGetter !== "undefined" && services_1.ColumnToRenderIndexListGetter) === "function" && _p || Object, typeof (_q = typeof services_1.SpreadsheetSectionDataRowMapGetter !== "undefined" && services_1.SpreadsheetSectionDataRowMapGetter) === "function" && _q || Object, typeof (_r = typeof services_1.NumberFilter !== "undefined" && services_1.NumberFilter) === "function" && _r || Object, typeof (_s = typeof services_1.FilteredDataRowListGetter !== "undefined" && services_1.FilteredDataRowListGetter) === "function" && _s || Object, typeof (_t = typeof services_1.CellLocationRelativeToViewportGetter !== "undefined" && services_1.CellLocationRelativeToViewportGetter) === "function" && _t || Object, typeof (_u = typeof services_1.DataSpreadsheetRowListGetter !== "undefined" && services_1.DataSpreadsheetRowListGetter) === "function" && _u || Object, typeof (_v = typeof services_1.TitleSpreadsheetRowListGetter !== "undefined" && services_1.TitleSpreadsheetRowListGetter) === "function" && _v || Object])
], SpreadsheetStore);
exports.SpreadsheetStore = SpreadsheetStore;
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var body_1 = __webpack_require__(29);
var cell_1 = __webpack_require__(30);
var column_cell_1 = __webpack_require__(31);
var column_resize_1 = __webpack_require__(32);
var services_1 = __webpack_require__(3);
var events_1 = __webpack_require__(2);
var spreadsheet_state_1 = __webpack_require__(4);
var spreadsheet_store_1 = __webpack_require__(138);
var rxjs_1 = __webpack_require__(16);
var rxjs_2 = __webpack_require__(16);
var SpreadsheetComponent = (function () {
    function SpreadsheetComponent(el, cdr, dispatcher, app, renderer, spreadsheetStateGlobal, spreadsheetStore, cellManager) {
        var _this = this;
        this.el = el;
        this.cdr = cdr;
        this.dispatcher = dispatcher;
        this.app = app;
        this.renderer = renderer;
        this.spreadsheetStateGlobal = spreadsheetStateGlobal;
        this.spreadsheetStore = spreadsheetStore;
        this.cellManager = cellManager;
        this.onSpreadsheetEvent = new rxjs_1.Subject();
        this.onStateChanged = new rxjs_2.BehaviorSubject(new spreadsheet_state_1.SpreadsheetState());
        this.onDownload = new rxjs_1.Subject();
        this.onToggleFullScreen = new rxjs_1.Subject();
        this.statusMessageCount = 0;
        this.eventEmitterSubscription = this.dispatcher.subscribe(function (data) {
            _this.onSpreadsheetEvent.next({
                eventData: data,
                eventType: 'Action',
            });
        });
        this.spreadsheetStore.onChanged.subscribe(function (changedSpreadsheet) {
            _this.spreadsheetState = changedSpreadsheet;
            Object.assign(_this.spreadsheetStateGlobal, changedSpreadsheet);
            _this.onStateChanged.next(_this.spreadsheetState);
        });
    }
    Object.defineProperty(SpreadsheetComponent.prototype, "firstDataRowRowNumber", {
        get: function () {
            return this.spreadsheetState.numberTitleRowList.length + 1;
        },
        enumerable: true,
        configurable: true
    });
    SpreadsheetComponent.prototype.ngOnInit = function () {
        var _this = this;
        var style = window.getComputedStyle(this.el.nativeElement);
        this.dispatcher.emit(new events_1.InitializeSpreadsheetSizeAction(this.height || parseInt(style.height, 10), parseInt(style.width, 10)));
        this.windowResizeUnregisterFn = this.renderer.listenGlobal('window', 'resize', function () {
            style = window.getComputedStyle(_this.el.nativeElement);
            _this.dispatcher.emit(new events_1.UpdateSpreadsheetSizeAction(_this.height, parseInt(style.width, 10)));
        });
    };
    SpreadsheetComponent.prototype.ngOnChanges = function (obj) {
        if (obj.columnDefinitionList) {
            this.dispatcher.emit(new events_1.UpdateColumnDefinitionListAction((this.columnDefinitionList || [])));
        }
        if (obj.dataRowList) {
            this.dispatcher.emit(new events_1.UpdateDataRowListAction(this.dataRowList));
        }
        if (obj.rowHeight) {
            if (!this.titleRowHeight) {
                this.titleRowHeight = this.rowHeight;
            }
            this.dispatcher.emit(new events_1.UpdateSpreadsheetRowHeightAction(this.rowHeight, this.titleRowHeight));
        }
        if (obj.height) {
            var style = window.getComputedStyle(this.el.nativeElement);
            this.dispatcher.emit(new events_1.UpdateSpreadsheetSizeAction(this.height, parseInt(style.width, 10)));
        }
        if (obj.rowClassGetter) {
            this.dispatcher.emit(new events_1.UpdateSpreadsheetGetRowStyleFnAction(this.rowClassGetter));
        }
    };
    SpreadsheetComponent.prototype.ngOnDestroy = function () {
        this.eventEmitterSubscription.unsubscribe();
        this.windowResizeUnregisterFn();
    };
    SpreadsheetComponent.prototype.recalculateDimensions = function () {
        var _this = this;
        setTimeout(function () {
            var style = window.getComputedStyle(_this.el.nativeElement);
            _this.dispatcher.emit(new events_1.UpdateSpreadsheetSizeAction(_this.height || parseInt(style.height, 10), parseInt(style.width, 10)));
            _this.cdr.markForCheck();
        }, 200);
    };
    SpreadsheetComponent.prototype.getElement = function () {
        return this.el.nativeElement;
    };
    SpreadsheetComponent.prototype.getActiveCell = function () {
        var cellLocation = this.spreadsheetState.activeCellLocation;
        var spreadsheetColumn = this.spreadsheetState.spreadsheetColumnList.find(function (gc) { return gc.index === cellLocation.columnIndex; });
        var spreadsheetSection = this.spreadsheetState.spreadsheetSectionList.find(function (gs) { return gs.name === spreadsheetColumn.sectionName; });
        var spreadsheetRow = spreadsheetSection.dataRowList.find(function (dr) { return dr.rowIndex === cellLocation.rowIndex; });
        if (!spreadsheetRow) {
            return null;
        }
        var spreadsheetCell = spreadsheetRow.cellList.find(function (c) { return c.columnIndex === spreadsheetColumn.index; });
        if (!spreadsheetCell) {
            return null;
        }
        var cell = this.cellManager.getCellByPosition(spreadsheetCell.columnIndex, spreadsheetCell.rowIndex);
        return {
            cell: spreadsheetCell,
            rowData: spreadsheetRow.rowData,
            element: cell.getElement(),
        };
    };
    SpreadsheetComponent.prototype.exportData = function () {
        var rowList = new Array(this.spreadsheetState.spreadsheetSectionList[0].dataRowList.length);
        var spreadsheetColumnMap = {};
        this.spreadsheetState.spreadsheetColumnList.forEach(function (gc) { return spreadsheetColumnMap[gc.index] = gc; });
        this.spreadsheetState.spreadsheetSectionList.forEach(function (spreadsheetSection) {
            spreadsheetSection.titleRowList.forEach(function (tr) {
                if (!rowList[tr.rowIndex]) {
                    rowList[tr.rowIndex] = tr;
                }
                if (tr !== rowList[tr.rowIndex]) {
                    rowList[tr.rowIndex].cellList = rowList[tr.rowIndex].cellList.concat(tr.cellList);
                }
            });
            spreadsheetSection.dataRowList.forEach(function (tr) {
                if (!rowList[tr.rowIndex]) {
                    rowList[tr.rowIndex] = tr;
                }
                if (tr !== rowList[tr.rowIndex]) {
                    rowList[tr.rowIndex].cellList = rowList[tr.rowIndex].cellList.concat(tr.cellList);
                }
            });
        });
        return {
            rowList: rowList,
            columnList: this.spreadsheetState.columnList,
        };
    };
    SpreadsheetComponent.prototype.goToRow = function (rowNumber) {
        if (rowNumber >= this.firstDataRowRowNumber) {
            var rowIndex = (rowNumber - 1);
            var spreadsheetColumnIndex = this.spreadsheetState.activeCellLocation.columnIndex;
            this.dispatcher.emit(new events_1.GoToCellLocationAction(rowIndex, spreadsheetColumnIndex, false));
            this.cdr.markForCheck();
        }
    };
    SpreadsheetComponent.prototype.goToRowByRowData = function (rowData) {
        var row = this.spreadsheetState.dataSpreadsheetRowList.find(function (sr) { return sr.rowData === rowData; });
        var spreadsheetColumnIndex = this.spreadsheetState.activeCellLocation.columnIndex;
        var action = new events_1.GoToCellLocationAction(row.rowIndex, spreadsheetColumnIndex, false);
        action.payload.rowData = rowData;
        this.dispatcher.emit(action);
        this.cdr.markForCheck();
    };
    SpreadsheetComponent.prototype.resizeColumn = function (columnName, newSize) {
        this.dispatcher.emit(new events_1.UpdateColumnSizeAction(columnName, newSize));
        this.cdr.markForCheck();
    };
    SpreadsheetComponent.prototype.clearFilter = function () {
        this.dispatcher.emit(new events_1.ClearFilterAction());
        this.cdr.markForCheck();
    };
    SpreadsheetComponent.prototype.updateStatusMessage = function (message, timeout) {
        var _this = this;
        setTimeout(function () {
            _this.statusMessage = message;
            _this.statusMessageTimeout = timeout;
            _this.statusMessageCount++;
            _this.cdr.markForCheck();
        }, 100);
    };
    SpreadsheetComponent.prototype.onFocus = function (evt) {
        evt.preventDefault();
    };
    SpreadsheetComponent.prototype.spreadsheetSectionIdentity = function (index, spreadsheetSection) {
        if (spreadsheetSection) {
            return spreadsheetSection.name;
        }
        return 'spreadsheetSection_' + index;
    };
    return SpreadsheetComponent;
}());
__decorate([
    core_1.Input('id'),
    __metadata("design:type", String)
], SpreadsheetComponent.prototype, "id", void 0);
__decorate([
    core_1.Input('columnDefinitionList'),
    __metadata("design:type", Array)
], SpreadsheetComponent.prototype, "columnDefinitionList", void 0);
__decorate([
    core_1.Input('dataRowList'),
    __metadata("design:type", Array)
], SpreadsheetComponent.prototype, "dataRowList", void 0);
__decorate([
    core_1.Input('rowHeight'),
    __metadata("design:type", Number)
], SpreadsheetComponent.prototype, "rowHeight", void 0);
__decorate([
    core_1.Input('titleRowHeight'),
    __metadata("design:type", Number)
], SpreadsheetComponent.prototype, "titleRowHeight", void 0);
__decorate([
    core_1.Input('height'),
    __metadata("design:type", Number)
], SpreadsheetComponent.prototype, "height", void 0);
__decorate([
    core_1.Input('defaultDetailsBarMessage'),
    __metadata("design:type", String)
], SpreadsheetComponent.prototype, "defaultDetailsBarMessage", void 0);
__decorate([
    core_1.Input('rowClassGetter'),
    __metadata("design:type", Function)
], SpreadsheetComponent.prototype, "rowClassGetter", void 0);
__decorate([
    core_1.Output('event'),
    __metadata("design:type", Object)
], SpreadsheetComponent.prototype, "onSpreadsheetEvent", void 0);
__decorate([
    core_1.Output('state'),
    __metadata("design:type", Object)
], SpreadsheetComponent.prototype, "onStateChanged", void 0);
__decorate([
    core_1.Output('download'),
    __metadata("design:type", Object)
], SpreadsheetComponent.prototype, "onDownload", void 0);
__decorate([
    core_1.Output('toggleFullScreen'),
    __metadata("design:type", Object)
], SpreadsheetComponent.prototype, "onToggleFullScreen", void 0);
__decorate([
    core_1.ViewChild(body_1.BodyComponent),
    __metadata("design:type", typeof (_a = typeof body_1.BodyComponent !== "undefined" && body_1.BodyComponent) === "function" && _a || Object)
], SpreadsheetComponent.prototype, "body", void 0);
__decorate([
    core_1.HostListener('focusin', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SpreadsheetComponent.prototype, "onFocus", null);
SpreadsheetComponent = __decorate([
    core_1.Component({
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        providers: [
            services_1.SPREADSHEET_SCOPE_PROVIDERS,
            column_resize_1.COLUMN_RESIZE_PROVIDERS,
            column_cell_1.COLUMN_CELL_PROVIDERS,
            cell_1.CELL_PROVIDERS,
            events_1.DISPATCHER_PROVIDERS,
            spreadsheet_state_1.SPREADSHEET_STATE_PROVIDERS,
            spreadsheet_store_1.SpreadsheetStore,
        ],
        selector: 'NgSpreadsheet',
        template: __webpack_require__(62),
        styles: [__webpack_require__(61)],
    }),
    __param(2, core_1.Inject(events_1.DISPATCHER_TOKEN)),
    __metadata("design:paramtypes", [typeof (_b = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _b || Object, typeof (_c = typeof core_1.ChangeDetectorRef !== "undefined" && core_1.ChangeDetectorRef) === "function" && _c || Object, typeof (_d = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" && _d || Object, typeof (_e = typeof core_1.ApplicationRef !== "undefined" && core_1.ApplicationRef) === "function" && _e || Object, typeof (_f = typeof core_1.Renderer !== "undefined" && core_1.Renderer) === "function" && _f || Object, typeof (_g = typeof spreadsheet_state_1.SpreadsheetState !== "undefined" && spreadsheet_state_1.SpreadsheetState) === "function" && _g || Object, typeof (_h = typeof spreadsheet_store_1.SpreadsheetStore !== "undefined" && spreadsheet_store_1.SpreadsheetStore) === "function" && _h || Object, typeof (_j = typeof services_1.CellManager !== "undefined" && services_1.CellManager) === "function" && _j || Object])
], SpreadsheetComponent);
exports.SpreadsheetComponent = SpreadsheetComponent;
var _a, _b, _c, _d, _e, _f, _g, _h, _j;


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(141));


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var StatusBarComponent = (function () {
    function StatusBarComponent(cdr) {
        this.cdr = cdr;
        this.message = '';
        this.isVisible = false;
    }
    StatusBarComponent.prototype.ngOnInit = function () { };
    StatusBarComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.message == null || this.message == '') {
            this.isVisible = false;
        }
        else {
            this.isVisible = true;
        }
        clearTimeout(this.timeoutId);
        if (this.isVisible) {
            if (this.timeout != null) {
                this.timeoutId = setTimeout(function () {
                    _this.isVisible = false;
                    _this.cdr.markForCheck();
                }, this.timeout);
            }
        }
    };
    return StatusBarComponent;
}());
__decorate([
    core_1.Input('message'),
    __metadata("design:type", Object)
], StatusBarComponent.prototype, "message", void 0);
__decorate([
    core_1.Input('timeout'),
    __metadata("design:type", Number)
], StatusBarComponent.prototype, "timeout", void 0);
__decorate([
    core_1.Input('count'),
    __metadata("design:type", Number)
], StatusBarComponent.prototype, "count", void 0);
StatusBarComponent = __decorate([
    core_1.Component({
        selector: 'StatusBar',
        template: __webpack_require__(64),
        styles: [__webpack_require__(63)],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.ChangeDetectorRef !== "undefined" && core_1.ChangeDetectorRef) === "function" && _a || Object])
], StatusBarComponent);
exports.StatusBarComponent = StatusBarComponent;
var _a;


/***/ }),
/* 142 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_142__;

/***/ }),
/* 143 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_143__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=ng-spreadsheet.js.map