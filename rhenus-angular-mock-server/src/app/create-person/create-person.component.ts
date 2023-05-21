import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonApiServices } from '../services/person-api-services';
import { Router } from '@angular/router';
import { INewPerson, IPerson } from '../models/person';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.css'],
})
export class CreatePersonComponent implements OnInit {
  @Output() isCreateFormSubmitted = new EventEmitter<boolean>();
  people!: IPerson[];
  person!: IPerson;
  selectedPeople!: IPerson[];
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
  showCreateModal: boolean | undefined;
  constructor(
    private personApiService: PersonApiServices,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {}
  createPerson() {
    let person:INewPerson = {
      first_name: this.personForm.controls['first_name'].value,
      last_name: this.personForm.controls['last_name'].value,
      email: this.personForm.controls['email'].value,
    };
    this.personApiService.addPerson$(person).subscribe({
      next: (res) => {
        console.log('create successfully');
        this.isCreateFormSubmitted.emit(true);
        this.personForm.reset();
        this.router.navigate(['']);
      },
      error: (err) => {},
    });
  }
  cancelCreateModal() {
    this.isCreateFormSubmitted.emit(true);
    this.personForm.reset();
    this.router.navigate(['']);
  }
}
