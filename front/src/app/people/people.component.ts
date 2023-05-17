import { Component, OnInit } from '@angular/core';
import { IPerson } from '../models/person';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
})
export class PeopleComponent implements OnInit {



  people: IPerson[];

  selectedPerson: IPerson;

  constructor(private productService: ApiService) {}

  ngOnInit() {
    this.productService.getPeople().subscribe((data) => {
      this.people = data;
    });
  }
}
