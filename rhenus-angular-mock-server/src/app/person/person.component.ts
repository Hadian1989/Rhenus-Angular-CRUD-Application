import { Component, OnInit } from '@angular/core';
import { PersonApiServices } from '../services/person-api-services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  providers: [MessageService],
})
export class PersonComponent implements OnInit {
  showEditDialog!: boolean;
  apiAction: string = '';
  id_quary: number = 0;
  personForm: FormGroup = this.fb.group({
    id: [''],
    email: ['', Validators.required],
    last_name: ['', Validators.required],
    first_name: ['', Validators.required],
  });
  showEditModal: boolean = false;
  isEditFormSubmitted: any;

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
    this.getPersonDetail();
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
            detail: err,
          });
      },
    });
  }
  deletePerson() {
    this.personApiService.deletePerson$(this.id_quary).subscribe({
      next: (res) => {
        console.log('delete successfully');
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'delete successfully',
        });
        this.returnToPeopleListPage();
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

  editPersonDetail() {
    this.showEditModal = true;
  }

  returnToPeopleListPage() {
    this.router.navigate(['']);
  }
  onSubmitEditForm(event: any) {
    this.isEditFormSubmitted = event;
    this.showEditModal = false;
  }
}
