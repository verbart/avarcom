export default {
  templateUrl: 'views/components/modals/new-commissioner/new-commissioner.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function () {
    this.$onInit = () => {
      this.cities = this.resolve.cities;
      this.selectedCity = this.cities.find(e => e.is_selected);
    };

    this.ok = () => {
      this.close({$value: this.result});
    };

    this.cancel = () => {
      this.dismiss({$value: 'cancel'});
    };
  }
};
