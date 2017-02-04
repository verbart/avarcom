export default function (CONSTANT, $http, $q) {
    return {
        require: 'ngModel',
        link: function ($scope, element, attrs, model) {
            let commissioner = {};

            model.$asyncValidators.existCommissioner = function (modelValue, viewValue) {
                const userInput = modelValue || viewValue;

                return $http.get(CONSTANT.API_URL + '/users').then(response => {
                    commissioner = response.data.find(e => e.id == userInput);
                    return commissioner ? true : $q.reject(404);
                }, error => {
                    return $q.reject(error.status);
                });
            };
        }
    }
}
