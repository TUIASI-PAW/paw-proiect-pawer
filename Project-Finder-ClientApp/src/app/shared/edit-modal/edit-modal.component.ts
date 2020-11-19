import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  @Input() titleValue: string;
  @Input() descriptionValue: string;
  @Input() technologies: string;
  @Input() startDate: string;
  editedTitle: string;
  editedDescription: string;
  editedTechnologies: string;
  editedDate: string;
  titleErorr: string;
  technologiesErorr: string;
  descriptionErorr: string;
  dateError: string;
  error: string;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.editedTitle = this.titleValue;
    this.editedDescription = this.descriptionValue;
    this.editedTechnologies = this.technologies;
    this.editedDate = this.startDate;
    this.resetFields();
  }

  close() {
    this.resetFields();
    if (
      this.editedTitle.length > 0 &&
      this.editedDescription.length > 0 &&
      this.editedTechnologies.length > 0 &&
      this.startDate.length > 0
    ) {
      this.activeModal.close({
        name: this.editedTitle,
        description: this.editedDescription,
        technologies: this.editedTechnologies,
        startDate: this.editedDate,
      });
      this.resetFields();
    } else {
      this.error = 'Fields: ';
      if (this.editedTitle.length === 0) {
        this.titleErorr = 'username';
      }
      if (this.editedTechnologies.length === 0) {
        this.technologiesErorr += 'technologies';
      }
      if (this.editedDescription.length === 0) {
        this.descriptionErorr += 'description';
      }
      if (this.editedDate.length === 0) {
        this.dateError += 'date';
      }
      this.error +=
        this.titleErorr +
        ' ' +
        this.technologiesErorr +
        ' ' +
        this.descriptionErorr +
        ' ' +
        this.dateError +
        ' ' +
        'should not be blank!';
    }
  }

  resetFields(): void {
    this.titleErorr = '';
    this.technologiesErorr = '';
    this.descriptionErorr = '';
    this.dateError = '';
    this.error = '';
  }
}
