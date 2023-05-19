import { Component, Input, OnInit } from '@angular/core';
import { UserServices } from '../services/user-services';
import { person } from '../models/user';
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
  constructor(
    private userService: UserServices,
    private fb: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  personForm: FormGroup = this.fb.group({
    id: [''],
    email: ['', Validators.required],
    last_name: ['', Validators.required],
    first_name: ['', Validators.required],
  });

  action: string = '';
  id_quary!: number;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.action = params['action'];
      this.id_quary = params['id'];
    });

    this.getPersonDetail();
  }

  editPersonDetail() {
    this.action = 'edit';
    this.showEditDialog = true;
  }
  getPersonDetail() {
    this.userService.getPerson(this.id_quary).subscribe({
      next: (res) => {
        this.personForm.patchValue({
          email: res.email,
          first_name: res.first_name,
          last_name: res.last_name,
          id: res.id,
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
    this.userService.deleteUser(this.id_quary).subscribe({
      next: (res) => {
        console.log('delete successfully');
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'delete successfully',
        });
        this.showPeopleList();
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
  showPeopleList() {
    this.router.navigate(['']);
  }
  updateDetail() {
    let user: person = {
      id: this.personForm.controls['id'].value,
      first_name: this.personForm.controls['first_name'].value,
      last_name: this.personForm.controls['last_name'].value,
      email: this.personForm.controls['email'].value,
    };

    this.userService.updateUser(this.id_quary, user).subscribe({
      next: (res) => {
        console.log('update successfully');
        this.showEditDialog = false;
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
  edit(property: string) {
    this.userService
      .updateUser(
        this.id_quary,
        JSON.stringify(this.personForm.controls[property].value)
      )
      .subscribe({
        next: (res) => {
          console.log('update successfully');
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
  cancelEditModal() {
    this.showEditDialog = false;
  }
}
