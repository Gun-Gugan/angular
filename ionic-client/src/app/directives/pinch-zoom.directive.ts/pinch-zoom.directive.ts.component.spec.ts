import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PinchZoomDirectiveTsComponent } from './pinch-zoom.directive.ts.component';

describe('PinchZoomDirectiveTsComponent', () => {
  let component: PinchZoomDirectiveTsComponent;
  let fixture: ComponentFixture<PinchZoomDirectiveTsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PinchZoomDirectiveTsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PinchZoomDirectiveTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
