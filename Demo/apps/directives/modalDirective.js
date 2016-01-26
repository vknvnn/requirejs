define(['angularAMD', 'factory_issue', 'constant_actionState', 'value_entity', 'ui-grid-js'], function (angularAMD) {
    angularAMD.processQueue();
    angularAMD.directive('modalDirective', [function () {
            return {
                restrict: 'E',
                transclude: true,
                replace: true,
                scope: { visible: '=', onSown: '&', onHide: '&' },
                template: function (element, attrs) {
                    return '<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true"><div class="modal-dialog modal-sm"><div class="modal-content" ng-transclude><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">Modal title</h4></div></div></div></div>';
                },
                link: function postLink(scope, element, attrs) {

                    $(element).modal({
                        show: false,
                        keyboard: attrs.keyboard,
                        backdrop: attrs.backdrop
                    });

                    scope.$watch(function () { return scope.visible; }, function (value) {

                        if (value == true) {
                            $(element).modal('show');
                        } else {
                            $(element).modal('hide');
                        }
                    });

                    $(element).on('shown.bs.modal', function () {
                        scope.$apply(function () {
                            scope.$parent[attrs.visible] = true;
                        });
                    });

                    $(element).on('shown.bs.modal', function () {
                        scope.$apply(function () {
                            scope.onSown({});
                        });
                    });

                    $(element).on('hidden.bs.modal', function () {
                        scope.$apply(function () {
                            scope.$parent[attrs.visible] = false;
                        });
                    });

                    $(element).on('hidden.bs.modal', function () {
                        scope.$apply(function () {
                            scope.onHide({});
                        });
                    });
                }
            }
    }]);
    angularAMD.directive('modalHeader', function () {
        return {
            template: '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">{{title}}</h4></div>',
            replace: true,
            restrict: 'E',
            scope: { title: '@' }
        };
    });
    angularAMD.directive('modalBody', function () {
        return {
            template: '<div class="modal-body" ng-transclude></div>',
            replace: true,
            restrict: 'E',
            transclude: true
        };
    });
    angularAMD.directive('modalFooter', function () {
        return {
            template: '<div class="modal-footer" ng-transclude></div>',
            replace: true,
            restrict: 'E',
            transclude: true
        };
    });

});
