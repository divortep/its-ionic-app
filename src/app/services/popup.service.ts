import {Injectable} from '@angular/core';
import {Popup} from '../models/popup.model';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PopupService {

    constructor() {
    }

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
            duration: 5000,
            showCloseButton: true
        };
        this.showPopup(popup);
    }

    showPopup(popup: Popup) {
        this._popupState.next(popup);
    }
}
