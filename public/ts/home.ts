// // src/home.ts
import { fetchHomeBanners } from './services/bannerService.js'
import { renderHomeBanner } from './components/homeBanner.js'

async function init() {
  const container = document.getElementById('home-banner-container')
  if (!container) throw new Error('#home-banner-container 없음')

  const banners = await fetchHomeBanners()
  const totalPages = banners.length

  banners.forEach((b, idx) => {
    const dataWithPaging = {
      ...b,
      currentPage: idx + 1,
      totalPages
    }
    container.appendChild(renderHomeBanner(dataWithPaging))
  })
}


document.addEventListener('DOMContentLoaded', () => {
  init().catch(console.error)
})