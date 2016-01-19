define(['angularAMD', 'angular-resource'], function (angularAMD) {
    angularAMD.factory('issueFactory', ['$resource',
        function ($resource) {
            var odataUrl = 'http://localhost:52726/odata/issues';
            return $resource("", {},
            {
                'query': { method: "GET", url: odataUrl },
                'save': {
                    method: "POST",
                    url: odataUrl
                    //url: odataUrl, transformRequest: function (data, headersGetter) {
                    //    var formData = new FormData();
                    //    //need to convert our json object to a string version of json otherwise
                    //    // the browser will do a 'toString()' on the object which will result 
                    //    // in the value '[Object object]' on the server.
                    //    formData.append("model", angular.toJson(data.model));
                    //    //now add all of the assigned files
                    //    for (var i = 0; i < data.files; i++) {
                    //        //add each file to the form data and iteratively name them
                    //        formData.append("file" + i, data.files[i]);
                    //    }
                    //    console.log(data);
                    //    return formData;
                        
                    //}, headers: { 'Content-Type': undefined }
                },
                'update': { method: 'PUT', params: { id: "@id" }, url: odataUrl + "(:id)" },
                'get': { method: 'GET', params: { id: "@id" }, url: odataUrl + "(:id)" },
                'delete': { method: 'DELETE', params: { id: "@id" }, url: odataUrl + "(:id)" }
            });
        }
    ]);
});