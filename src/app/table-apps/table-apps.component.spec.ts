import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAppsComponent } from './table-apps.component';

describe('TableAppsComponent', () => {
  let component: TableAppsComponent;
  let fixture: ComponentFixture<TableAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableAppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
