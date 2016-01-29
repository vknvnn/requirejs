define(['angularAMD', 'datepicker'], function (angularAMD) {
    angularAMD.processQueue();
    angularAMD.directive('dateTimePicker', function () {
        return {
            require: '?ngModel',
            restrict: 'AE',
            scope: {
                pick12HourFormat: '@',
                language: '@',
                useCurrent: '@',
                location: '@'
            },
            link: function (scope, elem, attrs) {
                elem.datetimepicker({
                    //pick12HourFormat: scope.pick12HourFormat,
                    //language: scope.language,
                    //useCurrent: scope.useCurrent,
                    icons: {
                        time: 'fa fa-clock-o',
                        date: 'fa fa-calendar',
                        up: 'fa fa-chevron-up',
                        down: 'fa fa-chevron-down',
                        previous: 'fa fa-chevron-left',
                        next: 'fa fa-chevron-right',
                        today: 'fa fa-arrows',
                        clear: 'fa fa-calendar-times-o',
                        close: 'fa fa-times'
                    },
                    calendarWeeks: true,
                });

                //Local event change
                elem.on('blur', function() {

                    console.info('this', this);
                    console.info('scope', scope);
                    console.info('attrs', attrs);


                    /*// returns moments.js format object
                    scope.dateTime = new Date(elem.data("DateTimePicker").getDate().format());
                    // Global change propagation
                    $rootScope.$broadcast("emit:dateTimePicker", {
                        location: scope.location,
                        action: 'changed',
                        dateTime: scope.dateTime,
                        example: scope.useCurrent
                    });
                    scope.$apply();*/
                });
            }
        };
    });
});
