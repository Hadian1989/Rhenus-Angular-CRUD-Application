import { Component, OnInit } from '@angular/core';
import { UserServices } from '../services/user-services';
import { person } from '../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit {
  constructor(private userService: UserServices, private fb: FormBuilder) {}
  personForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    last_name: ['', Validators.required],
    first_name: ['', Validators.required],
  });
  ngOnInit(): void {}
  displayResponsive: boolean = false;

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
}
