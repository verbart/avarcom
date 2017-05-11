export default {
  bindings: {
    selected: '=?',
    isOpen: '=?',
    onUpdate: '&'
  },
  templateUrl: 'views/components/date-picker/date-picker.html',
  controller: class {
    constructor() {
      this.$onInit = function () {
        this.isOpen = false;
      };
    }
  }
}
