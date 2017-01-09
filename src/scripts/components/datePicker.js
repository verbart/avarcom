export default {
    bindings: {
        selected: '=?',
        isOpen: '=?',
    },
    templateUrl: 'templates/components/date-picker.html',
    controller: class {
        constructor(moment) {
            this.$onInit = function () {
                this.isOpen = false;
            };
        }
        toggle() {
            this.isOpen = !this.isOpen;
        }
        close() {
            if (this.isOpen) {
                this.isOpen = false;
            }
        }
    }
}
