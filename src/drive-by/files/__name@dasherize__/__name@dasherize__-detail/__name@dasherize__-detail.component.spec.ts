import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { <%= classify(name)%>DetailComponent } from './<%= camelize(name)%>-detail.component';

describe('<%= classify(name)%>DetailComponent', () => {
  let component: <%= classify(name)%>DetailComponent;
  let fixture: ComponentFixture<<%= classify(name)%>DetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ <%= classify(name)%>DetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(<%= classify(name)%>DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
