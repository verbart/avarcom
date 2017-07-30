export default class {
  constructor($http, CONSTANT, Moderation, $interval, $scope) {
    this.$http = $http;
    this.CONSTANT = CONSTANT;
    this.Moderation = Moderation;

    this.getAccidents();

    // const interval = $interval(() => this.getAccidents(this.selectedDate && this.selectedDate.format('DD.MM.YYYY')), 20 * 1000);
    $scope.$on('$destroy', () => {
      console.log(interval);
      $interval.cancel(interval)
    });
  }

  getAccidents() {
    this.Moderation.query({}, response => {
      this.accidents = response.data;
    });
  }
}
