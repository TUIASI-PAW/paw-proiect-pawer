import { ChatComponent } from './../board-module/chat/chat.component';
import { AddModalComponent } from './../shared/add-modal/add-modal.component';
import { BoardModule } from './../board-module/board.module';
import { FindComponent } from './../board-module/find/find.component';
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

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailsComponent } from '../board-module/details/details.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, LoginComponent, ChatComponent],
  imports: [
    NgbModule,
    BoardModule,
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
      { path: 'board/find', component: FindComponent, pathMatch: 'full' },
      { path: 'board/project/:id', component: DetailsComponent, pathMatch: 'full' },
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
  entryComponents: [AddModalComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
