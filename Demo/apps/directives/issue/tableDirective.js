define(['angularAMD', 'factory_issue', 'constant_actionState', 'value_entity'], function (angularAMD) {
    angularAMD.directive('tableDir', ['issueFactory', '$timeout', 'actionState', 'entity', function (issueFactory, $timeout, actionState, entity) {
        return {
            restrict: "E",
            scope: {
                action: "=",
                deleteAct: '=',
            },
            template: function (element, attrs) {
                var cols = JSON.parse(attrs.cols);

                var html = '<table class="table table-bordered" ng-show="showTable">';
                
                if (cols != null && cols.length > 0) {
                    html += '<thead><tr>';
                    for (var i = 0; i < cols.length; i++) {
                        html += '<td>'+cols[i]+'</td>';
                    }
                    html += '</tr></thead>';
                    html += '<tbody>';
                    html += '<tr ng-repeat="obj in tableData">';
                    for (var j = 0; j < cols.length- 1; j++) {
                        html += '<td ng-bind="obj.' + cols[j] + '"></td>';
                    }
                    html += '<td><a href="javascript:void(0);" ng-click="updateAct(obj.Id)">Update</a> | <a href="javascript:void(0);" ng-click="deleteAct(obj.Id)">Delete</a></td>';
                    html += '</tr>';
                    html += '</tbody>';
                }
                html += '</table>';
                return html;
            },
            link: function (scope, element, attrs) {
                //scope.tableData = [{ Id: 1, Name: "UI" }];
                scope.showTable = false;
                scope.tableData = [];
                 function refresh() {
                     var entries = issueFactory.query(function () {
                         
                         if (entries != null && entries.value != null && entries.value.length > 0) {
                            scope.tableData = [];
                            
                            for (var i = 0; i < entries.value.length; i++) {
                                scope.tableData.push(entries.value[i]);
                            }
                        }
                        $timeout(function () {
                            scope.showTable = scope.tableData.length > 0;
                            scope.action = actionState.Add;
                            scope.$apply();
                        }, 200);

                    });
                }

                 refresh();

                scope.updateAct = function(id) {
                    scope.action = actionState.Update;
                    entity.Id = id;
                };

                scope.deleteAct = function(id) {
                    if (confirm("Do you want to delete this item?")) {
                        scope.action = actionState.Delete;
                        issueFactory.delete({ id: id }, function () {
                            refresh();
                        });
                        
                    }
                };

                scope.$watch('action', function (nVal, oVal) {
                    if (nVal == actionState.Refresh) {
                        refresh();
                    }
                });

            },
            
        }
    }]);
});
