export default {
  templateUrl: 'views/components/modals/period/period.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function () {
    this.$onInit = () => {
      this.period = this.resolve.period;
    };

    this.ok = () => {
      this.close({$value: this.period});
    };
    this.cancel = () => {
      this.dismiss({$value: 'cancel'});
    };
  }
};
