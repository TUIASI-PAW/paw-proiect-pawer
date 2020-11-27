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
import { EditModalComponent } from '../shared/edit-modal/edit-modal.component';
import { DeleteModalComponent } from '../shared/delete-modal/delete-modal.component';
import { TeamModalComponent } from '../shared/team-modal/team-modal.component';

@NgModule({
  declarations: [
    MyProjectsComponent,
    FindComponent,
    MyProfileComponent,
    ProjectComponent,
    AddModalComponent,
    DetailsComponent,
    EditModalComponent,
    DeleteModalComponent,
    TeamModalComponent,
  ],
  imports: [CommonModule, NgbModule, FormsModule],
  bootstrap: [MyProjectsComponent],
  entryComponents: [AddModalComponent, EditModalComponent],
})
export class BoardModule {}
