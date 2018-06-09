import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitionNodeComponent } from './transition-node.component';

describe('TransitionNodeComponent', () => {
  let component: TransitionNodeComponent;
  let fixture: ComponentFixture<TransitionNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransitionNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitionNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
