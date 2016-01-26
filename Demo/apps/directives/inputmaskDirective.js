define(['angularAMD', 'factory_issue', 'constant_actionState', 'value_entity', 'ui-grid-js'], function (angularAMD) {
    angularAMD.processQueue();
    angularAMD.directive('inputMask', function(){
        return {
            restrict: 'A',
            link: function(scope, el, attrs){
                $(el).inputmask(scope.$eval(attrs.inputMask));
            }
        };
    });
});
