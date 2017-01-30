export default function () {
    let selectedDate = null;

    function get() {
        return selectedDate && selectedDate.date.format('DD.MM.YYYY');
    }
    function set(date) {
        selectedDate = date;
    }

    return {
        get,
        set
    };
}
