"use strict";
window.addEventListener('DOMContentLoaded', () => {
    const toggleIcons = document.querySelectorAll('.password-wrapper');
    toggleIcons.forEach(icon => {
        const wrapper = icon.closest('.login-design');
        if (!wrapper)
            return;
        const input = wrapper.querySelector('input[type="password"], input[type="text"]');
        if (!input)
            return;
        icon.addEventListener('click', () => {
            const isHidden = input.type === 'password';
            input.type = isHidden ? 'text' : 'password';
            icon.src = isHidden ? './assets/imgs/icon/eye-on.svg' : './assets/imgs/icon/eye-off.svg';
        });
    });
});
