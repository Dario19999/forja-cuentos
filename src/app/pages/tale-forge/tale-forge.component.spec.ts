import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaleForgeComponent } from './tale-forge.component';

describe('TaleForgeComponent', () => {
  let component: TaleForgeComponent;
  let fixture: ComponentFixture<TaleForgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaleForgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaleForgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
