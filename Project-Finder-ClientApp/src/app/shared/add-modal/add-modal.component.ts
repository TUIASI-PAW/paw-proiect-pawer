import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {
  noMembers: number;
  description: string;
  startDate: string;
  projectName: string;
  projectTechnologies: string;
  nameErorr: string;
  technologiesErorr: string;
  descriptionErorr: string;
  noMembersErrors: string;
  error: string;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.resetFields();
    const date = new Date();
    this.startDate = date.toISOString().substr(0, 10);
  }

  resetFields(): void {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    this.startDate = yyyy + '-' + mm + '-' + dd;
    this.noMembers = 2;
    this.description = '';
    this.projectName = '';
    this.projectTechnologies = '';
    this.nameErorr = '';
    this.technologiesErorr = '';
    this.descriptionErorr = '';
    this.error = '';
    this.noMembersErrors = '';
  }

  close() {
    this.error = '';
    this.nameErorr = '';
    this.descriptionErorr = '';
    this.technologiesErorr = '';
    this.noMembersErrors = '';
    if (
      this.projectName.length > 0 &&
      this.projectTechnologies.length > 0 &&
      this.description.length > 0 &&
      !isNaN(Number(this.noMembers)) &&
      this.noMembers >= 2
    ) {
      this.activeModal.close({
        name: this.projectName,
        description: this.description,
        technologies: this.projectTechnologies,
        noMembers: this.noMembers,
        startDate: this.startDate,
      });
      this.resetFields();
    } else {
      this.error = 'Fields: ';
      if (this.projectName.length === 0) {
        this.nameErorr = 'username';
      }
      if (this.projectTechnologies.length === 0) {
        this.technologiesErorr += 'technologies';
      }
      if (this.description.length === 0) {
        this.descriptionErorr += 'description';
      }
      if (
        this.noMembers === null ||
        isNaN(Number(this.noMembers)) ||
        this.noMembers < 2
      ) {
        this.noMembersErrors += 'members';
      }
      this.error +=
        this.nameErorr +
        ' ' +
        this.technologiesErorr +
        ' ' +
        this.descriptionErorr +
        ' ' +
        this.noMembersErrors +
        ' ' +
        'should be valid';
    }
  }

  dismiss() {
    this.activeModal.dismiss();
  }
}
