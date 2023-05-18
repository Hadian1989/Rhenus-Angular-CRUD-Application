import { Component, OnInit } from '@angular/core';
import { person } from '../models/user';
import { UserServices } from '../services/user-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
})
export class PeopleComponent {
  constructor(private userService: UserServices,private router: Router,) {
    this.getPeople();
  }
  users!: person[];
  user: person = { id: 0, first_name: '', last_name: '', email: '' };

  modePage() {this.router.navigate(['dashboard/produce-recipe-new/step4']);}

  private getPeople() {
    this.userService.getPeople().subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => console.log(err),
    });
  }
  viewPersonDetail(userId: number) {
    this.userService.getPerson(userId).subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (err) => console.log(err),
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
      error: (err) => console.log(err),
    });
  }
  deletePerson(userId: number) {
    this.userService.deleteUser(userId).subscribe({
      next: (res) => {
        console.log('delete successfully');
      },
      error: (err) => console.log(err),
    });
  }
}
