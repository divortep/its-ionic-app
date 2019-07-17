import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from '../../models/task.model';
import {ActionSheetController} from '@ionic/angular';
import {TaskService} from '../../services/task.service';
import {Subscription} from 'rxjs';
import {PopupService} from '../../services/popup.service';

@Component({
    selector: 'available-tasks',
    templateUrl: 'available-tasks.page.html',
    styleUrls: ['available-tasks.page.scss']
})
export class AvailableTasksPage implements OnInit, OnDestroy {

    availableTasks: Array<Task>;

    private _subscriptions: Subscription[] = [];

    constructor(private _popupService: PopupService,
                private _taskService: TaskService,
                private _actionSheetController: ActionSheetController,
                private _changeRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this._subscriptions.push(
            this._taskService.availableTasks$.subscribe(tasks => {
                if (tasks) {
                    this.availableTasks = tasks.slice();
                    this._changeRef.detectChanges();
                }
            }));

        this._taskService.getAvailableTasks()
            .catch(err => this._popupService.showErrorPopup(JSON.stringify(err)));
    }

    ngOnDestroy(): void {
        this._subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    async onTaskSelect(task: Task): Promise<void> {
        if (!task) {
            return;
        }

        const actionSheet = await this._actionSheetController.create({
            header: `Accept ${task.number}:`,
            buttons: this.getButtons(task)
        });

        await actionSheet.present();
    }

    doRefresh(event) {
        Promise.all([
            this._taskService.getAvailableTasks(),
            this._taskService.getAcceptedTasks()
        ]).finally(() => event.target.complete());
    }

    getButtons(task: Task): Array<any> {
        const buttons = [];
        if (!task.hasPAX) {
            buttons.push({
                text: 'Individually',
                icon: 'person',
                handler: () => {
                    this._taskService.acceptTask(task.id);
                }
            });
        }

        buttons.push({
            text: 'With a teammate',
            icon: 'contacts',
            handler: () => {
                this._taskService.acceptTask(task.id, 'teammate');
            }
        });

        buttons.push({text: 'Cancel', icon: 'close', role: 'cancel'});
        return buttons;
    }
}
