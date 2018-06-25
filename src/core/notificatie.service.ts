import {Injectable} from '@angular/core';
import {Firebase} from '@ionic-native/firebase';
import firebase from 'firebase/app';
import 'firebase/functions';
import {LocalNotifications} from '@ionic-native/local-notifications';
import {Platform} from 'ionic-angular';

@Injectable()
export class NotificatieService {

  private notificatiesEnabled = false;

  constructor(private ionicFirebase: Firebase, private notifications: LocalNotifications, private platform: Platform) {
    firebase.initializeApp({
      apiKey: 'AIzaSyB3h-f9Zn9MPDwU1xBtBnA2ETwFfpsIoV8',
      authDomain: 'loopgroep-groningen.firebaseapp.com',
      databaseURL: 'https://loopgroep-groningen.firebaseio.com',
      projectId: 'loopgroep-groningen'
    });
  }

  setNotificatiesOntvangen(enabled: boolean) {
    // notificaties worden in deze versie alleen nog ondersteund voor iOS
    if (this.platform.is('ios')) {
      if (enabled !== this.notificatiesEnabled) {
        if (enabled) {
          this.ionicFirebase.grantPermission();
          this.ionicFirebase.subscribe('algemeen');
          this.ionicFirebase.subscribe('prikbord');
        } else {
          this.ionicFirebase.unsubscribe('algemeen');
          this.ionicFirebase.unsubscribe('prikbord');
        }
        this.notificatiesEnabled = enabled;
      }
    }
  }

  resetNotificaties() {
    this.ionicFirebase.setBadgeNumber(0);
    this.notifications.clearAll();
  }

  triggerNotificaties() {
    firebase.functions().httpsCallable('callableSync')();
  }

  testNotificatie() {
    firebase.functions().httpsCallable('callableTest')();
  }

  // this.ionicFirebase.getToken().then(token => this.token = token);
  // if (this.platform.is('iOS')) {
  //   this.ionicFirebase.grantPermission();
  //   this.ionicFirebase.subscribe('loopgroep');
  //   this.ionicFirebase.onNotificationOpen().subscribe(() =>
  //     this.ionicFirebase.getBadgeNumber().then(badge =>
  //       this.ionicFirebase.setBadgeNumber(badge + 1))
  //   );
  //   this.ionicFirebase.setBadgeNumber(0);
}
