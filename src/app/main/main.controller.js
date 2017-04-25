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
    form.email = form.email || {};
    form.phone = form.phone || {};

    const data = {
      email: form.email.$viewValue,
      phone: form.phone.$viewValue
    };

    this.$http.post(this.CONSTANT.API_URL + '/feedback', data).then(response => {
      form.email.$viewValue = '';
      form.phone.$viewValue = '';
      this.toaster.pop('success', 'Ура!', 'Мы получили ваши данные');
    }, error => {
      console.log(error);
      this.toaster.pop('error', 'Ошибка доставки', 'Обратитесь пожалуйста в поддержку');
    }).finally(() => {
    });
  }
}
