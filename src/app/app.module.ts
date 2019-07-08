import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {APP_SERVICES} from './share/app-services';
import {APP_STORES} from './share/app-stores';
import {FCM} from '@ionic-native/fcm/ngx';

@NgModule({
    declarations: [
        AppComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [
        APP_SERVICES,
        APP_STORES,
        StatusBar,
        SplashScreen,
        FCM,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
