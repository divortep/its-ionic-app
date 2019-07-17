import {Component, OnDestroy, OnInit} from '@angular/core';

import {Platform, ToastController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {PopupService} from './services/popup.service';
import {Popup} from './models/popup.model';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {environment as env} from '../environments/environment';
import {FCM} from 'capacitor-fcm';
import {
    Plugins,
    PushNotification,
    PushNotificationActionPerformed,
    PushNotificationChannel,
    PushNotificationsPlugin
} from '@capacitor/core';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';
import {TaskService} from './services/task.service';

const fcm = new FCM();
const PushNotifications: PushNotificationsPlugin = Plugins.PushNotifications;

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
        private _popupService: PopupService,
        private _toastController: ToastController,
        private _authService: AuthService,
        private _router: Router,
        private _taskService: TaskService
    ) {
    }

    ngOnInit(): void {
        this._subscriptions.push(
            this._popupService.popupState$
                .pipe(filter(Boolean))
                .subscribe(popup => this.showPopup(popup))
        );

        this.initializeApp();
    }


    ngOnDestroy(): void {
        this._subscriptions.forEach(subscription => subscription.unsubscribe());
        fcm.unsubscribeFrom({topic: env.fmcTopic})
            .catch(err => this.handleError(err));
    }

    private initializeApp(): void {
        this._platform.ready().then(() => {
            this._statusBar.styleDefault();
            this._splashScreen.hide();

            if (!this._platform.is('desktop') && !this._platform.is('mobileweb')) {
                this.registerNotification();
            }

            this._authService.isAuthenticated$.subscribe(isAuthenticated =>
                this._router.navigate([!isAuthenticated ? 'login' : '']));
        });
    }

    private registerNotification() {
        PushNotifications.register().then(_ => {
            fcm.subscribeTo({topic: env.fmcTopic}).catch(err => this.handleError(err));
        }).catch(err => this.handleError(err));

        PushNotifications.createChannel({id: env.fmcChannel} as PushNotificationChannel)
            .catch(err => this.handleError(err));

        PushNotifications.addListener('pushNotificationReceived',
            (notification: PushNotification) => {
                this._taskService.refreshAllTasks();
            }
        );

        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification: PushNotificationActionPerformed) => {
                this._taskService.refreshAllTasks();
            }
        );
    }

    private handleError(err): void {
        this._popupService.showErrorPopup(JSON.stringify(err));
    }

    private showPopup(popup: Popup): void {
        this._toastController.create(popup)
            .then(toast => toast.present());
    }
}
