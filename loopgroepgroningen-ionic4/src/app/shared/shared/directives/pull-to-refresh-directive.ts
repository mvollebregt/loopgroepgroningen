import {Directive, EventEmitter, OnDestroy, Output} from '@angular/core';
import {Content} from '@ionic/angular';

@Directive({
  selector: '[lgPullToRefresh]'
})
export class PullToRefreshDirective implements OnDestroy {

  @Output() pullTop = new EventEmitter<void>();
  @Output() pullBottom = new EventEmitter<void>();

  private readonly touchStartListener = this.onTouchStart.bind(this);
  private readonly touchEndListener = this.onTouchEnd.bind(this);

  private touchStart: number;
  private scrollStart: number;
  private scrollElement: HTMLElement;

  constructor(private content: Content) {
    this.content.getScrollElement().then(scrollElement => {
      this.scrollElement = scrollElement;
      this.scrollElement.addEventListener('touchstart', this.touchStartListener);
      this.scrollElement.addEventListener('touchend', this.touchEndListener);
    });
  }

  ngOnDestroy() {
    this.scrollElement.removeEventListener('touchstart', this.touchStartListener);
    this.scrollElement.removeEventListener('touchend', this.touchEndListener);
  }

  private onTouchStart(event: TouchEvent) {
    this.touchStart = event.changedTouches[0].screenY;
    this.scrollStart = this.scrollElement.scrollTop;
  }

  private onTouchEnd(event: TouchEvent) {
    const touchEnd = event.changedTouches[0].screenY;
    if (this.scrollElement.scrollTop === this.scrollStart) {
      if (this.touchStart < touchEnd) {
        this.pullTop.emit();
      } else if (this.touchStart > touchEnd) {
        this.pullBottom.emit();
      }
    }
  }
}
