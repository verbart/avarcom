export default class {
  constructor($uibModal, $http, toaster, CONSTANT) {
    this.$uibModal = $uibModal;
    this.$http = $http;
    this.CONSTANT = CONSTANT;
    this.toaster = toaster;
  }

  openCallbackModal() {
    this.$uibModal.open({
      component: 'callbackModal',
      size: 'xs',
      resolve: {}
    }).result.then(form => {
      this.submitFeedback(form);
    }, () => {
      console.info('modal-component dismissed at: ' + new Date());
    });
  }
  openPrivacyPolicy() {
    this.$uibModal.open({
      component: 'privacyPolicyModal',
      size: 'md',
      resolve: {}
    }).result.then(() => {

    }, () => {
      console.info('modal-component dismissed at: ' + new Date());
    });
  }
  interacted(field) {
    return this.submitted || field.$dirty;
  }
  submitFeedback(form) {
    const data = form.$$controls.reduce((result, item) => {
      result[item.$name] = item.$modelValue;
      return result;
    }, {});

    data.site = 'avarkom.bitrix24.ru';

    this.$http.post(this.CONSTANT.API_URL + '/feedback', data).then(response => {
      angular.element(form.$$element).trigger('reset');
      form.$setPristine();
      this.toaster.pop('success', 'Ура! Мы получили ваши данные');
    }, error => {
      console.log(error);
      this.toaster.pop('error', 'Ошибка доставки! Обратитесь пожалуйста в поддержку');
    });
  }
}
