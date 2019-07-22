import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user.model';
import {environment as env} from '../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {AuthResponse} from '../models/auth-response';
import {Storage} from '@ionic/storage';
import {Platform} from '@ionic/angular';
import {PopupService} from './popup.service';
import {JWT_OPTIONS} from '@auth0/angular-jwt';

const TOKEN_KEY = 'access_token';

const jwtOptionsFactory = (storage) => {
    return {
        tokenGetter: () => storage.get('access_token'),
        whitelistedDomains: [env.domain]
    };
};

export const jwtModuleOptions = {
    jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
    }
};

@Injectable({providedIn: 'root'})
export class AuthService {

    private _currentUser: BehaviorSubject<User> = new BehaviorSubject(null);
    public readonly currentUser$: Observable<User> = this._currentUser.asObservable();

    private _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public readonly isAuthenticated$: Observable<boolean> = this._isAuthenticated.asObservable();

    constructor(private _http: HttpClient,
                private _helper: JwtHelperService,
                private _platform: Platform,
                private _storage: Storage,
                private _popupService: PopupService) {
        this._platform.ready().then(() => this.checkToken());
    }

    checkToken(): void {
        this._storage.get(TOKEN_KEY).then(token => {
            if (!token || this._helper.isTokenExpired(token)) {
                this.logout();
            } else {
                const user: User = this._helper.decodeToken(token) as User;
                this._currentUser.next(user);
                this._isAuthenticated.next(true);
            }
        });
    }

    login(credentials): Promise<void | AuthResponse> {
        const url = `${env.serverUrl}${env.loginEndpoint}`;
        return this._http.post<AuthResponse>(url, credentials)
            .pipe(
                tap((res: AuthResponse) => {
                    this._storage.set(TOKEN_KEY, res.accessToken);
                    const user = this._helper.decodeToken(res.accessToken) as User;
                    this._currentUser.next(user);
                    this._isAuthenticated.next(true);
                }),
                catchError(e => this.showWrongCredentialsMessage())
            ).toPromise();
    }

    showWrongCredentialsMessage(): Promise<void> {
        return Promise.reject(this._popupService.showErrorPopup('Incorrect username or password.'));
    }

    logout(): void {
        this._storage.remove(TOKEN_KEY).then(() => {
            this._isAuthenticated.next(false);
            this._currentUser.next(null);
        });
    }

    isAuthenticated(): boolean {
        return this._isAuthenticated.value;
    }
}
