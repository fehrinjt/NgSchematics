import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { <%= classify(name)%>FormComponent } from './<%= camelize(name)%>-form.component';

describe('<%= classify(name)%>FormComponent', () => {
  let component: <%= classify(name)%>FormComponent;
  let fixture: ComponentFixture<<%= classify(name)%>FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ <%= classify(name)%>FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(<%= classify(name)%>FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
