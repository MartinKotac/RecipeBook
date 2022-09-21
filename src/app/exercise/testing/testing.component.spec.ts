import { TestBed } from '@angular/core/testing';

import { TestingComponent } from './testing.component';
import {TestingService} from "./testing.service";

describe('TestingComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestingComponent ]
    });
  });

  it('should create the app',() => {
    let fixture = TestBed.createComponent(TestingComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  })

  it('should use the user name from the service', () => {
    let fixture = TestBed.createComponent(TestingComponent);
    let app = fixture.debugElement.componentInstance;
    let testService = fixture.debugElement.injector.get(TestingService);
    fixture.detectChanges();
    expect(testService.test.name).toEqual(app.test.name);

  })
});
