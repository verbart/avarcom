export default {
  templateUrl: 'views/components/modals/new-user/new-user.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function ($http, CONSTANT) {
    this.$onInit = () => {
      this.typesOptions = {
        selectionLimit: 1,
        styleActive: true,
        displayProp: 'name',
        showCheckAll: false,
        showUncheckAll: false,
        closeOnSelect: true
      };
      this.rolesOptions = {
        selectionLimit: 1,
        styleActive: true,
        displayProp: 'name',
        showCheckAll: false,
        showUncheckAll: false,
        closeOnSelect: true
      };
      this.citiesOptions = {
        styleActive: true,
        displayProp: 'name',
        showCheckAll: false,
        showUncheckAll: false
      };

      this.loadTypes();
    };

    this.loadTypes = () => {
      $http.get(CONSTANT.API_URL+'/levels').then(response => {
        console.log(response);
        this.types = response.data;
        this.selectedType = [this.types[0]];
        this.buildTypeLabel();
        this.loadRoles(this.types[0]);
      }, error => {
        console.log(error);
      });
    };
    this.loadRoles = (type) => {
      if (type) {
        $http.get(`${CONSTANT.API_URL}/levels/${type.id}/roles`).then(response => {
          console.log(response);
          this.roles = response.data;
          this.selectedRole = [this.roles[0]];
          this.buildRoleLabel();
          this.loadCities(this.roles[0]);
        }, error => {
          console.log(error);
        });
      } else {
        this.roles = [];
        this.selectedRole = [];
        this.buildRoleLabel();
        this.loadCities();
      }
    };
    this.loadCities = (role) => {
      if (role) {
        $http.get(`${CONSTANT.API_URL}/roles/${role.id}/cities`).then(response => {
          this.citiesOptions.selectionLimit = 1;
          this.cities = response.data;
          this.selectedCities = [this.cities[0]];
          this.buildCitiesLabel();
        }, error => {
          console.log(error);
        });
      } else {
        this.cities = [];
        this.selectedCities = [];
        this.buildCitiesLabel();
      }
    };

    this.buildTypeLabel = () => {
      this.selectedTypeLabel = this.selectedType.map(item => item.name).join(', ');
    };
    this.buildRoleLabel = () => {
      this.selectedRoleLabel = this.selectedRole.map(item => item.name).join(', ');
    };
    this.buildCitiesLabel = () => {
      this.selectedCitiesLabel = this.selectedCities.map(item => item.name).join(', ');
    };

    this.onTypeChanged = () => {
      this.buildTypeLabel();
      this.loadRoles(this.selectedType[0]);
    };
    this.onRoleChanged = () => {
      this.buildRoleLabel();
      this.loadCities(this.selectedRole[0]);
    };
    this.onCitiesChanged = () => {
      this.buildCitiesLabel();
    };
    this.onCitiesSelected = (city) => {
      if (this.selectedRole[0] && !this.selectedRole[0].multi_cities) {
        this.selectedCities = [city];
      }
    };

    this.ok = () => {
      this.close({$value: this.user});
    };
    this.cancel = () => {
      this.dismiss({$value: 'cancel'});
    };
  }
};
