import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from '../../share/model/task.model';
import {TasksStore} from '../../share/state/tasks.store';
import {TaskService} from '../../share/service/task.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-accepted-tasks',
    templateUrl: './accepted-tasks.page.html',
    styleUrls: ['./accepted-tasks.page.scss'],
})
export class AcceptedTasksPage implements OnInit, OnDestroy {

    acceptedTasks: Array<Task>;

    private _subscriptions: Subscription[] = [];

    constructor(private _tasksStore: TasksStore,
                private _taskService: TaskService,
                private _changeRef: ChangeDetectorRef) {
    }

    async ngOnInit(): Promise<void> {
        this._subscriptions.push(
            this._tasksStore.acceptedTasks$.subscribe(tasks => {
                if (tasks) {
                    this.acceptedTasks = tasks.slice();
                    this._changeRef.detectChanges();
                }
            }));

        await this._taskService.getAcceptedTasks();
    }

    ngOnDestroy(): void {
        this._subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    doRefresh(event) {
        Promise.all([
            this._taskService.getAvailableTasks(),
            this._taskService.getAcceptedTasks()
        ]).finally(() => event.target.complete());
    }
}
