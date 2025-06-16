import { getCookie } from './utils/cookie.js';

document.addEventListener('DOMContentLoaded', () => {
    const buy = document.getElementById('buy');
    if (!buy) return;

    buy.addEventListener('click', e => {
        e.preventDefault();

        const isLoggedIn = getCookie('isLoggedIn') === 'true';
        if (isLoggedIn) {
            window.location.href = '../payment-dp5.html';
        } else {
            window.location.href = '../login.html';
        }
    });
});