import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from '../../models/task.model';
import {TaskService} from '../../services/task.service';
import {Subscription} from 'rxjs';
import {PopupService} from '../../services/popup.service';

@Component({
    selector: 'app-accepted-tasks',
    templateUrl: './accepted-tasks.page.html',
    styleUrls: ['./accepted-tasks.page.scss'],
})
export class AcceptedTasksPage implements OnInit, OnDestroy {

    acceptedTasks: Array<Task>;

    private _subscriptions: Subscription[] = [];

    constructor(private _tasksService: TaskService,
                private _popupService: PopupService,
                private _taskService: TaskService,
                private _changeRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this._subscriptions.push(
            this._taskService.acceptedTasks$.subscribe(tasks => {
                if (tasks) {
                    this.acceptedTasks = tasks.slice();
                    this._changeRef.detectChanges();
                }
            }));

        this._taskService.getAcceptedTasks()
            .catch(err => this._popupService.showErrorPopup(JSON.stringify(err)));
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
