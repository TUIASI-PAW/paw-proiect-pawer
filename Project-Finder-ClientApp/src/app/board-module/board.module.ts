import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { FindComponent } from './find/find.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ProjectComponent } from './project/project.component';
import { AddModalComponent } from '../shared/add-modal/add-modal.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [MyProjectsComponent, FindComponent, MyProfileComponent, ProjectComponent, AddModalComponent, DetailsComponent],
  imports: [CommonModule, NgbModule, FormsModule],
  bootstrap: [MyProjectsComponent],
  entryComponents: [AddModalComponent],
})
export class BoardModule {}
