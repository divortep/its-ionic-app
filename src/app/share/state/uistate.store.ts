import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Popup} from '../model/popup.model';

@Injectable()
export class UiStateStore {

    private _popupState: BehaviorSubject<Popup> = new BehaviorSubject(undefined);

    public readonly popupState$: Observable<Popup> = this._popupState.asObservable();

    showSuccessPopup(msg: string) {
        const popup = {
            message: msg,
            color: 'success',
            position: 'top',
            duration: 3000,
        };
        this.showPopup(popup);
    }

    showErrorPopup(msg: string) {
        const popup = {
            message: msg,
            color: 'danger',
            position: 'top',
            showCloseButton: true
        };
        this.showPopup(popup);
    }

    showPopup(popup: Popup) {
        this._popupState.next(popup);
    }
}

