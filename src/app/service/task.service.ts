import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ITask} from '../model/task.model';

@Injectable
export class TaskService {
    constructor(private httpClient: HttpClient) {
    }

    getTask(): Observable<Map<>> {
        const url = environment.serverUrl + environment.tasksEndpoint;
        return this.httpClient.get(url);
    }

    getAppliedTask(): Observable<ITask[]> {
        const url = environment.serverUrl + environment.appliedTasksEndpoint;
        return this.httpClient.get(url);
    }
}
