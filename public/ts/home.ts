// src/app.ts

interface HomeBannerData {
  imgSrc: string
  imgAlt?: string
  titlePrimary: string
  titleSecondary: string
  text: string
  currentPage: number
  totalPages: number
}

function getTemplate(id: string): HTMLTemplateElement {
  const tpl = document.getElementById(id)
  if (!tpl || tpl.tagName !== 'TEMPLATE') {
    throw new Error(`템플릿 #${id}을 찾을 수 없습니다.`)
  }
  return tpl as HTMLTemplateElement
}

function renderHomeBanner(data: HomeBannerData): HTMLElement {
  const tpl = getTemplate('home-banner-template')
  const fragment = document.importNode(tpl.content, true)
  const el = fragment.firstElementChild as HTMLElement

  const imgEl = el.querySelector<HTMLImageElement>('.slide-img')!
  imgEl.src = data.imgSrc
  imgEl.alt = data.imgAlt ?? ''

  const pageEls = Array.from(el.querySelectorAll<HTMLElement>('.page-text'))
  if (pageEls.length >= 2) {
    pageEls[0].textContent = String(data.currentPage)
    pageEls[1].textContent = String(data.totalPages)
  }

  const titleEls = Array.from(el.querySelectorAll<HTMLElement>('.slide-title'))
  if (titleEls.length >= 2) {
    titleEls[0].textContent = data.titlePrimary
    titleEls[1].textContent = data.titleSecondary
  }

  el.querySelector<HTMLElement>('.slide-text')!.textContent = data.text

  return el
}

async function init() {
  const sampleData: HomeBannerData = {
    imgSrc: './assets/imgs/farm/202504050530590972_086517.jpg',
    imgAlt: '배너 이미지',
    titlePrimary: '꾸밈레벨별 코디 추천',
    titleSecondary: '10% 쿠폰 발급 중',
    text: '편한 원마일웨어부터 하객룩까지',
    currentPage: 30,
    totalPages: 42,
  }

  const container = document.getElementById('home-banner-container')
  if (!container) throw new Error('#home-banner-container 가 없습니다.')

  container.appendChild(renderHomeBanner(sampleData))
}

document.addEventListener('DOMContentLoaded', () => {
  init().catch(console.error)
})
