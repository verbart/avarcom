export default {
  templateUrl: 'views/components/notification-switcher/notification-switcher.html',
  controller: class {
    constructor(CONSTANT, $scope) {
      this.OneSignal = CONSTANT.OneSignal;

      this.OneSignal.isPushNotificationsEnabled().then(status => {
        $scope.$apply(() => this.allowNotification = status);

        if (!status) {
          OneSignal.push(['getNotificationPermission', permission => {
            if (permission == 'denied') {
              $scope.$apply(() => this.allowNotification = undefined);
            }
          }]);
        }
      });
      OneSignal.on('notificationPermissionChange', permissionChange => {
        switch (permissionChange.to) {
          case 'denied':
            $scope.$apply(() => this.allowNotification = undefined);
            break;
          case 'granted':
            $scope.$apply(() => this.allowNotification = true);
        }
      });
      OneSignal.on('subscriptionChange', isSubscribed => {
        switch (isSubscribed) {
          case true:
            $scope.$apply(() => this.allowNotification = true);
            break;
          case false:
            $scope.$apply(() => this.allowNotification = false);
        }
      });
    }

    changeNotificationAllow() {
      this.OneSignal.isPushNotificationsEnabled(isEnabled => {
        if (isEnabled) {
          this.OneSignal.setSubscription(false);
        } else {
          this.OneSignal.push(['registerForPushNotifications']);
          this.OneSignal.setSubscription(true);
        }
      });
    }
  }
}
