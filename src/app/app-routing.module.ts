import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
    {path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
    {
        path: '',
        loadChildren: './tabs/tabs.module#TabsPageModule',
        canActivate: [AuthGuardService]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
