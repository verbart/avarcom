export default {
  templateUrl: 'views/components/modals/callback/callback.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function () {
    this.ok = (form) => {
      this.close({$value: form});
    };

    this.cancel = () => {
      this.dismiss({$value: false});
    };

    this.interacted = (field) => {
      return this.submitted || field.$dirty;
    };
  }
};
