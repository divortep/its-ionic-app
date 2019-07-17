import {PopupService} from '../services/popup.service';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable({providedIn: 'root'})
export class ErrorService {

    protected constructor(private _popupService: PopupService,
                          private _authService: AuthService) {
    }

    handleError(ex): Promise<void> {
        const status = ex.status;
        if (status === 401) {
            this._popupService.showErrorPopup('You are not authorized for this!');
            this._authService.logout();
        } else {
            const message = ex && ex.error ? ex.error.error :
                ex.message ? ex.message : 'Error';
            this._popupService.showErrorPopup(message);
        }
        return Promise.resolve();
    }
}
