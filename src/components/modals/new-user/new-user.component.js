export default {
  templateUrl: 'views/components/modals/new-user/new-user.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function () {
    this.$onInit = () => {
      this.cities = this.resolve.cities;
      this.selectedCity = this.cities[0];
    };

    this.ok = () => {
      this.close({$value: this.result});
    };

    this.cancel = () => {
      this.dismiss({$value: 'cancel'});
    };
  }
};
