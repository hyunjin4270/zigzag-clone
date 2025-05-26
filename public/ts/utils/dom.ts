/**
 * id를 이용해 HTML 요소(템플릿)을 얻습니다.
 * 만약 없으면 예외를 발생시킵니다.
 * @param id 얻고자 하는 템플릿의 아이디
 * @returns 템플릿
 */
export function getTemplate(id: string): HTMLTemplateElement {
  const template = document.getElementById(id);
  if (!template || template.tagName !== 'TEMPLATE') {
    throw new Error(`템플릿 #${id}을 찾을 수 없습니다.`);
  }
  return template as HTMLTemplateElement;
}