export function getCookie(name) {
  const match = document.cookie.match(
    new RegExp('(?:^|; )' + name + '=([^;]*)')
  );
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * name 이름의 쿠키를 즉시 삭제합니다.
 * @param {string} name
 */
export function clearCookie(name) {
  document.cookie = `${name}=; path=/; max-age=0`;
}

/**
 * 로그아웃 처리: 로그인 쿠키 삭제 후 지정 URL로 이동
 * @param {string} [redirectUrl='home.html']
 */
export function logout(redirectUrl = 'home.html') {
  clearCookie('isLoggedIn');
  window.location.href = redirectUrl;
}