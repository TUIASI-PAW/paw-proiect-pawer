import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';

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
  error: string;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.resetFields();
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
  }

  close() {
    if (
      this.projectName.length > 0 &&
      this.projectTechnologies.length > 0 &&
      this.description.length > 0
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
      this.error +=
        this.nameErorr +
        ' ' +
        this.technologiesErorr +
        ' ' +
        this.descriptionErorr +
        ' ' +
        'should not be blank!';
    }
  }

  dismiss() {
    this.activeModal.dismiss();
  }
}
