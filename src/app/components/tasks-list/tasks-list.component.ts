import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from '../../share/model/task.model';

@Component({
    selector: 'app-tasks-list',
    templateUrl: './tasks-list.component.html',
    styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent {

    @Input() tasks: Array<Task>;
    @Input() bgColor: string;
    @Output() taskSelected = new EventEmitter<Task>();

    constructor() {
    }

    onTaskClick(task: Task): void {
        this.taskSelected.next(task);
    }
}
