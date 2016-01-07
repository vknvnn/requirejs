define(['angularAMD', 'angular-route', 'angular-local-storage', 'factory_authInterceptor', 'factory_auth'], function (angularAMD) {
    var app = angular.module("webapp", ['ngRoute', 'LocalStorageModule']);

    app.config(function ($routeProvider) {
        $routeProvider
        .when("/login", angularAMD.route({
            templateUrl: 'views/login/login.html', controller: 'loginController', controllerUrl: 'controller_login'
        }))
        .when("/home", angularAMD.route({
            templateUrl: 'views/home/home.html', controller: 'homeController', controllerUrl: 'controller_home'
        }))
        .when("/about", angularAMD.route({
            templateUrl: 'views/about/about.html', controller: 'aboutController', controllerUrl: 'controller_about'
        }))
        .otherwise({ redirectTo: "/login" });
    });
    
    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    });

    app.run(['authService', function (authService) {
        authService.fillAuthData();
    }]);

    return angularAMD.bootstrap(app);
});