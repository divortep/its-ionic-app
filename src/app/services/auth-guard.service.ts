import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuardService {

    constructor(public authService: AuthService) {
    }

    canActivate(): boolean {
        return this.authService.isAuthenticated();
    }
}
