import {Component, OnDestroy, OnInit} from '@angular/core';

import {Platform, ToastController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {UiStateStore} from './share/state/uistate.store';
import {Popup} from './share/model/popup.model';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {FCM} from '@ionic-native/fcm/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    private _subscriptions: Subscription[] = [];

    constructor(
        private _platform: Platform,
        private _splashScreen: SplashScreen,
        private _statusBar: StatusBar,
        private _uiStateStore: UiStateStore,
        private _toastController: ToastController,
        private fcm: FCM
    ) {
    }

    ngOnInit(): void {
        this.initializeApp();

        this._subscriptions.push(
            this._uiStateStore.popupState$
                .pipe(filter(Boolean))
                .subscribe(popup => this.showPopup(popup))
        );

    }

    ngOnDestroy(): void {
        this._subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    initializeApp(): void {
        this._platform.ready().then(() => {
            this.fcm.subscribeToTopic('its_topic')
                .then(() => this.subscribeForNotification());
            this._statusBar.styleDefault();
            this._splashScreen.hide();
        });
    }

    subscribeForNotification(): void {
        this.fcm.onNotification().subscribe(data => {
            if (data.wasTapped) {
                console.log('Received in background');
            } else {
                console.log('Received in foreground');
            }
        });
    }

    async showPopup(popup: Popup): Promise<void> {
        const toast = await this._toastController.create(popup);
        toast.present();
    }
}
