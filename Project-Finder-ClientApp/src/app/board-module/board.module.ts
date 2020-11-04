import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { FindComponent } from './find/find.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ProjectComponent } from './project/project.component';

@NgModule({
  declarations: [MyProjectsComponent, FindComponent, MyProfileComponent, ProjectComponent],
  imports: [CommonModule],
  bootstrap: [MyProjectsComponent],
})
export class BoardModule {}
