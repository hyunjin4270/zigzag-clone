import { getJsonUrl } from '../utils/url.js';

/**
 * 배너의 JSON 데이터를 꺼내는 메서드입니다.
 * @returns 배너 데이터
 */
export async function fetchHomeBanners() {
    const response = await fetch(getJsonUrl('../data/homeBanners.json'));
    if (!response.ok)
        throw new Error('배너 데이터 로드 실패');
    const { banners } = await response.json();
    return banners;
}
