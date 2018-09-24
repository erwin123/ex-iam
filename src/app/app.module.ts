import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ClarityModule, ClrFormsNextModule  } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main/main.component';
import { LandingComponent } from './main/landing/landing.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthguardService } from './services/authguard.service';
import { LocationStrategy,HashLocationStrategy } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HeaderComponent } from './main/header/header.component';
import { UserComponent } from './main/user/user.component';
import { ApplicationComponent } from './main/application/application.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    LandingComponent,
    HeaderComponent,
    UserComponent,
    ApplicationComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    ClarityModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ClrFormsNextModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [AuthguardService,{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
