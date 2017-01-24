export default class {
    constructor($state, Accident) {
        this.$state = $state;
        this.Accident = Accident;
        this.accidents = Accident.query({}, res => {
            console.log('result', res);

            this.map = {
                center: {
                    lat: 54.7284569,
                    lng: 55.9806979,
                    zoom: 10
                },
                markers: {}
            };
            res.forEach((obj, index)=> {
                this.map.markers['accident_'+index] = {
                    lat: +obj.latitude,
                    lng: +obj.longitude,
                    message: obj.description,
                    icon: {
                        iconUrl: 'images/icons/accident-marker_green.png',
                        iconSize: [44, 44],
                        popupAnchor:  [0, -22]
                    }
                };
            });
        }, err => {
            console.log(err);
        });
        this.newAccident = {};
        this.$on('leafletDirectiveMap.click', function(event){
            console.log(event);
        })
    }

    addAccident() {
        if (!Object.keys(this.newAccident).length) return;

        this.Accident.save(this.newAccident, res => {
            this.$state.go('accidents.edit', {id: res.crash_id}, {reload: true});
        });
    }
}
