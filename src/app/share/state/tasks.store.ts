import {BehaviorSubject, Observable} from 'rxjs';

import {Injectable} from '@angular/core';
import {AcceptedTask, Task} from '../../share/model/task.model';

@Injectable()
export class TasksStore {
    private _availableTasks: BehaviorSubject<Array<Task>> = new BehaviorSubject(undefined);
    private _acceptedTasks: BehaviorSubject<Array<AcceptedTask>> = new BehaviorSubject(undefined);

    public readonly availableTasks$: Observable<Array<Task>> = this._availableTasks.asObservable();
    public readonly acceptedTasks$: Observable<Array<AcceptedTask>> = this._acceptedTasks.asObservable();

    constructor() {
    }

    setAvailableTasks(tasks: Array<Task>): void {
        this._availableTasks.next(tasks);
    }

    setAcceptedTasks(tasks: Array<AcceptedTask>): void {
        this._acceptedTasks.next(tasks);
    }
}
