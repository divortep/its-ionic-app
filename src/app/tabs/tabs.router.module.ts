import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';
import {AvailableTasksPage} from '../pages/available-tasks/available-tasks.page';
import {AcceptedTasksPage} from '../pages/accepted-tasks/accepted-tasks.page';


const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'availableTasks',
                component: AvailableTasksPage
            },
            {
                path: 'acceptedTasks',
                component: AcceptedTasksPage
            }, {
                path: '',
                redirectTo: '/tabs/availableTasks',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/availableTasks',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
