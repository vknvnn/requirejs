define(['angularAMD', 'angular-resource'], function (angularAMD) {
    angularAMD.factory('issueFactory', ['$resource',
        function($resource) {
            return $resource('http://localhost:52726/api/issues/:id', { id: "@Id" }, {
                 "update": { method: "PUT" }
            });
        }
    ]);
});