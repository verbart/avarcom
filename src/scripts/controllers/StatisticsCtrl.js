export default class StatisticsCtrl {
    constructor(moment) {
        this.startDate = moment().subtract(1, 'day');
    }
}
