
/**
 * 컴포넌트를 구성할 때 많이 사용하는 코드를 다른 파일또한 쓸 수 있도록 밖으로 빼냈습니다.
 * @param filename  json(다른 파일도 가능)파일
 * @returns         해당 파일의 절대경로
 */
export function getJsonUrl(filename: string): string {
  return new URL(`./data/${filename}`, import.meta.url).href;
}
