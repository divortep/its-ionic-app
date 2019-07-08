import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from '../../share/model/task.model';
import {TasksStore} from '../../share/state/tasks.store';
import {ActionSheetController} from '@ionic/angular';
import {TaskService} from '../../share/service/task.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'available-tasks',
    templateUrl: 'available-tasks.page.html',
    styleUrls: ['available-tasks.page.scss']
})
export class AvailableTasksPage implements OnInit, OnDestroy {

    availableTasks: Array<Task>;

    private _subscriptions: Subscription[] = [];

    constructor(private _tasksStore: TasksStore,
                private _taskService: TaskService,
                private _actionSheetController: ActionSheetController,
                private _changeRef: ChangeDetectorRef) {
    }

    async ngOnInit(): Promise<void> {
        this._subscriptions.push(
            this._tasksStore.availableTasks$.subscribe(tasks => {
                if (tasks) {
                    this.availableTasks = tasks.slice();
                    this._changeRef.detectChanges();
                }
            }));

        await this._taskService.getAvailableTasks();
    }

    ngOnDestroy(): void {
        this._subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    async onTaskSelect(task: Task): Promise<void> {
        if (!task) {
            return;
        }

        const actionSheet = await this._actionSheetController.create({
            header: `Accept ${task.number} as`,
            buttons: [{
                text: 'Only me',
                icon: 'person',
                handler: () => {
                    this._taskService.acceptTask(task.id);
                }
            }, {
                text: 'With a teammate',
                icon: 'contacts',
                handler: () => {
                    this._taskService.acceptTask(task.id, 'teammate');
                }
            }, {
                text: 'Cancel',
                icon: 'close',
                role: 'cancel'
            }]
        });

        await actionSheet.present();
    }

    doRefresh(event) {
        Promise.all([
            this._taskService.getAvailableTasks(),
            this._taskService.getAcceptedTasks()
        ]).finally(() => event.target.complete());
    }
}
