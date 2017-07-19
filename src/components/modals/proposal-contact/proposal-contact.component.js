export default {
  templateUrl: 'views/components/modals/proposal-contact/proposal-contact.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function ($http, $stateParams, toaster, CONSTANT) {
    this.sendForm = (form) => {
      const data = form.$$controls.reduce((result, item) => {
        result[item.$name] = item.$modelValue || '';
        return result;
      }, {});

      angular.extend(data, this.resolve.accident);
      data.created = new Date().getTime();

      console.log($stateParams.token.length, '665AHD777JH37BB735141E346EEW'.length);
      $http.post(
        `${CONSTANT.API_URL_V2}/partners`,
        data,
        {
          headers: {
            token: '665AHD777JH37BB735141E346EEW'
          }
        }
      )
        .then(response => {
          this.close({$value: form});
        }, error => {
          console.log(error);
          toaster.error('Произошла ошибка! Пожалуйста, сообщите нам о ней')
        });
    };

    this.cancel = () => {
      this.dismiss({$value: false});
    };

    this.interacted = (field) => {
      return this.submitted || field.$dirty;
    };
  }
};
