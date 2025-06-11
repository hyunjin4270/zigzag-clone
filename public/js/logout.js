import { logout } from "./utils/cookie.js";

window.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout');
  if (!logoutBtn) return;

  logoutBtn.addEventListener('click', e => {
    e.preventDefault();
    logout('home.html');
  });
});