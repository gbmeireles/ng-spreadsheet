System.register(['./Components/Components', './Model/Model', './Model/CustomComponent/CustomComponent', './Services/Services'], function(exports_1) {
    var Components_1;
    var exportedNames_1 = {
        'GridComponent': true,
        'GG_COMPONENTS': true,
        'GRID_SCOPE_SERVICES': true
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
            function (Components_1_1) {
                Components_1 = Components_1_1;
                exports_1({
                    "GG_COMPONENTS": Components_1_1["GG_COMPONENTS"]
                });
            },
            function (Model_1_1) {
                exportStar_1(Model_1_1);
            },
            function (CustomComponent_1_1) {
                exportStar_1(CustomComponent_1_1);
            },
            function (Services_1_1) {
                exports_1({
                    "GRID_SCOPE_SERVICES": Services_1_1["GRID_SCOPE_SERVICES"]
                });
            }],
        execute: function() {
            exports_1("GridComponent", Components_1.GridComponent);
        }
    }
});
//# sourceMappingURL=index.js.map