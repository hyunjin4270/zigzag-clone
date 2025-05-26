import { HomeBannerData } from '../types/HomeBannersData'
import { getJsonUrl } from '../utils/url'

/**
 * 배너의 JSON 데이터를 꺼내는 메서드입니다.
 * @returns 배너 데이터
 */
export async function fetchHomeBanners(): Promise<HomeBannerData[]> {
  const response = await fetch(getJsonUrl('homeBanners.json'));
  if (!response.ok) throw new Error('배너 데이터 로드 실패');
  const { banners } = await response.json() as { banners: HomeBannerData[] }
  return banners;
}