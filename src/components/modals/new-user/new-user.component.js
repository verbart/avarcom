export default {
  templateUrl: 'views/components/modals/new-user/new-user.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function ($http, toaster, CONSTANT, User) {
    this.$onInit = () => {
      this.toaster = toaster;
      this.User = User;
      this.user = {};

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
      $http.get(CONSTANT.API_URL_V2+'/levels').then(response => {
        console.log(response);
        this.types = response.data;
        this.selectedType = [this.types[0]];
        this.buildLabel(this.selectedType);
        this.loadRoles(this.types[0]);
      }, error => {
        console.log(error);
      });
    };
    this.loadRoles = (type) => {
      if (type) {
        $http.get(`${CONSTANT.API_URL_V2}/levels/${type.id}/roles`).then(response => {
          console.log(response);
          this.roles = response.data;
          this.selectedRole = [this.roles[0]];
          this.buildLabel(this.selectedRole);
          this.loadCities(this.roles[0]);
        }, error => {
          console.log(error);
        });
      } else {
        this.roles = [];
        this.selectedRole = [];
        this.buildLabel(this.selectedRole);
        this.loadCities();
      }
    };
    this.loadCities = (role) => {
      if (role) {
        $http.get(`${CONSTANT.API_URL_V2}/roles/${role.id}/cities`).then(response => {
          this.citiesOptions.selectionLimit = 1;
          this.cities = response.data;
          this.selectedCities = [this.cities[0]];
          this.buildLabel(this.selectedCities);
        }, error => {
          console.log(error);
        });
      } else {
        this.cities = [];
        this.selectedCities = [];
        this.buildLabel(this.selectedCities);
      }
    };

    this.buildLabel = (items) => {
      items.label = items.map(item => item.name).join(', ');
    };

    this.onTypeChanged = () => {
      this.buildLabel(this.selectedType);
      this.loadRoles(this.selectedType[0]);
    };
    this.onRoleChanged = () => {
      this.buildLabel(this.selectedRole);
      this.loadCities(this.selectedRole[0]);
    };
    this.onCitiesChanged = () => {
      this.buildLabel(this.selectedCities);
    };
    this.onCitiesSelected = (city) => {
      if (this.selectedRole[0] && !this.selectedRole[0].multi_cities) {
        this.selectedCities = [city];
      }
    };

    this.interacted = (field) => {
      return this.submitted || field.$dirty;
    };

    this.addUser = () => {
      this.user.type = this.selectedType[0].id;
      this.user.role = this.selectedRole[0].id;
      if (this.selectedCities.length > 1) {
        this.user.cities = this.selectedCities.map(city => city.id);
      }

      this.User.save(this.user, response => {
        console.log(response);

        this.toaster.success('Добавлен новый пользователь, c ID ' + response.user_id);
        this.close({$value: response});
      }, error => {
        console.log(error);

        switch(error.status) {
          case 409:
            this.toaster.error('Пользователь с такой почтой или телефоном уже существует!');
            break;
          case 400:
            this.toaster.error('Не корректное заполнение формы, проверьте и попробуйте ещё раз!');
            break;
          case 403:
            this.toaster.error('У Вас не достаточно прав для добавления нового пользователя!');
            break;
          default:
            this.toaster.error('Произошла ошибка, пожалуйста, сообщите нам о ней!');
        }
      });
    };
    this.cancel = () => {
      this.dismiss({$value: 'cancel'});
    };
  }
};
