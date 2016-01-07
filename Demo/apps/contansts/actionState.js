define(['angularAMD'], function (angularAMD) {
    angularAMD.constant('actionState', {
        None: 0,
        Add: 1,
        Adding: 2,
        Update: 3,
        Updating: 4,
        Delete: 5,
        Deleting: 6,
        Refresh: 7,
    });
});
