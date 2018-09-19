import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main/main.component';
import { LandingComponent } from './main/landing/landing.component';
import { LoginComponent } from './login/login.component';
import { AuthguardService } from './services/authguard.service';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent, data: { state: 'login' } },
  { path: 'main', component: MainComponent,
    children: [
      { path: 'landing', component: LandingComponent, canActivate: [AuthguardService], data: { state: 'landing' } },
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