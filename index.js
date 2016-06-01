System.register(['./src/Components/Components', './src/Model/Model', './src/Model/CustomComponent/CustomComponent'], function(exports_1) {
    var exportedNames_1 = {
        'GridComponent': true
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
                exports_1({
                    "GridComponent": Components_1_1["GridComponent"]
                });
            },
            function (Model_1_1) {
                exportStar_1(Model_1_1);
            },
            function (CustomComponent_1_1) {
                exportStar_1(CustomComponent_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=index.js.map