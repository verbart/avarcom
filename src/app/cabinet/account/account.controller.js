export default class {
  constructor(AuthData) {
    this.userData = AuthData.get();
    this.allowNotification = true;
  }
}
