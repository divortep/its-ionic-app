import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import {IonicStorageModule, Storage} from '@ionic/storage';
import {environment as env} from '../environments/environment';

const jwtOptionsFactory = (storage) => {
    return {
        tokenGetter: () => storage.get('access_token'),
        whitelistedDomains: [env.domain]
    };
};

const jwtModuleOptions = {
    jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
    }
};

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
        IonicStorageModule.forRoot(),
        JwtModule.forRoot(jwtModuleOptions)
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
