export default {
  templateUrl: 'views/components/modals/alert/alert.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function () {
    this.$onInit = () => {
      this.message = this.resolve.message;
    };
  }
};
