import { getTemplate } from '../utils/dom.js';
/**
 * 홈 배너 템플릿에 원하는 내용을 주입하는 메서드입니다.
 * @param data 주입하고자 하는 내용
 */
export function renderHomeBanner(data) {
    const template = getTemplate('home-banner-template');
    const fragment = document.importNode(template.content, true);
    const element = fragment.firstElementChild;
    const image = element.querySelector('.slide-img');
    image.src = data.imgSrc;
    image.alt = data.imgAlt ?? '';
    const titles = Array.from(element.querySelectorAll('.slide-title'));
    titles[0].textContent = data.titlePrimary ?? '';
    titles[1].textContent = data.titleSecondary ?? '';
    const subTitle = element.querySelector('.slide-text');
    subTitle.textContent = data.text ?? '';
    return element;
}
