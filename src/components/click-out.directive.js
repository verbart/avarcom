export default function ($window, $parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            const clickOutHandler = $parse(attrs.clickOut);

            angular.element($window).on('click', function (event) {
                if (element[0].contains(event.target)) return;
                clickOutHandler(scope, {$event: event});
                scope.$apply();
            });
        }
    };
}
