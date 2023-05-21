import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPerson } from '../models/person';
import { PersonApiServices } from '../services/person-api-services';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
  providers: [MessageService],
})
export class PeopleComponent implements OnInit, OnDestroy {
  isCreateFormSubmitted: any;
  tableColHeader: { header: string }[] = [];
  people!: IPerson[];
  people$!: Subscription;
  person!: IPerson;
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

  action!: string;

  constructor(
    private personApiService: PersonApiServices,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.getPeople();
    this.showCreateModal = false;
  }
  ngOnDestroy(): void {
    this.people$.unsubscribe();
  }
  ngOnInit(): void {
    this.tableColHeader = [
      { header: 'ID' },
      { header: 'First Name' },
      { header: 'Last Name' },
      { header: 'Email' },
      { header: 'Action' },
    ];
  }

  private getPeople() {
    this.people$ = this.personApiService.getPeople$().subscribe({
      next: (res) => {
        this.people = res;
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

  deletePerson(userId: number) {
    this.personApiService.deletePerson$(userId).subscribe({
      next: (res) => {
        console.log('delete successfully');
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'delete successfully',
        });
        this.getPeople();
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
  showCreateModal: boolean = false;
  openCreateModal() {
    this.showCreateModal = true;
  }
  cancelCreateModal() {
    this.showCreateModal = false;
  }
  onClickViewDetail(personId: number) {
    this.router.navigate([`/person/${personId}`]);
  }
  onClickEditDetail(personId: number) {
    this.router.navigate([`/person/${personId}`]);
  }
  onSubmitCreateForm(event: any) {
    this.isCreateFormSubmitted = event;
    this.showCreateModal = false;
    this.getPeople();
  }
}
