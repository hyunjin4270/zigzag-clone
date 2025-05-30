import { fetchHomeBanners } from './services/bannerService.js';
import { renderHomeBanner } from './components/homeBanner.js';
import BannerSlider from './components/BannerSlider.js';

async function init() {
  const container = document.getElementById('home-banner-container');
  const counterEl = document.querySelector<HTMLElement>('.slide-counter');
  if (!container) throw new Error('#home-banner-container 없음');
  if (!counterEl) throw new Error('.slide-counter 없음');

  const banners = await fetchHomeBanners();
  const totalPages = banners.length;

  container.innerHTML = '';
  banners.forEach((b, idx) => {
    const data = { ...b, currentPage: idx + 1, totalPages };
    const bannerEl = renderHomeBanner(data);
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.appendChild(bannerEl);
    container.appendChild(slide);
  });

  new BannerSlider(container, counterEl, 5000);
}

document.addEventListener('DOMContentLoaded', () => init().catch(console.error));