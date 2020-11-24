import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  @Input() lbl: string;
  labelString: string;
  projectName: string;
  error: string;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.resetFields();
    this.initiateLabelName();
  }
  close() {
    if (this.lbl === this.projectName) {
      this.activeModal.close();
    } else {
      this.error = 'Project doesn t match';
    }
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  resetFields() {
    this.projectName = '';
    this.error = '';
    this.labelString = '';
  }

  initiateLabelName() {
    this.labelString = 'Please type ' + this.lbl + ' to confirm';
  }
}
