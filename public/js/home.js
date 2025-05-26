// src/home.ts
/**
 * id를 이용해 HTML 요소(템플릿)을 얻습니다.
 * 만약 없으면 예외를 발생시킵니다.
 * @param id 얻고자 하는 템플릿의 아이디
 * @returns 템플릿
 */
function getTemplate(id) {
    const template = document.getElementById(id);
    if (!template || template.tagName !== 'TEMPLATE') {
        throw new Error(`템플릿 #${id}을 찾을 수 없습니다.`);
    }
    return template;
}
/**
 * 홈 배너 템플릿에 원하는 내용을 주입하는 메서드입니다.
 * @param data 주입하고자 하는 내용
 */
function renderHomeBanner(data) {
    const template = getTemplate('home-banner-template');
    const fragment = document.importNode(template.content, true);
    const element = fragment.firstElementChild;
    const imageElement = element.querySelector('.slide-img');
    imageElement.src = data.imgSrc;
    imageElement.alt = data.imgAlt ?? '';
    const pageElements = Array.from(element.querySelectorAll('.page-text'));
    pageElements[0].textContent = String(data.currentPage);
    pageElements[1].textContent = String(data.totalPages);
    const titleElements = Array.from(element.querySelectorAll('.slide-title'));
    titleElements[0].textContent = data.titlePrimary ?? '';
    titleElements[1].textContent = data.titleSecondary ?? '';
    const subElement = element.querySelector('.slide-text');
    if (subElement)
        subElement.textContent = data.text ?? '';
    return element;
}
/**
 * 정보기입(변경 예정)
 */
async function init() {
    const container = document.getElementById('home-banner-container');
    if (!container)
        throw new Error('#home-banner-container 가 없습니다.');
    const jsonUrl = new URL('./data/homeBanners.json', import.meta.url).href;
    const res = await fetch(jsonUrl);
    if (!res.ok)
        throw new Error('homeBanners.json 로드 실패');
    const bannersData = await res.json();
    bannersData.banners.forEach(banner => {
        container.appendChild(renderHomeBanner(banner));
    });
}
document.addEventListener('DOMContentLoaded', () => init().catch(console.error));
export {};
