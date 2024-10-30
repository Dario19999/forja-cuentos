import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaleListComponent } from './tale-list.component';

describe('TaleListComponent', () => {
  let component: TaleListComponent;
  let fixture: ComponentFixture<TaleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaleListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
