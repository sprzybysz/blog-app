import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { LogInComponent } from './core/login/log-in.component';
import { AuthGuard } from './core/auth.guard';
import { CompanyComponent } from './core/company/company.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LogInComponent },
  { path: 'company', component: CompanyComponent },
  {
    path: 'post',
    loadChildren: async () => (await import("./post/post.module")).PostModule,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
