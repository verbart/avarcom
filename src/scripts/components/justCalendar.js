export default {
    bindings: {
        locale: '<?',
        fromMonday: '<?',
        weekdays: '<?'
    },
    templateUrl: 'templates/components/just-calendar.html',
    controller: class {
        constructor(moment) {
            this.$onInit = function () {
                this.weekdays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
                moment.locale(this.locale);

                this.weekdays = this.weekdays || moment.weekdaysShort();
                this.selected = moment();
                this.month = this.selected.clone();

                const start = this.selected.clone().date(this.fromMonday?0:1);

                this.removeTime(start.day(0));
                this.buildMonth(start, this.month);
            };
        }
        select(day) {
            this.selected = day.date;
            if (!day.isCurrentMonth) day.number < 7 ? this.changeMonth(+1) : this.changeMonth(-1);
        }
        changeMonth(changeTo) {
            const current = this.month.clone();

            this.removeTime(current.month(current.month()+changeTo).date(this.fromMonday?0:1));
            this.month.month(this.month.month()+changeTo);

            this.buildMonth(current, this.month);
        }
        removeTime(date) {
            return date.day(this.fromMonday?1:0).hour(0).minute(0).second(0).millisecond(0);
        }
        buildMonth(start, month) {
            this.weeks = [];

            let done = false;
            const date = start.clone();
            let monthIndex = date.month();
            let count = 0;

            while (!done) {
                this.weeks.push({ days: this.buildWeek(date.clone(), month) });
                date.add(1, 'w');
                done = count++ > 2 && monthIndex !== date.month();
                monthIndex = date.month();
            }
        }
        buildWeek(date, month) {
            const days = [];

            for (let i = 0; i < 7; i++) {
                days.push({
                    name: date.format('dd').substring(0, 1),
                    number: date.date(),
                    isCurrentMonth: date.month() === month.month(),
                    isToday: date.isSame(new Date(), 'day'),
                    date: date
                });
                date = date.clone();
                date.add(1, 'd');
            }

            return days;
        }
    }
}
