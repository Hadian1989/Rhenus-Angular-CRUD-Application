import { Component, OnInit } from '@angular/core';
import { person } from '../models/user';
import { UserServices } from '../services/user-services';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

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
  constructor(
    private userService: UserServices,
    private router: Router,
    private messageService: MessageService
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

  modePage() {
    this.router.navigate(['dashboard/produce-recipe-new/step4']);
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
  viewPersonDetail(userId: number) {
    this.userService.getPerson(userId).subscribe({
      next: (res) => {
        this.user = res;
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
  editPerson(userId: number) {
    let user: person = this.users.filter((user) => {
      user.id = userId;
    })[0];
    this.userService.updateUser(userId, user).subscribe({
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
  deletePerson(userId: number) {
    this.userService.deleteUser(userId).subscribe({
      next: (res) => {
        console.log('delete successfully');
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'delete successfully' });
        this.getPeople()
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
  displayResponsive: boolean = false
  showResponsiveDialog() {
    this.displayResponsive = true
  }
}
