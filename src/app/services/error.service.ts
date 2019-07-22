import {PopupService} from '../services/popup.service';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import * as _ from 'lodash';

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
            const message = ex && !_.isEmpty(ex.error) ? ex.error.error :
                !_.isEmpty(ex.message) ? ex.message : 'Server error.';
            this._popupService.showErrorPopup(message);
        }
        return Promise.resolve();
    }
}
