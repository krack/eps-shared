import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsFormComponentComponent } from './ads-form-component.component';

describe('AdsFormComponentComponent', () => {
  let component: AdsFormComponentComponent;
  let fixture: ComponentFixture<AdsFormComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsFormComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
