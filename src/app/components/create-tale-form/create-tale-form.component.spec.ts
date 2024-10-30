import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaleFormComponent } from './create-tale-form.component';

describe('CreateTaleFormComponent', () => {
  let component: CreateTaleFormComponent;
  let fixture: ComponentFixture<CreateTaleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTaleFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTaleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
