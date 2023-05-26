import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonApiServices } from '../services/person-api-services';
import { Router } from '@angular/router';
import { INewPerson, IPerson } from '../models/person';
import { MessageService } from 'primeng/api';

/**
 * This component is responsible for creating a new person using a form.
 */

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.css'],
})
export class CreatePersonComponent {
  @Output() isCreateFormDone = new EventEmitter<boolean>();
  showCreateFormModal: boolean;
  people: IPerson[];
  personForm: FormGroup = this.fb.group({
    id: [''],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(30)],
    ],
    last_name: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
    ],
    first_name: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
    ],
  });
  constructor(
    private personApiService: PersonApiServices,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}
  /**
   * Creates a new person using the provided form data.
   */
  createPerson() {
    let person_body_request: INewPerson = {
      first_name: this.personForm.controls['first_name'].value,
      last_name: this.personForm.controls['last_name'].value,
      email: this.personForm.controls['email'].value,
    };
    this.personApiService.addPerson$(person_body_request).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Create Successfully',
        });
        this.isCreateFormDone.emit(true);
        this.personForm.reset();

        this.router.navigate(['']);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Create Unsuccessfully',
        });
      },
    });
  }
  /**
   * Cancels the creation of a new person and resets the form.
   */
  cancelCreateModal() {
    this.isCreateFormDone.emit(true);
    this.personForm.reset();
    this.router.navigate(['']);
  }
}
