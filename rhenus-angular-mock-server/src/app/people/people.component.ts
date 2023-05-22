import { Component, OnInit } from '@angular/core';
import { IPerson } from '../models/person';
import { PersonApiServices } from '../services/person-api-services';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class PeopleComponent implements OnInit {
  isCreateFormSubmitted: any;
  tableColHeader: { header: string }[] = [];
  people: IPerson[] = [];

  constructor(
    private personApiService: PersonApiServices,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getPeople();
    this.showCreateModal = false;
    this.tableColHeader = [
      { header: 'ID' },
      { header: 'First Name' },
      { header: 'Last Name' },
      { header: 'Email' },
      { header: 'Action' },
    ];
  }

  getPeople() {
    this.personApiService.getPeople$().subscribe({
      next: (res) => {
        this.people = res;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'getting person detail was Unsuccessful',
        });
      },
    });
  }

  deletePerson(userId: number, event: Event) {
    this.confirmationService.confirm({
      target: event.target!,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.personApiService.deletePerson$(userId).subscribe({
          next: (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Delete Successfully',
            });
            this.getPeople();
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Delete Unsuccessfully',
            });
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
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
