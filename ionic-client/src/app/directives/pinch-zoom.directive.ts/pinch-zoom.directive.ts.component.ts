import { Directive, ElementRef } from '@angular/core';
import Hammer from 'hammerjs';

@Directive({
  selector: '[pinchZoom]'
})
export class PinchZoomDirective {

  private scale = 1;
  private lastScale = 1;
  private panX = 0;
  private panY = 0;
  private lastPanX = 0;
  private lastPanY = 0;
  private hammer: HammerManager | undefined;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.hammer = new Hammer(this.el.nativeElement);

    this.hammer.get('pinch').set({ enable: true });
    this.hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

    // Pinch Zoom
    this.hammer.on('pinchmove', (ev: any) => {
      this.scale = this.lastScale * ev.scale;
      this.updateTransform();
    });

    this.hammer.on('pinchend', () => {
      this.lastScale = this.scale;
    });

    // Pan / Drag
    this.hammer.on('panmove', (ev: any) => {
      this.panX = this.lastPanX + ev.deltaX;
      this.panY = this.lastPanY + ev.deltaY;
      this.updateTransform();
    });

    this.hammer.on('panend', () => {
      this.lastPanX = this.panX;
      this.lastPanY = this.panY;
    });
  }

  updateTransform() {
    this.el.nativeElement.style.transform =
      `translate(${this.panX}px, ${this.panY}px) scale(${this.scale})`;
  }
}
