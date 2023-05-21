import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonApiServices } from '../services/person-api-services';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INewPerson } from '../models/person';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.css'],
})
export class UpdatePersonComponent implements OnInit {
  @Output() isEditFormSubmitted = new EventEmitter<boolean>();
  @Input() person!: FormGroup;
  personForm: FormGroup = this.fb.group({
    email: [
      '',
      [
        Validators.email,
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ],
    ],
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
    this.personForm.patchValue({
      email: this.person.controls['first_name'].value,
      first_name: this.person.controls['last_name'].value,
      last_name: this.person.controls['email'].value,
    });
  }
  updateDetail() {
    let person: INewPerson = {
      first_name: this.personForm.controls['first_name'].value,
      last_name: this.personForm.controls['last_name'].value,
      email: this.personForm.controls['email'].value,
    };

    this.personApiService
      .updatePerson$(this.person.controls['id'].value, person)
      .subscribe({
        next: (res) => {
          console.log('update successfully');
          this.isEditFormSubmitted.emit(true);
          this.personForm.reset();
          this.router.navigate([
            `/person/${this.person.controls['id'].value}`,
          ]);
        },
        error: (err) => {
          console.log(err),
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err,
            });
        },
      });
  }
  cancelPersonDetail() {
    this.isEditFormSubmitted.emit(true);
    this.personForm.reset();
    this.router.navigate([`/person/${this.person.controls['id'].value}`]);
  }
}
