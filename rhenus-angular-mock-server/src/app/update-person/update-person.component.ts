import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonApiServices } from '../services/person-api-services';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.css'],
})
export class UpdatePersonComponent implements OnInit {
  @Output() isEditingFormFinished = new EventEmitter<boolean>();
  @Input() person: FormGroup;
  personForm: FormGroup = this.fb.group({
    id: [''],
    email: ['', [Validators.email, Validators.maxLength(30)]],
    last_name: ['', [Validators.minLength(2), Validators.maxLength(20)]],
    first_name: ['', [Validators.minLength(2), Validators.maxLength(20)]],
  });
  constructor(
    private personApiService: PersonApiServices,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.personForm.setValue({
      id: this.person.controls['id'].value,
      first_name: this.person.controls['first_name'].value,
      last_name: this.person.controls['last_name'].value,
      email: this.person.controls['email'].value,
    });
  }
  updateDetail() {
    let updated_person = {};
    Object.keys(this.personForm.controls).forEach((control) => {
      if (this.personForm.get(control).value) {
        updated_person[control] = this.personForm.get(control).value;
      }
    });
    updated_person['id'] = this.person.get('id').value;

    this.personApiService.updatePerson$(updated_person).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Update Successfully',
        });
        this.isEditingFormFinished.emit(true);
        this.personForm.reset();
        this.router.navigate([`/person/${this.person.controls['id'].value}`]);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err,
        });
      },
    });
  }
  cancelPersonDetail() {
    this.isEditingFormFinished.emit(true);
    this.personForm.reset();
    this.router.navigate([`/person/${this.person.controls['id'].value}`]);
  }
}
