import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TabsPageRoutingModule} from './tabs.router.module';

import {TabsPage} from './tabs.page';
import {AvailableTasksPage} from './available-tasks/available-tasks.page';
import {TasksListComponent} from '../components/tasks-list/tasks-list.component';
import {AcceptedTasksPage} from './accepted-tasks/accepted-tasks.page';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TabsPageRoutingModule,
    ],
    declarations: [
        TabsPage,
        AvailableTasksPage,
        AcceptedTasksPage,
        TasksListComponent
    ]
})
export class TabsPageModule {
}
