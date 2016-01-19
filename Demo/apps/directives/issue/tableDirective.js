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
               

            },

            controller: function ($scope) {

                $scope.updateAct = function (id) {
                    entity.Id = id;
                    $scope.$parent.setAction(actionState.Update);
                    
                };

                $scope.deleteAct = function (id) {
                    if (confirm("Do you want to delete this item?")) {
                        $scope.$parent.setAction(actionState.Delete);
                        issueFactory.delete({ id: id }, function () {
                            $scope.$parent.setAction(actionState.Refresh);
                        });

                    }
                };

                $scope.$watch('action', function (nVal, oVal) {
                    if (nVal == actionState.Refresh) {
                        $scope.defaultValue();
                        $scope.getFirstData();
                        $scope.$parent.setAction(actionState.Add);
                    }
                });

                $scope.gridOptions = {
                    appScopeProvider: $scope,
                    infiniteScrollRowsFromEnd: 20,
                    infiniteScrollUp: false,
                    infiniteScrollDown: true,
                    columnDefs: [
                      { name: 'Id' },
                      { name: 'Name' },
                      { name: ' ', cellTemplate: '<a href="javascript:void(0);" ng-click="grid.appScope.updateAct(row.entity.Id)">Update</a> | <a href="javascript:void(0);" ng-click="grid.appScope.deleteAct(row.entity.Id)">Delete</a>' }
                    ],
                    data: 'data',
                    onRegisterApi: function (gridApi) {
                        gridApi.infiniteScroll.on.needLoadMoreData($scope, $scope.getDataDown);
                        gridApi.infiniteScroll.on.needLoadMoreDataTop($scope, function() {
                            gridApi.infiniteScroll.dataLoaded();
                        });
                        $scope.gridApi = gridApi;
                    }
                };

                $scope.getLink = function (skip, top) {
                    return 'http://localhost:52726/odata/issues?$count=true&$skip=' + skip + '&top=' + top;
                }

                
                $scope.data = [];

                $scope.total = 0;
                $scope.skip = 0;
                $scope.top = 20;
                $scope.prelink = '';
                $scope.curlink = $scope.getLink($scope.skip, $scope.top);
                $scope.nextlink = '';

                $scope.defaultValue = function () {
                    $scope.data = [];

                    $scope.total = 0;
                    $scope.skip = 0;
                    $scope.top = 20;
                    $scope.prelink = '';
                    $scope.curlink = $scope.getLink($scope.skip, $scope.top);
                    $scope.nextlink = '';

                }


                $scope.getFirstData = function () {
                    var promise = $q.defer();
                    $http.get($scope.curlink)
                    .success(function (data) {
                        $scope.total = parseInt(data["@odata.count"]);
                        $scope.skip += $scope.top;
                        $scope.nextlink = $scope.getLink($scope.skip, $scope.top);
                        $scope.data = $scope.data.concat(data.value);
                        promise.resolve();
                    });
                    return promise.promise;
                };

                $scope.getDataDown = function () {
                    var promise = $q.defer();
                    $http.get($scope.nextlink)
                    .success(function (data) {
                        $scope.total = parseInt(data["@odata.count"]);
                        $scope.skip += $scope.top;
                        $scope.prelink = $scope.curlink;
                        $scope.curlink = $scope.nextlink;
                        $scope.nextlink = $scope.getLink($scope.skip, $scope.top);
                        $scope.gridApi.infiniteScroll.saveScrollPercentage();
                        $scope.data = $scope.data.concat(data.value);
                        $scope.gridApi.infiniteScroll.dataLoaded($scope.skip > 0, $scope.skip < $scope.total).then(function () { }).then(function () {
                            promise.resolve();
                        });
                        
                    })
                    .error(function (error) {
                        $scope.gridApi.infiniteScroll.dataLoaded();
                        promise.reject();
                    });
                    return promise.promise;
                };
                
                $scope.checkDataLength = function (discardDirection) {
                    // work out whether we need to discard a page, if so discard from the direction passed in
                    console.log($scope.skip, $scope.total);
                    if ($scope.skip >= $scope.total) {
                        // we want to remove a page
                        $scope.gridApi.infiniteScroll.saveScrollPercentage();

                        if (discardDirection === 'up') {
                            $scope.data = $scope.data.slice(100);
                            $scope.firstPage++;
                            $timeout(function () {
                                // wait for grid to ingest data changes
                                $scope.gridApi.infiniteScroll.dataRemovedTop($scope.skip >= 0, $scope.skip < $scope.total);
                            });
                        } else {
                            $scope.data = $scope.data.slice(0, 400);
                            $scope.lastPage--;
                            $timeout(function () {
                                // wait for grid to ingest data changes
                                $scope.gridApi.infiniteScroll.dataRemovedBottom($scope.skip > 0, $scope.skip < $scope.total);
                            });
                        }
                    }
                };

                $scope.getFirstData();

            }
            
        }
    }]);
});
