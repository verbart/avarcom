export default class StatisticsCtrl {
    constructor(moment, Statistics) {
        this.Statistics = Statistics;
        this.startDate = moment().subtract(1, 'day');
        this.endDate = moment();

        this.getStats();
    }

    getStats() {
        this.Statistics.get({
            from: this.startDate.format('DD.MM.YYYY'),
            to: this.endDate.format('DD.MM.YYYY')
        }, res => {
            console.log(res);
            this.general = res.general;
            this.commissioners = res.commissioners;
        });
    }
}
