export default class StatisticsCtrl {
    constructor(moment, Statistics) {
        this.Statistics = Statistics;
        this.startDate = moment().subtract(1, 'day');
        this.endDate = moment();
        this.searchComInput = '';

        this.getStats();
    }

    getStats() {
        this.Statistics.get({
            startTime: this.startDate.format('x'),
            endTime: this.endDate.format('x'),
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
