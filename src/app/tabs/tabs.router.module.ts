import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';


const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'availableTasks',
                children: [
                    {
                        path: '',
                        loadChildren: '../available_tasks/available-tasks.module#AvailableTasksPageModule'
                    }
                ]
            },
            {
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
