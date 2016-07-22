System.register(['./DataGridRowListGetter', './ColumnListGetter', './GridRowspanSetter', './TitleGridRowListGetter', './ColumnPositionInformationMapCalculator', './CellPositionUpdater', './SectionPositionInformationMapCalculator', './ColumnViewportUpdater', './RowViewportUpdater', './ColumnPositionInformationMapUpdater', './SectionPositionInformationMapUpdater', './RowViewportVisibleRowCountGetter', './GridColumnListGetter', './ActiveCellGetter', './GridSectionListGetter', './CellNavigator', './ColumnToRenderIndexListGetter', './RowToRenderIndexListGetter', './Managers/Managers'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var DataGridRowListGetter_1, ColumnListGetter_1, GridRowspanSetter_1, TitleGridRowListGetter_1, ColumnPositionInformationMapCalculator_1, CellPositionUpdater_1, SectionPositionInformationMapCalculator_1, ColumnViewportUpdater_1, RowViewportUpdater_1, ColumnPositionInformationMapUpdater_1, SectionPositionInformationMapUpdater_1, RowViewportVisibleRowCountGetter_1, GridColumnListGetter_1, ActiveCellGetter_1, GridSectionListGetter_1, CellNavigator_1, ColumnToRenderIndexListGetter_1, RowToRenderIndexListGetter_1, Managers;
    var GRID_SCOPE_SERVICES;
    var exportedNames_1 = {
        'GRID_SCOPE_SERVICES': true,
        'ActiveCellGetter': true,
        'ColumnPositionInformationMapCalculator': true,
        'DataGridRowListGetter': true,
        'ColumnListGetter': true,
        'GridRowspanSetter': true,
        'GridSectionListGetter': true,
        'TitleGridRowListGetter': true,
        'CellPositionUpdater': true,
        'SectionPositionInformationMapCalculator': true,
        'ColumnViewportUpdater': true,
        'RowViewportUpdater': true,
        'ColumnPositionInformationMapUpdater': true,
        'SectionPositionInformationMapUpdater': true,
        'RowViewportVisibleRowCountGetter': true,
        'GridColumnListGetter': true,
        'RowToRenderIndexListGetter': true,
        'CellNavigator': true,
        'ColumnToRenderIndexListGetter': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (DataGridRowListGetter_1_1) {
                DataGridRowListGetter_1 = DataGridRowListGetter_1_1;
            },
            function (ColumnListGetter_1_1) {
                ColumnListGetter_1 = ColumnListGetter_1_1;
            },
            function (GridRowspanSetter_1_1) {
                GridRowspanSetter_1 = GridRowspanSetter_1_1;
            },
            function (TitleGridRowListGetter_1_1) {
                TitleGridRowListGetter_1 = TitleGridRowListGetter_1_1;
            },
            function (ColumnPositionInformationMapCalculator_1_1) {
                ColumnPositionInformationMapCalculator_1 = ColumnPositionInformationMapCalculator_1_1;
            },
            function (CellPositionUpdater_1_1) {
                CellPositionUpdater_1 = CellPositionUpdater_1_1;
            },
            function (SectionPositionInformationMapCalculator_1_1) {
                SectionPositionInformationMapCalculator_1 = SectionPositionInformationMapCalculator_1_1;
            },
            function (ColumnViewportUpdater_1_1) {
                ColumnViewportUpdater_1 = ColumnViewportUpdater_1_1;
            },
            function (RowViewportUpdater_1_1) {
                RowViewportUpdater_1 = RowViewportUpdater_1_1;
            },
            function (ColumnPositionInformationMapUpdater_1_1) {
                ColumnPositionInformationMapUpdater_1 = ColumnPositionInformationMapUpdater_1_1;
            },
            function (SectionPositionInformationMapUpdater_1_1) {
                SectionPositionInformationMapUpdater_1 = SectionPositionInformationMapUpdater_1_1;
            },
            function (RowViewportVisibleRowCountGetter_1_1) {
                RowViewportVisibleRowCountGetter_1 = RowViewportVisibleRowCountGetter_1_1;
            },
            function (GridColumnListGetter_1_1) {
                GridColumnListGetter_1 = GridColumnListGetter_1_1;
            },
            function (ActiveCellGetter_1_1) {
                ActiveCellGetter_1 = ActiveCellGetter_1_1;
            },
            function (GridSectionListGetter_1_1) {
                GridSectionListGetter_1 = GridSectionListGetter_1_1;
            },
            function (CellNavigator_1_1) {
                CellNavigator_1 = CellNavigator_1_1;
            },
            function (ColumnToRenderIndexListGetter_1_1) {
                ColumnToRenderIndexListGetter_1 = ColumnToRenderIndexListGetter_1_1;
            },
            function (RowToRenderIndexListGetter_1_1) {
                RowToRenderIndexListGetter_1 = RowToRenderIndexListGetter_1_1;
            },
            function (Managers_1_1) {
                exportStar_1(Managers_1_1);
                Managers = Managers_1_1;
            }],
        execute: function() {
            exports_1("ActiveCellGetter", ActiveCellGetter_1.ActiveCellGetter);
            exports_1("ColumnPositionInformationMapCalculator", ColumnPositionInformationMapCalculator_1.ColumnPositionInformationMapCalculator);
            exports_1("DataGridRowListGetter", DataGridRowListGetter_1.DataGridRowListGetter);
            exports_1("ColumnListGetter", ColumnListGetter_1.ColumnListGetter);
            exports_1("GridRowspanSetter", GridRowspanSetter_1.GridRowspanSetter);
            exports_1("GridSectionListGetter", GridSectionListGetter_1.GridSectionListGetter);
            exports_1("TitleGridRowListGetter", TitleGridRowListGetter_1.TitleGridRowListGetter);
            exports_1("CellPositionUpdater", CellPositionUpdater_1.CellPositionUpdater);
            exports_1("SectionPositionInformationMapCalculator", SectionPositionInformationMapCalculator_1.SectionPositionInformationMapCalculator);
            exports_1("ColumnViewportUpdater", ColumnViewportUpdater_1.ColumnViewportUpdater);
            exports_1("RowViewportUpdater", RowViewportUpdater_1.RowViewportUpdater);
            exports_1("ColumnPositionInformationMapUpdater", ColumnPositionInformationMapUpdater_1.ColumnPositionInformationMapUpdater);
            exports_1("SectionPositionInformationMapUpdater", SectionPositionInformationMapUpdater_1.SectionPositionInformationMapUpdater);
            exports_1("RowViewportVisibleRowCountGetter", RowViewportVisibleRowCountGetter_1.RowViewportVisibleRowCountGetter);
            exports_1("GridColumnListGetter", GridColumnListGetter_1.GridColumnListGetter);
            exports_1("RowToRenderIndexListGetter", RowToRenderIndexListGetter_1.RowToRenderIndexListGetter);
            exports_1("CellNavigator", CellNavigator_1.CellNavigator);
            exports_1("ColumnToRenderIndexListGetter", ColumnToRenderIndexListGetter_1.ColumnToRenderIndexListGetter);
            exports_1("GRID_SCOPE_SERVICES", GRID_SCOPE_SERVICES = Managers.MANAGERS.concat([
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
            ]));
        }
    }
});
//# sourceMappingURL=Services.js.map