import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
  userForm: FormGroup = this.fb.group({
    email: [''],
    first_name: [''],
    last_name: [''],
  });
  submitUserInfo(property: string) {}
  cancelEditUserInfo(property: string) {}
  edit(property: string) {}
}
