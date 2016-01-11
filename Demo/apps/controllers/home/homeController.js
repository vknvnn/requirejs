define(['angularAMD', 'ui-bootstrap', 'value_entity', 'directive_table', 'directive_saveIssue', 'constant_actionState'], function (angularAMD) {
    angularAMD.controller('homeController', ['$scope', 'entity', 'actionState', 'authService', '$location', function ($scope, testValue, actionState, authService, $location) {
        $scope.message = "Application Name";
        $scope.action = actionState.Add;
        $scope.callBackSave = function (item) {
            console.log('zo', item);
        };
        $scope.logOut = function () {
            authService.logOut();
            $location.path('/login');
        };

    }]);
});

