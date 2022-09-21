import { Component, OnInit } from '@angular/core';
import {TestingService} from "./testing.service";

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css'],
  providers: [TestingService]
})
export class TestingComponent implements OnInit {
  test!: {
    name: string
  };
  constructor(private testService: TestingService) { }

  ngOnInit(): void {
    this.test = this.testService.test;
  }

}
