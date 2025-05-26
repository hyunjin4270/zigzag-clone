// // src/home.ts
import { fetchHomeBanners } from './services/bannerService'
import { renderHomeBanner } from './components/homeBanner'

async function init() {
  const container = document.getElementById('home-banner-container')
  if (!container) throw new Error('#home-banner-container 없음')

  const banners = await fetchHomeBanners()
  banners.forEach(b => container.appendChild(renderHomeBanner(b)))
}

document.addEventListener('DOMContentLoaded', () => {
  init().catch(console.error)
})