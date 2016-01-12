define(['angularAMD', 'factory_issue', 'constant_actionState', 'value_entity', 'ui-grid-js'], function (angularAMD) {
    angularAMD.processQueue();
    angularAMD.directive('tableDir', ['issueFactory', '$timeout', 'actionState', 'entity', '$q', '$http',
        function (issueFactory, $timeout, actionState, entity, $q, $http) {
        return {
            restrict: "E",
            scope: {
                action: "=",
            },
            template: function (element, attrs) {
                return '<div ui-grid="gridOptions" class="grid" ui-grid-infinite-scroll></div>';
            },
            link: function (scope, element, attrs) {
                //scope.tableData = [{ Id: 1, Name: "UI" }];
                scope.showTable = false;
                scope.$watch('action', function (nVal, oVal) {
                    if (nVal == actionState.Refresh) {
                        refresh();
                    }
                });
            },

            controller: function ($scope) {
                $scope.gridOptions = {
                    infiniteScrollRowsFromEnd: 40,
                    infiniteScrollUp: true,
                    infiniteScrollDown: true,
                    columnDefs: [
                      { name: 'Id' },
                      { name: 'Name' }
                    ],
                    data: 'data',
                    onRegisterApi: function (gridApi) {
                        gridApi.infiniteScroll.on.needLoadMoreData($scope, $scope.getDataDown);
                        gridApi.infiniteScroll.on.needLoadMoreDataTop($scope, $scope.getDataUp);
                        $scope.gridApi = gridApi;
                    }
                };

                $scope.data = [];

                $scope.firstPage = 5;
                $scope.lastPage = 2;

                $scope.getFirstData = function () {
                    var promise = $q.defer();
                    $http.get('http://localhost:52726/odata/issues')
                    .success(function (data) {
                        var newData = $scope.getPage(data.value, $scope.lastPage);
                        $scope.data = $scope.data.concat(newData);
                        promise.resolve();
                    });
                    return promise.promise;
                };

                $scope.getDataDown = function () {
                    var promise = $q.defer();
                    $http.get('http://localhost:52726/odata/issues')
                    .success(function (data) {
                        $scope.lastPage++;
                        var newData = $scope.getPage(data.value, $scope.lastPage);
                        $scope.gridApi.infiniteScroll.saveScrollPercentage();
                        $scope.data = $scope.data.concat(newData);
                        $scope.gridApi.infiniteScroll.dataLoaded($scope.firstPage > 0, $scope.lastPage < 10).then(function () { $scope.checkDataLength('up'); }).then(function () {
                            promise.resolve();
                        });
                    })
                    .error(function (error) {
                        $scope.gridApi.infiniteScroll.dataLoaded();
                        promise.reject();
                    });
                    return promise.promise;
                };

                $scope.getDataUp = function () {
                    var promise = $q.defer();
                    $http.get('http://localhost:52726/odata/issues')
                    .success(function (data) {
                        $scope.firstPage--;
                        var newData = $scope.getPage(data.value, $scope.firstPage);
                        $scope.gridApi.infiniteScroll.saveScrollPercentage();
                        $scope.data = newData.concat($scope.data);
                        $scope.gridApi.infiniteScroll.dataLoaded($scope.firstPage > 0, $scope.lastPage < 10).then(function () { $scope.checkDataLength('down'); }).then(function () {
                            promise.resolve();
                        });
                    })
                    .error(function (error) {
                        $scope.gridApi.infiniteScroll.dataLoaded();
                        promise.reject();
                    });
                    return promise.promise;
                };


                $scope.getPage = function (data, page) {
                    var res = [];
                    for (var i = (page * 100) ; i < (page + 1) * 100 && i < data.length; ++i) {
                        res.push(data[i]);
                    }
                    return res;
                };

                $scope.checkDataLength = function (discardDirection) {
                    // work out whether we need to discard a page, if so discard from the direction passed in
                    if ($scope.lastPage - $scope.firstPage > 9) {
                        // we want to remove a page
                        $scope.gridApi.infiniteScroll.saveScrollPercentage();

                        if (discardDirection === 'up') {
                            $scope.data = $scope.data.slice(100);
                            $scope.firstPage++;
                            $timeout(function () {
                                // wait for grid to ingest data changes
                                $scope.gridApi.infiniteScroll.dataRemovedTop($scope.firstPage > 0, $scope.lastPage < 10);
                            });
                        } else {
                            $scope.data = $scope.data.slice(0, 400);
                            $scope.lastPage--;
                            $timeout(function () {
                                // wait for grid to ingest data changes
                                $scope.gridApi.infiniteScroll.dataRemovedBottom($scope.firstPage > 0, $scope.lastPage < 10);
                            });
                        }
                    }
                };
                
                $scope.getFirstData().then(function () {
                    $timeout(function () {
                        // timeout needed to allow digest cycle to complete,and grid to finish ingesting the data
                        // you need to call resetData once you've loaded your data if you want to enable scroll up,
                        // it adjusts the scroll position down one pixel so that we can generate scroll up events
                        $scope.gridApi.infiniteScroll.resetScroll($scope.firstPage > 0, $scope.lastPage < 10);
                    });
                });
            }
            
        }
    }]);
});
