/**
 * This component represents the 'People' page of the Angular application.
 * It displays a table of people and provides functionality to interact with them.
 */
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
  isCreateFormDone: any; // Variable to track if the create form is submitted
  tableColHeader: { header: string }[] = []; // Array to store table column headers
  people: IPerson[] = []; // Array to store the list of people

  constructor(
    private personApiService: PersonApiServices,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getPeople(); // Call the method to fetch the list of people
    this.showCreateFormModal = false; // Set the create modal to be initially hidden

    // Define the column headers for the table
    this.tableColHeader = [
      { header: 'ID' },
      { header: 'First Name' },
      { header: 'Last Name' },
      { header: 'Email' },
      { header: 'Action' },
    ];
  }
  /**
   * Retrieves the list of people from the API.
   * Displays an error message if the request is unsuccessful.
   */
  getPeople() {
    this.personApiService.getPeople$().subscribe({
      next: (resposne) => {
        this.people = resposne;
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
  /**
   * Deletes a person with the specified ID.
   * Displays a confirmation dialog and sends a request to delete the person.
   * Displays success or error message based on the response.
   * Fetches the updated list of people after successful deletion.
   * @param userId The ID of the person to be deleted
   * @param event The event object associated with the delete action
   */
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
  showCreateFormModal: boolean = false;
  /**
   * Opens the create modal dialog.
   * Sets the 'showCreateModal' variable to true to show the modal.
   */
  openCreateModal() {
    this.showCreateFormModal = true;
  }
  /**
   * Cancels the create modal dialog.
   * Sets the 'showCreateModal' variable to false to hide the modal.
   */
  cancelCreateModal() {
    this.showCreateFormModal = false;
  }
  /**
   * Navigates to the detail page of a person with the specified ID.
   * @param personId The ID of the person
   */
  onClickViewDetail(personId: number) {
    this.router.navigate([`/person/${personId}`]);
  }
  /**
   * Navigates to the edit page of a person with the specified ID.
   * @param personId The ID of the person
   */
  onClickEditDetail(personId: number) {
    this.router.navigate([`/person/${personId}`]);
  }
  /**
   * Handles the form submission event from the create form.
   * Updates the 'isCreateFormSubmitted' variable.
   * Hides the create modal and fetches the updated list of people.
   * @param event The form submission event
   */
  onSubmitCreateForm(event: any) {
    this.isCreateFormDone = event;
    this.showCreateFormModal = false;
    this.getPeople();
  }
}
