import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment as env} from '../../environments/environment';
import {AcceptedTask, Task} from '../models/task.model';
import {catchError, map} from 'rxjs/operators';
import {PopupService} from '../services/popup.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {ErrorService} from './error.service';
import * as _ from 'lodash';

@Injectable({providedIn: 'root'})
export class TaskService {

    private _availableTasks: BehaviorSubject<Array<Task>> = new BehaviorSubject(undefined);
    private _acceptedTasks: BehaviorSubject<Array<AcceptedTask>> = new BehaviorSubject(undefined);

    public readonly availableTasks$: Observable<Array<Task>> = this._availableTasks.asObservable();
    public readonly acceptedTasks$: Observable<Array<AcceptedTask>> = this._acceptedTasks.asObservable();

    constructor(private _httpClient: HttpClient,
                private _popupService: PopupService,
                private _errorService: ErrorService) {
    }

    private getTasks<T extends Task>(url: string, onSuccess?: (tasks: Array<T>) => void): Observable<void | Array<T>> {
        return this._httpClient.get<Array<T>>(url).pipe(
            map(tasks => {
                onSuccess(tasks);
                return tasks;
            }),
            catchError(ex => this._errorService.handleError(ex))
        );
    }

    getAvailableTasks(): Promise<void | Array<Task>> {
        const url = env.serverUrl + env.availableTasksEndpoint;
        return this.getTasks<AcceptedTask>(url, _tasks => {
            const tasks = _.orderBy(_tasks, ['createdDate'], ['desc']);
            this._availableTasks.next(tasks);
        }).toPromise();
    }

    getAcceptedTasks(): Promise<void | Array<AcceptedTask>> {
        const url = env.serverUrl + env.acceptedTasksEndpoint;
        return this.getTasks<AcceptedTask>(url, _tasks => {
            const tasks = _.orderBy(_tasks, ['acceptedDate'], ['desc']);
            this._acceptedTasks.next(tasks);
        }).toPromise();
    }

    refreshAllTasks() {
        Promise.all([this.getAvailableTasks(), this.getAcceptedTasks()]);
    }

    acceptTask(taskId: string, withTeammate: boolean): Promise<void> {
        const url = `${env.serverUrl}${env.taskEndpoint}/${taskId}/accept${withTeammate ? '?withTeammate=' + withTeammate : ''}`;

        return this._httpClient.get(url).pipe(
            map((acceptedTask: AcceptedTask) => {
                    if (acceptedTask) {
                        Promise.all([
                            this.getAvailableTasks(), this.getAcceptedTasks()]
                        ).finally(
                            () => this._popupService.showSuccessPopup(`Task ${acceptedTask.number} has been accepted.`)
                        );
                    }
                }
            ),
            catchError(ex => this._errorService.handleError(ex))
        ).toPromise();
    }
}
