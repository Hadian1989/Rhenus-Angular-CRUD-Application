
/**
 * This component represents the 'Person' page of the Angular application.
 * It handles the display and manipulation of a person's details.
 */
import { Component, OnInit } from '@angular/core';
import { PersonApiServices } from '../services/person-api-services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  providers: [MessageService],
})
export class PersonComponent implements OnInit {
  id_quary: number; // The ID of the person obtained from the route query parameter
  personForm: FormGroup = this.fb.group({
    // Form group to hold the person's details
    id: [''],
    email: ['', Validators.required],
    last_name: ['', Validators.required],
    first_name: ['', Validators.required],
  });
  showEditModal: boolean = false; // Variable to track the visibility of the edit modal
  isEditFormDone: any; // Variable to track if the edit form is submitted

  constructor(
    private personApiService: PersonApiServices,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id_quary = params['id'];
    });
    this.getPersonDetail(); // Call the method to fetch the person's detail
  }

  getPersonDetail() {
    this.personApiService.getPersonDetail$(this.id_quary).subscribe({
      next: (res) => {
        this.personForm.patchValue({
          id: res.id,
          email: res.email,
          first_name: res.first_name,
          last_name: res.last_name,
        });
      },
      error: (err) => {
        console.log(err),
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error getting person detail',
          });
      },
    });
  }
  /**
   * Deletes the person with the specified ID.
   * Displays a success message and navigates back to the people list page upon successful deletion.
   * Displays an error message if the request is unsuccessful.
   */
  deletePerson() {
    this.personApiService.deletePerson$(this.id_quary).subscribe({
      next: (res: {}) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'delete successfully',
        });
        this.returnToPeopleListPage(); // Navigate back to the people list page
      },
      error: (err: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'delete unsuccessfully',
        });
      },
    });
  }
  /**
   * Displays the edit modal dialog.
   * Sets the 'showEditModal' variable to true to show the modal.
   */

  editPersonDetail() {
    this.showEditModal = true;
  }

  /**
   * Navigates back to the people list page.
   */
  returnToPeopleListPage() {
    this.router.navigate(['']);
  }
  /**
   * Handles the form submission event from the edit form.
   * Updates the 'isEditFormDone' variable.
   * Hides the edit modal and fetches the updated person's detail.
   * @param event The form submission event
   */
  onSubmitEditForm(event: any) {
    this.isEditFormDone = event;
    this.showEditModal = false;
    this.getPersonDetail(); // Fetch the updated person's detail after form submission
  }
}
