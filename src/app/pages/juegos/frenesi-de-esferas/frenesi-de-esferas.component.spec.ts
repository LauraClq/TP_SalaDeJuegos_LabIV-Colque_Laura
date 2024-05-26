import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrenesiDeEsferasComponent } from './frenesi-de-esferas.component';

describe('FrenesiDeEsferasComponent', () => {
  let component: FrenesiDeEsferasComponent;
  let fixture: ComponentFixture<FrenesiDeEsferasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrenesiDeEsferasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrenesiDeEsferasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
