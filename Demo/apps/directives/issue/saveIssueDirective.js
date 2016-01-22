define(['angularAMD', 'factory_issue', 'constant_actionState', 'value_entity', 'fileModel', 'angular-file-upload', 'kendo-core'], function (angularAMD) {
    angularAMD.processQueue();
    angularAMD.directive('saveIssueDir', ['issueFactory', '$timeout', 'actionState', 'entity', '$upload', '$http', function (issueFactory, $timeout, actionState, entity, $upload, $http) {
        return {
            restrict: "E",
            scope: {
                action: "=",
                objData:'='
            },
            templateUrl: function (element, attrs) {
                return attrs.templteUrl;
            },
            link: function (scope, element, attrs) {
                function issueViewModel() {
                    var self = this;
                    self.Id = 0;
                    self.Name = "";
                    self.SelectId = "500";
                }

               
                scope.issueData = new issueViewModel();
                scope.$watch('issueData.SelectId', function (nVal, oVal) {
                    //if (parseInt(nVal) != parseInt(oVal)) {
                    //    scope.issueData.SelectId = parseInt(nVal);
                    //}
                    console.log(nVal, oVal);
                });
                scope.updateDir = function () {
                    issueFactory.update({ id: entity.Id }, scope.issueData, function() {
                        scope.$parent.setAction(actionState.Refresh);
                    });
                    
                };
                scope.addDir = function () {
                    
                        scope.fileUploadObj = { testString1: "Test string 1", testString2: "Test string 2" };
                        $upload.upload({
                                url: 'http://localhost:52726/api/upload',
                                data: { fileUploadObj: scope.fileUploadObj },
                                file: scope.file,
                                method: "POST",
                        }).progress(function (evt) {
                            // get upload percentage
                            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                        }).success(function (data, status, headers, config) {
                            // file is uploaded successfully
                            console.log(data);
                        }).error(function (data, status, headers, config) {
                            // file failed to upload
                            console.log(data);
                        });
                    
                    //issueFactory.save(scope.issueData, function () {
                    //    scope.$parent.setAction(actionState.Refresh);
                    //    scope.issueData = new issueViewModel();
                    //});
                };

                scope.clearDir = function () {
                    //scope.$parent.setAction(actionState.Add);
                    
                    $timeout(function () {
                        scope.$apply(function() {scope.issueData.SelectId = '520';});
                    });

                };
                
                scope.$watch('action', function (nVal, oVal) {
                    if (nVal == actionState.Update) {
                        scope.issueData = issueFactory.get({ id: entity.Id });
                        scope.$parent.setAction(actionState.Updating);
                    }
                });
                scope.getLink = function (options) {
                    var filterString = '';
                    if (options.data.filter != undefined && options.data.filter.filters.length > 0) {

                        filterString = "&$filter=contains(" + options.data.filter.filters[0].field + ",'" + options.data.filter.filters[0].value + "')";
                    }
                    return 'http://localhost:52726/odata/issues?$count=true&$skip=' + options.data.skip + '&top=' + options.data.take + filterString;
                }
                scope.total = 0;
                scope.dataSource = new kendo.data.DataSource({
                    transport: {
                        type: "odata",
                        read: function (options) {
                            
                            $http.get(scope.getLink(options))
                                .success(function (data) {
                                    scope.total = data['@odata.count'];
                                    options.success(data.value);
                                
                            });
                        },
                    },
                    schema: {
                        model: {
                            fields: {
                                Id: { type: 'number' },
                                Name: {type: 'string'}
                            }
                        },
                        total: function (response) {
                            return scope.total;
                        }
                    },
                    pageSize: 20,
                    serverPaging: true,
                    serverFiltering: true,
                });

                scope.options = {
                    dataTextField: "Name",
                    dataValueField: "Id",
                    filter: "contains",
                    value: scope.issueData.SelectId,
                    virtual: {
                        itemHeight: 26,
                        valueMapper: function (options) {
                            options.success([options.value - 1]);
                        }
                    },
                    height: 130,
                    dataSource: scope.dataSource,
                    change: function(e) {
                        console.log(e);
                    }
                };

            },
        }
    }]);
});
