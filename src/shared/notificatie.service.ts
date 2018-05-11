import {Injectable} from '@angular/core';
import {Firebase} from '@ionic-native/firebase';

@Injectable()
export class NotificatieService {

  constructor(private firebase: Firebase) {}

  setNotificatiesOntvangen(enabled: boolean) {
    if (enabled) {
      this.firebase.grantPermission();
      this.firebase.subscribe('algemeen');
      this.firebase.subscribe('prikbord');
    } else {
      this.firebase.unsubscribe('algemeen');
      this.firebase.unsubscribe('prikbord');
    }
  }

  resetNotificaties() {
    this.firebase.setBadgeNumber(0);
  }

  // this.firebase.getToken().then(token => this.token = token);
  // if (this.platform.is('iOS')) {
  // TODO: dit pas na het inloggen ofzo?
  //   this.firebase.grantPermission();
  //   this.firebase.subscribe('loopgroep');
  //   this.firebase.onNotificationOpen().subscribe(() =>
  //     this.firebase.getBadgeNumber().then(badge =>
  //       this.firebase.setBadgeNumber(badge + 1))
  //   );
  //   this.firebase.setBadgeNumber(0);
}
