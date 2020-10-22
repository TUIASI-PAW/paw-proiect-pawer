import { FindComponent } from './../board-module/find/find.component';
import { MyProfileComponent } from './../board-module/my-profile/my-profile.component';
import { MyProjectsComponent } from './../board-module/my-projects/my-projects.component';
import { HttpInterceptorService } from './../services/http-interceptor/http-interceptor.service';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app/app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, NavbarComponent, LoginComponent],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      {
        path: 'board/myProjects',
        component: MyProjectsComponent,
        pathMatch: 'full',
      },
      {
        path: 'board/profile',
        component: MyProfileComponent,
        pathMatch: 'full',
      },
      { path: 'board/find', component: FindComponent, pathMatch: 'full' },
    ]),
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
