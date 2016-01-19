define(['angularAMD'], function(angularAMD) {
    'use strict';
    angularAMD.factory('authInterceptorService', [
        '$q', '$injector', '$location', 'localStorageService', function ($q, $injector, $location, localStorageService) {

            var authInterceptorServiceFactory = {};

            var _request = function(config) {
                config.headers = config.headers || {};
                
                var authData = localStorageService.get('authorizationData');
                if (authData) {
                    config.headers.Authorization = 'Bearer ' + authData.token;
                    //.headers["Content-Type"] = false;
                }
                //$http.defaults.useXDomain = true;
                //delete $http.defaults.headers.common['X-Requested-With'];
                //console.log(config.headers);
                return config;
            }

            var _responseError = function(rejection) {
                if (rejection.status === 401) {
                    var authService = $injector.get('authService');
                    var authData = localStorageService.get('authorizationData');

                    if (authData) {
                        if (authData.useRefreshTokens) {
                            $location.path('/refresh');
                            return $q.reject(rejection);
                        }
                    }
                    authService.logOut();
                    $location.path('/login');
                }
                return $q.reject(rejection);
            }

            authInterceptorServiceFactory.request = _request;
            authInterceptorServiceFactory.responseError = _responseError;

            return authInterceptorServiceFactory;
        }
    ]);
});