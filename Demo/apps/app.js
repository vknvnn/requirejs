define(['angularAMD', 'angular-route', 'angular-local-storage', 'factory_authInterceptor', 'factory_auth', 'loading-bar'], function (angularAMD) {
    var app = angular.module("webapp", ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'cfp.loadingBar']);

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
    app.config([
       'cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
           cfpLoadingBarProvider.includeSpinner = true;
           //cfpLoadingBarProvider.latencyThreshold = 500;
           //cfpLoadingBarProvider.spinnerTemplate = '<div class="pace pace-active"><div class="pace-progress" data-progress="50" data-progress-text="50%" style="-webkit-transform: translate3d(50%, 0px, 0px); -ms-transform: translate3d(50%, 0px, 0px); transform: translate3d(50%, 0px, 0px);"><div class="pace-progress-inner"></div></div><div class="pace-activity"></div></div>';
        }
    ]);
    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    });

   

    app.run(['authService', function (authService) {
        authService.fillAuthData();
    }]);

    return angularAMD.bootstrap(app);
});