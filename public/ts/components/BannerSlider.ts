export default class BannerSlider {
  private container: HTMLElement;
  private track: HTMLDivElement;
  private slides: HTMLElement[] = [];
  private currentIndex: number = 1;
  private slideWidth: number = 0;
  private timerId?: number;
  private intervalMs: number;

  constructor(container: HTMLElement, intervalMs = 5000) {
    this.container = container;
    this.intervalMs = intervalMs;
    this.track = document.createElement('div');
    this.track.className = 'track';

    this.setupTrack();
    this.updateDimensions();
    window.addEventListener('resize', this.handleResize, { passive: true });
    document.addEventListener('visibilitychange', this.handleVisibility, { passive: true });

    this.startAutoPlay();
  }

  private setupTrack() {
    this.slides = Array.from(
      this.container.querySelectorAll<HTMLElement>('.slide')
    );
    this.container.innerHTML = '';
    this.container.appendChild(this.track);
    this.slides.forEach(slide => this.track.appendChild(slide));

    const firstClone = this.slides[0].cloneNode(true) as HTMLElement;
    const lastClone = this.slides[this.slides.length - 1].cloneNode(true) as HTMLElement;
    this.track.appendChild(firstClone);
    this.track.insertBefore(lastClone, this.track.firstChild);

    this.track.addEventListener('transitionend', () => this.onTransitionEnd());
  }

  private updateDimensions() {
    this.slideWidth = this.container.clientWidth;
    const total = this.slides.length + 2;
    this.track.style.width = `${this.slideWidth * total}px`;

    Array.from(this.track.children).forEach(child => {
      (child as HTMLElement).style.flex = `0 0 ${this.slideWidth}px`;
    });

    this.jumpTo(this.currentIndex, false);
  }

  private onTransitionEnd() {
    const total = this.slides.length;
    if (this.currentIndex === total + 1) {
      this.currentIndex = 1;
      this.jumpTo(this.currentIndex, false);
    } else if (this.currentIndex === 0) {
      this.currentIndex = total;
      this.jumpTo(this.currentIndex, false);
    }
  }

  private jumpTo(index: number, animate = true) {
    if (!animate) this.track.style.transition = 'none';
    this.track.style.transform = `translateX(-${this.slideWidth * index}px)`;
    if (!animate) {
      void this.track.offsetWidth;
      this.track.style.transition = '';
    }
  }

  private moveNext() {
    this.currentIndex++;
    this.jumpTo(this.currentIndex);
  }

  private startAutoPlay() {
    if (this.timerId != null) return;
    this.timerId = window.setInterval(() => this.moveNext(), this.intervalMs);
  }

  private stopAutoPlay() {
    if (this.timerId == null) return;
    clearInterval(this.timerId);
    this.timerId = undefined;
  }

  private handleVisibility = () => {
    if (document.visibilityState === 'hidden') {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay();
    }
  }

  private handleResize = () => this.updateDimensions();

  public destroy() {
    this.stopAutoPlay();
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('visibilitychange', this.handleVisibility);
  }
}
