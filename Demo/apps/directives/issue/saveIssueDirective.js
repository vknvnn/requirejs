define(['angularAMD', 'factory_issue', 'constant_actionState' , 'value_entity'], function (angularAMD) {
    angularAMD.directive('saveIssueDir', ['issueFactory', '$timeout', 'actionState', 'entity', function (issueFactory, $timeout, actionState, entity) {
        return {
            restrict: "E",
            scope: {
                action: "=",
            },
            templateUrl: function (element, attrs) {
                return 'apps/directives/issue/saveIssueDirective.html';
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
                        scope.action = actionState.Refresh;
                    });
                    
                };
                scope.addDir = function () {
                    issueFactory.save(scope.issueData, function () {
                        scope.action = actionState.Refresh;
                        scope.issueData = new issueViewModel();
                    });
                };

                scope.clearDir = function () {
                    scope.action = actionState.Add;
                };

                scope.$watch('action', function (nVal, oVal) {
                    if (nVal == actionState.Update) {
                        scope.issueData = issueFactory.get({ id: entity.Id });
                        scope.action = actionState.Updating;
                    }
                });
            },
        }
    }]);
});
