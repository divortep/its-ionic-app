import {Component, OnInit} from '@angular/core';
import {Task} from '../../share/model/task.model';
import {Observable} from 'rxjs';
import {TasksStore} from '../../share/state/tasks.store';
import {TaskService} from '../../share/service/task.service';

@Component({
    selector: 'app-accepted-tasks',
    templateUrl: './accepted-tasks.page.html',
    styleUrls: ['./accepted-tasks.page.scss'],
})
export class AcceptedTasksPage implements OnInit {

    acceptedTasks$: Observable<Array<Task>> = this._tasksStore.acceptedTasks$;

    constructor(private _tasksStore: TasksStore,
                private _taskService: TaskService) {
    }

    async ngOnInit(): Promise<void> {
        await this._taskService.getAcceptedTasks();
    }

    doRefresh(event) {
        this._taskService.getAcceptedTasks().finally(() => event.target.complete());
    }
}
