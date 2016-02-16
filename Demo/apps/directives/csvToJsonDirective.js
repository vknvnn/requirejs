define(['angularAMD', 'factory_issue', 'constant_actionState', 'value_entity', 'papaparse'], function (angularAMD) {
    angularAMD.processQueue();
    angularAMD.directive('csvToJson', function () {
        return {
            restrict: "E",
            scope: {
                importComplete: "=",
            },
            template: function (element, attrs) {
                return '<input id="csv-to-json" type="file"/>';
            },
            link: function (scope, element, attrs) {
                var stepped = 0, rowCount = 0, errorCount = 0, firstError;
                var start, end;
                var resutlsComplete = null;


                var config = {
                    header: true,
                    complete: completeFn,
                    error: errorFn,
                };

                function completeFn(results) {
                    end = now();

                    if (results && results.errors) {
                        if (results.errors) {
                            errorCount = results.errors.length;
                            firstError = results.errors[0];
                        }
                        if (results.data && results.data.length > 0)
                            rowCount = results.data.length;
                    }
                    resutlsComplete = results;
                    
                }

                function errorFn(err, file) {
                    end = now();
                    console.error("ERROR:", err, file);
                }

                function printStats(msg) {
                    if (msg)
                        console.log(msg);
                    console.info("Process Time:", (end - start || "(Unknown; your browser does not support the Performance API)"), "ms", " Row count:", rowCount, " Errors:", errorCount);
                    if (stepped)
                        console.info("Stepped:", stepped);
                    if (errorCount)
                        console.info("First error:", firstError);
                }

                function now() {
                    return typeof window.performance !== 'undefined'
                            ? window.performance.now()
                            : 0;
                }

                scope.import = function() {
                    if (!$('#csv-to-json')[0].files.length) {
                        alert("Please choose at least one file to parse.");
                        return;
                    }
                    $('#csv-to-json').parse({
                        config: config,
                        before: function(file, inputElem) {
                            start = now();
                        },
                        error: function(err, file) {
                            console.error("ERROR:", err, file);
                            firstError = firstError || err;
                            errorCount++;
                        },
                        complete: function() {
                            end = now();
                            printStats();
                            scope.importComplete(resutlsComplete);
                        }
                    });
                };

                scope.$parent.csvParseJson = function () {
                    resutlsComplete = null;
                    scope.import();
                }
            },
        };
    });
});
