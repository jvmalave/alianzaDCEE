import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCustomizeComponent } from './list-customize.component';

describe('ListConfigComponent', () => {
  let component: ListCustomizeComponent;
  let fixture: ComponentFixture<ListCustomizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCustomizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCustomizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
