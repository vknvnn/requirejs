require.config({
    baseUrl: "/",

    // alias libraries paths.  Must set 'angular'
    paths: {
        //register js
        'jquery': 'scripts/jquery/jquery-2.1.4.min',
        'angular': 'scripts/angularjs/angular.min',
        'angular-route': 'scripts/angularjs/angular-route.min',
        'angular-resource': 'scripts/angularjs/angular-resource.min',
        'angular-local-storage': 'scripts/angularjs/angular-local-storage.min',
        'angularAMD': 'scripts/angular.amd/angularAMD.min',
        'ngload': 'scripts/angular.amd/ngload.min',
        'ui-grid-js': 'scripts/ui-grid/ui-grid.min',
        //3rd party angularjs module
        'ui-bootstrap': 'scripts/bootstrap/bootstrap.min',
        'pace-loading': 'scripts/pace/pace.min',
        'loading-bar': 'scripts/loading-bar/loading-bar.min',
        //Register Factory
        'factory_issue': 'apps/factories/issueFactory',
        'factory_auth': 'apps/factories/authFactory',
        'factory_tokensManager': 'apps/factories/tokensManagerFactory',
        'factory_authInterceptor': 'apps/factories/authInterceptorFactory',

        //Register constant
        'constant_actionState': 'apps/contansts/actionState',
        'constant_ngAuthSettings': 'apps/contansts/ngAuthSettings',
        //Register value
        'value_entity': 'apps/values/entityValue',

        //Register directive
        'directive_table': 'apps/directives/issue/tableDirective',
        'directive_saveIssue': 'apps/directives/issue/saveIssueDirective',

        //Register controller
        'controller_login': 'apps/controllers/login/loginController',
        'controller_home': 'apps/controllers/home/homeController',
        'controller_about': 'apps/controllers/about/aboutController',

        //register application
        'app': 'apps/app'
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        
        'angular': {
             deps: ['jquery'],
        },
        'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'angular-local-storage': ['angular'],
        'ngload': ['angularAMD'],
        'ui-bootstrap': ['jquery'],
        'loading-bar': ['angular'],
    },

    // kick start application
    deps: ['app']
});