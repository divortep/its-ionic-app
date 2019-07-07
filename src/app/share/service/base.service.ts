import {Observable, of} from 'rxjs';
import {UiStateStore} from '../state/uistate.store';

export abstract class BaseService {

    protected constructor(protected _uiStateStore: UiStateStore) {
    }

    handleError(ex): Observable<void> {
        const message = ex.statusText ? ex.statusText :
            ex && ex.error ? ex.error.message : 'Error';
        return of(this._uiStateStore.showErrorPopup(message));
    }
}
