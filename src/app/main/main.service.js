export default class {
  constructor($http, CONSTANT) {
    this.$http = $http;
    this.CONSTANT = CONSTANT;
  }

  submitFeedback(form) {
    const data = {
      site: 'avarkom.bitrix24.ru',
      title: form.email ? 'Заявка на демодоступ c первого экрана' : 'Запрос на обратный звонок',
      email: form.email,
      phone: form.phone
    };

    return this.$http.post(this.CONSTANT.API_URL + '/feedback', data);
  }
}
