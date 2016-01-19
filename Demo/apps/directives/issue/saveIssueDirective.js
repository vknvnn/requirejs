define(['angularAMD', 'factory_issue', 'constant_actionState', 'value_entity', 'fileModel', 'angular-file-upload'], function (angularAMD) {
    angularAMD.processQueue();
    angularAMD.directive('saveIssueDir', ['issueFactory', '$timeout', 'actionState', 'entity', '$upload', function (issueFactory, $timeout, actionState, entity, $upload) {
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
                }

                scope.issueData = new issueViewModel();
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
                    scope.$parent.setAction(actionState.Add);
                };
                
                scope.$watch('action', function (nVal, oVal) {
                    if (nVal == actionState.Update) {
                        scope.issueData = issueFactory.get({ id: entity.Id });
                        scope.$parent.setAction(actionState.Updating);
                    }
                });
            },
        }
    }]);
});
