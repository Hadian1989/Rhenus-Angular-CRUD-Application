import { Component, OnInit } from '@angular/core';
import { person } from '../models/user';
import { UserServices } from '../services/user-services';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
})
export class PeopleComponent {
  constructor(private userService: UserServices) {
    this.getPeople();
  }
  users!: person[];
  user: person = { id: 0, first_name: '', last_name: '', email: '' };

  addUser() {
    this.userService.addUser(this.user).subscribe({
      next: (res) => {
        this.users.push(this.user);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private getPeople() {
    this.userService.getPeople().subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => console.log(err),
    });
  }
}
