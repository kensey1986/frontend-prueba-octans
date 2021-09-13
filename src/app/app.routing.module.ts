import { UserDetailComponent } from './pages/users/detail/userDetail.component';
import { UserComponent } from './pages/users/user.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {path: 'users', component: UserComponent},
    {path: 'users/detail/:id', component: UserDetailComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}