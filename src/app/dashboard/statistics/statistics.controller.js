export default class StatisticsCtrl {
    constructor(moment, Statistics, $scope) {
        this.$scope = $scope;
        this.Statistics = Statistics;
        this.startDate = moment().subtract(1, 'day');
        this.endDate = moment();
        this.searchComInput = '';

        $scope.$watchGroup([()=>this.startDate, ()=>this.endDate], () => {
            this.getStats();
        });
    }

    getStats() {
        this.Statistics.get({
            startTime: this.startDate.format('X'),
            endTime: this.endDate.format('X'),
            type: 'general'
        }, res => {
            console.log(res);
            this.general = res.general_data;
            this.commissioners = res.commissars;
            this.rating = angular.copy(this.commissioners);
        }, error => {
            console.log(error);
        });
    }
}
