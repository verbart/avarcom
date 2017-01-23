export default {
    templateUrl: 'views/components/sidebar/sidebar.html',
    controller: function () {
        this.minimize = false;
        this.toggleInit = false;
        this.changeDate = function (e) {
            console.log(e);
        }
    }
}
