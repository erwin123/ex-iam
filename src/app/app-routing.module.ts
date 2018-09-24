import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main/main.component';
import { LandingComponent } from './main/landing/landing.component';
import { LoginComponent } from './login/login.component';
import { AuthguardService } from './services/authguard.service';
import { UserComponent } from './main/user/user.component';
import { ApplicationComponent } from './main/application/application.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent, data: { state: 'login' } },
  { path: 'main', component: MainComponent,
    children: [
      { path: 'landing', component: LandingComponent, canActivate: [AuthguardService], data: { state: 'landing' } },
      { path: 'user', component: UserComponent, canActivate: [AuthguardService], data: { state: 'user' } },
      { path: 'application', component: ApplicationComponent, canActivate: [AuthguardService], data: { state: 'application' } },
  ]},
  //{ path: '', redirectTo: 'main/landing'},

  // otherwise redirect to home
  { path: '**', redirectTo:'main/landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }