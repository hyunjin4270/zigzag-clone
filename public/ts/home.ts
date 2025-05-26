// src/home.ts

/**
 * 홈 배너에서 사용할 요소의 타입을 정의하였습니다
 */
interface HomeBannerData {
  imgSrc: string
  imgAlt: string
  titlePrimary?: string
  titleSecondary?: string
  text?: string
  currentPage: number
  totalPages: number
}

/**
 * id를 이용해 HTML 요소(템플릿)을 얻습니다.
 * 만약 없으면 예외를 발생시킵니다.
 * @param id 얻고자 하는 템플릿의 아이디
 * @returns 템플릿
 */
function getTemplate(id: string): HTMLTemplateElement {
  const template = document.getElementById(id)
  if (!template || template.tagName !== 'TEMPLATE') {
    throw new Error(`템플릿 #${id}을 찾을 수 없습니다.`)
  }
  return template as HTMLTemplateElement
}

/**
 * 홈 배너 템플릿에 원하는 내용을 주입하는 메서드입니다.
 * @param data 주입하고자 하는 내용
 */
function renderHomeBanner(data: HomeBannerData): HTMLElement {
  const template = getTemplate('home-banner-template')
  const fragment = document.importNode(template.content, true)
  const element = fragment.firstElementChild as HTMLElement

  const imageElement = element.querySelector<HTMLImageElement>('.slide-img')!
  imageElement.src = data.imgSrc
  imageElement.alt = data.imgAlt ?? ''

  const pageElements = Array.from(element.querySelectorAll<HTMLElement>('.page-text')!)
  pageElements[0].textContent = String(data.currentPage)
  pageElements[1].textContent = String(data.totalPages)

  const titleElements = Array.from(element.querySelectorAll<HTMLElement>('.slide-title'))
  titleElements[0].textContent = data.titlePrimary ?? ''
  titleElements[1].textContent = data.titleSecondary ?? ''

  const subTitleElement = element.querySelector<HTMLElement>('.slide-text')!
  subTitleElement.textContent = data.text ?? ''

  return element
}

/**
 * 정보기입(변경 예정)
 */
async function init(): Promise<void> {
  const container = document.getElementById('home-banner-container')
  if (!container) throw new Error('#home-banner-container 가 없습니다.')

  const jsonUrl = new URL('./data/homeBanners.json', import.meta.url);
  const data = await fetch(jsonUrl.href);``
  if (!data.ok) throw new Error('homeBanners.json 로드 실패')

  const bannersData: { banners: HomeBannerData[] } = await data.json();
  const totalPages: number = bannersData.banners.length;

  bannersData.banners.forEach((banner, index) => {
    const currentPageInfo = {
      ...banner,
      currentPage: index + 1,
      totalPages: totalPages
    }
    container.appendChild(renderHomeBanner(currentPageInfo));
  });
}

document.addEventListener('DOMContentLoaded', () => init().catch(console.error))
