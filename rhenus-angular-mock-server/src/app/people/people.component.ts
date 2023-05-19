import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { person } from '../models/user';
import { UserServices } from '../services/user-services';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
  providers: [MessageService],
})
export class PeopleComponent implements OnInit {
  cols: any[] = [];
  users!: person[];
  user!: person;
  personForm: FormGroup = this.fb.group({
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
      [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
    ],
  });

  action!: string;

  constructor(
    private userService: UserServices,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.getPeople();
  }
  ngOnInit(): void {
    this.cols = [
      { header: 'ID' },
      { header: 'First Name' },
      { header: 'Last Name' },
      { header: 'Email' },
      { header: 'Action' },
    ];
  }

  private getPeople() {
    this.userService.getPeople().subscribe({
      next: (res) => {
        this.users = res;
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
    this.userService.deleteUser(userId).subscribe({
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
  showDialog: boolean = false;
  showCreateModal() {
    this.showDialog = true;
  }
  cancelCreateModal() {
    this.showDialog = false;
  }
  publishEvent(action: string, personId?: number) {
    if (action === 'detail') {
      this.router.navigate([`/person/${action}/${personId}`]);
    } else if (action === 'edit') {
      this.action = action;
      this.router.navigate([`/person/${action}/${personId}`]);
    }
  }
  createPerson() {
    let user: person = {
      first_name: this.personForm.controls['first_name'].value,
      last_name: this.personForm.controls['last_name'].value,
      email: this.personForm.controls['email'].value,
    };
    this.userService.addUser(user).subscribe({
      next: (res) => {
        console.log('create successfully');
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'create successfully',
        });
        this.getPeople();
        this.showDialog = false;
      },
      error: (err) => {},
    });
  }
}
