import {TaskService} from '../service/task.service';
import {BehaviorSubject} from 'rxjs';
import {ITask} from '../model/task.model';
import {Injectable} from '@angular/core';

@Injectable
export class TaskStore {
    private tasks: BehaviorSubject<ITask[]> = new BehaviorSubject([]);
    private appliedTasks: BehaviorSubject<ITask[]> = new BehaviorSubject([]);

    constructor(private taskService: TaskService) {
    }
}
