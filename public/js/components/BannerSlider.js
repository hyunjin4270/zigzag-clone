export default class BannerSlider {
    container;
    track;
    slides = [];
    counterEl;
    currentIndex = 1;
    slideWidth = 0;
    timerId;
    intervalMs;
    /**
     * Carousel slider 클래스
     * @param container 슬라이드 컨테이너 요소(.carousel)
     * @param counterEl 페이지 카운터를 업데이트할 요소(.slide-counter)
     * @param intervalMs 자동 넘김 간격(ms)
     */
    constructor(container, counterEl, intervalMs = 5000) {
        this.container = container;
        this.counterEl = counterEl;
        this.intervalMs = intervalMs;
        this.track = document.createElement('div');
        this.track.className = 'track';
        this.setupTrack();
        this.updateDimensions();
        window.addEventListener('resize', this.handleResize, { passive: true });
        document.addEventListener('visibilitychange', this.handleVisibility, { passive: true });
        this.updateCounter();
        this.startAutoPlay();
    }
    setupTrack() {
        // 기존 .slide 요소 모으기
        this.slides = Array.from(this.container.querySelectorAll('.slide'));
        // 컨테이너 초기화 후 트랙 추가
        this.container.innerHTML = '';
        this.container.appendChild(this.track);
        // 슬라이드를 트랙에 옮기기
        this.slides.forEach(slide => this.track.appendChild(slide));
        // 무한 루프용 클론
        const firstClone = this.slides[0].cloneNode(true);
        const lastClone = this.slides[this.slides.length - 1].cloneNode(true);
        this.track.appendChild(firstClone);
        this.track.insertBefore(lastClone, this.track.firstChild);
        this.track.addEventListener('transitionend', () => this.onTransitionEnd());
    }
    updateDimensions() {
        this.slideWidth = this.container.clientWidth;
        const total = this.slides.length + 2;
        this.track.style.width = `${this.slideWidth * total}px`;
        Array.from(this.track.children).forEach(child => {
            child.style.flex = `0 0 ${this.slideWidth}px`;
        });
        this.jumpTo(this.currentIndex, false);
    }
    onTransitionEnd() {
        const total = this.slides.length;
        let reset = false;
        if (this.currentIndex === total + 1) {
            this.currentIndex = 1;
            reset = true;
        }
        else if (this.currentIndex === 0) {
            this.currentIndex = total;
            reset = true;
        }
        if (reset) {
            this.jumpTo(this.currentIndex, false);
        }
        this.updateCounter();
    }
    jumpTo(index, animate = true) {
        if (!animate)
            this.track.style.transition = 'none';
        this.track.style.transform = `translateX(-${this.slideWidth * index}px)`;
        if (!animate) {
            void this.track.offsetWidth;
            this.track.style.transition = '';
        }
    }
    moveNext() {
        this.currentIndex++;
        const total = this.slides.length;
        const displayIdx = this.currentIndex > total ? 1 : this.currentIndex;
        this.updateCounter(displayIdx);
        this.jumpTo(this.currentIndex);
    }
    updateCounter(displayIdx = this.currentIndex) {
        const texts = Array.from(this.counterEl.querySelectorAll('.page-text'));
        if (texts.length >= 2) {
            texts[0].textContent = String(displayIdx);
            texts[1].textContent = String(this.slides.length);
        }
    }
    startAutoPlay() {
        if (this.timerId != null)
            return;
        this.timerId = window.setInterval(() => this.moveNext(), this.intervalMs);
    }
    stopAutoPlay() {
        if (this.timerId == null)
            return;
        clearInterval(this.timerId);
        this.timerId = undefined;
    }
    handleVisibility = () => {
        if (document.visibilityState === 'hidden') {
            this.stopAutoPlay();
        }
        else {
            this.startAutoPlay();
        }
    };
    handleResize = () => this.updateDimensions();
    destroy() {
        this.stopAutoPlay();
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('visibilitychange', this.handleVisibility);
    }
}
