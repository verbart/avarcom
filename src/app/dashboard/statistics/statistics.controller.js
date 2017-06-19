export default class StatisticsCtrl {
    constructor(moment, Statistics, $scope) {
        this.$scope = $scope;
        this.Statistics = Statistics;
        this.startDate = moment().subtract(1, 'day');
        this.endDate = moment();

        // $scope.$watchGroup([()=>this.startDate, ()=>this.endDate], () => {
        //     this.getStats();
        // });
    }

    getStats() {
        this.Statistics.get({
            startTime: this.startDate.format('X'),
            endTime: this.endDate.format('X'),
            type: 'general'
        }, response => {
            console.log(response);
            this.general = response.general_data;
            this.commissioners = response.commissars;
            this.rating = angular.copy(this.commissioners);
        }, error => {
            console.log(error);
        });
    }
}
