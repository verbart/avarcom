export default class {
  constructor(Commissioner, $interval, $scope) {
    this.Commissioner = Commissioner;

    this.getCommissioners(this.selectedDate);
    console.log(1111111111);
    const interval = $interval(() => this.getCommissioners(), 20*1000);
    $scope.$on('$destroy', () => $interval.cancel(interval));
  }

  getCommissioners() {
    this.Commissioner.query(response => {
      this.commissioners = response.data;
      console.log(response);
    });
  }
}
