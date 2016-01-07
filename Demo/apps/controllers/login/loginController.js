define(['angularAMD'], function (angularAMD) {
    angularAMD.controller('loginController', ['$scope', 'authService', '$location', function ($scope, authService, $location) {
        $scope.message = "Message from login controller";
        $scope.loginData = {
            userName: "",
            password: "",
            useRefreshTokens: true
        };

        $scope.login = function () {
            authService.login($scope.loginData).then(function (response) {
                $location.path('/home');
            },
             function (err) {
                 if (err != null) {
                     alert(err.error_description);
                 }
                 
             });
        };
    }]);
});