define(['angularAMD', 'ui-bootstrap', 'ui-calendar', 'directive_modal'], function (angularAMD) {
    angularAMD.processQueue();
    angularAMD.controller('aboutController', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
        $scope.message = "Message from about controller";

        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            defaultDate: (new Date()).toISOString().slice(0, 10),
            slotDuration: '00:15:00',
            axisFormat: 'HH:mm',
            defaultView: 'agendaWeek',
            timezone: 'UTC',
            selectable: true,
            selectHelper: true,
            select: function (start, end) {
                $timeout(function() {$scope.$apply(function() {$scope.showModal1 = true;});});

                //var title = prompt('Event Title:');
                //var eventData;
                //if (title) {
                //    eventData = {
                //        title: title,
                //        start: start,
                //        end: end
                //    };
                //    $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
                //}
                //$('#calendar').fullCalendar('unselect');
            },
            eventClick: function(calEvent, jsEvent, view) {

                console.log('Event: ',calEvent);
                console.log('Coordinates: ',jsEvent);
                console.log('View: ', view);

                // change the border color just for fun
                //$(this).css('border-color', 'red');
                //var eventData = {
                //    title: 'This is a test',
                //    start: '2016-01-12T01:00',
                //    end: '2016-01-12T02:00'
                //};
                //$('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
                $timeout(function () { $scope.$apply(function () { $scope.showModal1 = true; }); });
                //$scope.showModal1 = true;

            },
            eventRender: function (event, element) {
                element.find('.fc-content').attr("title", event.title);
            },
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: function (start, end, timezone, callback) {
                console.log(start._d.toISOString(), end._d.toISOString());
                $http.get('http://localhost:52726/odata/calendars/vms.getstartend(start='+ start._d.toISOString() + ',end='+end._d.toISOString()+')')
                 .success(function (data) {
                     var events = [];
                     for (var i = 0; i < data.value.length; i++) {
                         events.push({
                             id: data.value[i].Id,
                             title: data.value[i].Title,
                             start: data.value[i].Start,
                             end: data.value[i].End,
                         });
                     }
                     callback(events);
                });
            }
            //eventColor: '#378006'

        });

        $scope.showModal1 = false;
        $scope.showModal2 = false;

        $scope.hide = function (m) {
            if (m === 1) {
                $scope.showModal1 = false;
            } else {
                $scope.showModal2 = false;
            }
        }
        $scope.show = function (m) {
            if (m === 1) {
                $scope.showModal1 = true;
            } else {
                $scope.showModal2 = true;
            }
        }

        $scope.modalOneShown = function () {
            console.log('model one shown');
        }

        $scope.modalOneHide = function () {
            console.log('model one hidden');
        }
        
    }]);
});