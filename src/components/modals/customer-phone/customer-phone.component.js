export default {
  templateUrl: 'views/components/modals/customer-phone/customer-phone.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function () {
    this.$onInit = () => {
      this.message = this.resolve.message;
    };

    this.ok = () => {
      this.close({$value: true});
    };
    this.cancel = () => {
      this.dismiss({$value: false});
    };
  }
};
