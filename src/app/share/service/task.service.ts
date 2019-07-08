import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AcceptedTask, Task} from '../../share/model/task.model';
import {catchError, map} from 'rxjs/operators';
import {TasksStore} from '../state/tasks.store';
import {UiStateStore} from '../state/uistate.store';
import {Observable} from 'rxjs';
import {BaseService} from './base.service';

@Injectable()
export class TaskService extends BaseService {

    constructor(private _httpClient: HttpClient,
                private _taskStore: TasksStore,
                protected _uiStateStore: UiStateStore) {
        super(_uiStateStore);
    }

    private getTasks<T extends Task>(url: string, onSuccess?: (tasks: Array<T>) => void): Observable<void | Array<T>> {
        return this._httpClient.get(url).pipe(
            map(tasks => {
                const _tasks = tasks as Array<T>;
                onSuccess(_tasks);
                return _tasks;
            }),
            catchError(ex => super.handleError(ex))
        );
    }

    getAvailableTasks(): Promise<void | Array<Task>> {
        const url = environment.serverUrl + environment.availableTasksEndpoint;
        return this.getTasks<Task>(url, tasks => this._taskStore.setAvailableTasks(tasks)).toPromise();
    }

    getAcceptedTasks(): Promise<void | Array<Task>> {
        const url = environment.serverUrl + environment.acceptedTasksEndpoint;
        return this.getTasks<AcceptedTask>(url, tasks => this._taskStore.setAcceptedTasks(tasks)).toPromise();
    }

    acceptTask(taskId: string, teammate?: string): Promise<void> {
        const url = `${environment.serverUrl}${environment.taskEndpoint}/${taskId}/accept${teammate ? '?teammate=' + teammate : ''}`;

        return this._httpClient.get(url).pipe(
            map((acceptedTask: AcceptedTask) => {
                    if (acceptedTask) {
                        Promise.all([
                            this.getAvailableTasks(), this.getAcceptedTasks()]
                        ).finally(
                            () => this._uiStateStore.showSuccessPopup(`Task ${acceptedTask.number} has been accepted.`)
                        );
                    }
                }
            ),
            catchError(ex => super.handleError(ex))
        ).toPromise();
    }
}
