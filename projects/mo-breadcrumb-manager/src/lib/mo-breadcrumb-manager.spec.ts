import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoBreadcumbManager } from './mo-breadcrumb-manager';

describe('MoBreadcumbManager', () => {
  let component: MoBreadcumbManager;
  let fixture: ComponentFixture<MoBreadcumbManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoBreadcumbManager],
    }).compileComponents();

    fixture = TestBed.createComponent(MoBreadcumbManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
