define(['angularAMD', 'angular-resource'], function (angularAMD) {
    angularAMD.factory('issueFactory', ['$resource',
        function ($resource) {
            var odataUrl = 'http://localhost:52726/odata/issues';
            return $resource("", {},
            {
                'query': { method: "GET", url: odataUrl },
                'save': { method: "POST", url: odataUrl },
                'update': { method: 'PUT', params: { key: "@id" }, url: odataUrl + "(:id)" },
                'get': { method: 'GET', params: { key: "@id" }, url: odataUrl + "(:id)" },
                'delete': { method: 'DELETE', params: { key: "@id" }, url: odataUrl + "(:id)" }
            });
        }
    ]);
});