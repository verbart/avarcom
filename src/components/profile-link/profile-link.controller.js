export default class {
  constructor(AuthData) {
    this.AuthData = AuthData;
    this.userData = AuthData.get();
    this.menuIsOpen = false;
  }
}
