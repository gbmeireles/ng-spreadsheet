"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var DataGridRowListGetter_1 = require('./DataGridRowListGetter');
exports.DataGridRowListGetter = DataGridRowListGetter_1.DataGridRowListGetter;
var ColumnListGetter_1 = require('./ColumnListGetter');
exports.ColumnListGetter = ColumnListGetter_1.ColumnListGetter;
var GridRowspanSetter_1 = require('./GridRowspanSetter');
exports.GridRowspanSetter = GridRowspanSetter_1.GridRowspanSetter;
var TitleGridRowListGetter_1 = require('./TitleGridRowListGetter');
exports.TitleGridRowListGetter = TitleGridRowListGetter_1.TitleGridRowListGetter;
var ColumnPositionInformationMapCalculator_1 = require('./ColumnPositionInformationMapCalculator');
exports.ColumnPositionInformationMapCalculator = ColumnPositionInformationMapCalculator_1.ColumnPositionInformationMapCalculator;
var CellPositionUpdater_1 = require('./CellPositionUpdater');
exports.CellPositionUpdater = CellPositionUpdater_1.CellPositionUpdater;
var SectionPositionInformationMapCalculator_1 = require('./SectionPositionInformationMapCalculator');
exports.SectionPositionInformationMapCalculator = SectionPositionInformationMapCalculator_1.SectionPositionInformationMapCalculator;
var ColumnViewportUpdater_1 = require('./ColumnViewportUpdater');
exports.ColumnViewportUpdater = ColumnViewportUpdater_1.ColumnViewportUpdater;
var RowViewportUpdater_1 = require('./RowViewportUpdater');
exports.RowViewportUpdater = RowViewportUpdater_1.RowViewportUpdater;
var ColumnPositionInformationMapUpdater_1 = require('./ColumnPositionInformationMapUpdater');
exports.ColumnPositionInformationMapUpdater = ColumnPositionInformationMapUpdater_1.ColumnPositionInformationMapUpdater;
var SectionPositionInformationMapUpdater_1 = require('./SectionPositionInformationMapUpdater');
exports.SectionPositionInformationMapUpdater = SectionPositionInformationMapUpdater_1.SectionPositionInformationMapUpdater;
var RowViewportVisibleRowCountGetter_1 = require('./RowViewportVisibleRowCountGetter');
exports.RowViewportVisibleRowCountGetter = RowViewportVisibleRowCountGetter_1.RowViewportVisibleRowCountGetter;
var GridColumnListGetter_1 = require('./GridColumnListGetter');
exports.GridColumnListGetter = GridColumnListGetter_1.GridColumnListGetter;
var ActiveCellGetter_1 = require('./ActiveCellGetter');
exports.ActiveCellGetter = ActiveCellGetter_1.ActiveCellGetter;
var GridSectionListGetter_1 = require('./GridSectionListGetter');
exports.GridSectionListGetter = GridSectionListGetter_1.GridSectionListGetter;
var CellNavigator_1 = require('./CellNavigator');
exports.CellNavigator = CellNavigator_1.CellNavigator;
var ColumnToRenderIndexListGetter_1 = require('./ColumnToRenderIndexListGetter');
exports.ColumnToRenderIndexListGetter = ColumnToRenderIndexListGetter_1.ColumnToRenderIndexListGetter;
var RowToRenderIndexListGetter_1 = require('./RowToRenderIndexListGetter');
exports.RowToRenderIndexListGetter = RowToRenderIndexListGetter_1.RowToRenderIndexListGetter;
__export(require('./Managers/Managers'));
var Managers = require('./Managers/Managers');
exports.GRID_SCOPE_SERVICES = Managers.MANAGERS.concat([
    ActiveCellGetter_1.ActiveCellGetter,
    ColumnPositionInformationMapCalculator_1.ColumnPositionInformationMapCalculator,
    DataGridRowListGetter_1.DataGridRowListGetter,
    ColumnListGetter_1.ColumnListGetter,
    GridRowspanSetter_1.GridRowspanSetter,
    GridSectionListGetter_1.GridSectionListGetter,
    TitleGridRowListGetter_1.TitleGridRowListGetter,
    CellPositionUpdater_1.CellPositionUpdater,
    SectionPositionInformationMapCalculator_1.SectionPositionInformationMapCalculator,
    ColumnViewportUpdater_1.ColumnViewportUpdater,
    RowViewportUpdater_1.RowViewportUpdater,
    ColumnPositionInformationMapUpdater_1.ColumnPositionInformationMapUpdater,
    SectionPositionInformationMapUpdater_1.SectionPositionInformationMapUpdater,
    RowViewportVisibleRowCountGetter_1.RowViewportVisibleRowCountGetter,
    GridColumnListGetter_1.GridColumnListGetter,
    RowToRenderIndexListGetter_1.RowToRenderIndexListGetter,
    CellNavigator_1.CellNavigator,
    ColumnToRenderIndexListGetter_1.ColumnToRenderIndexListGetter,
]);
//# sourceMappingURL=Services.js.map