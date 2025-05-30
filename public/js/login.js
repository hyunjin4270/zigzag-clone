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
window.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.querySelector('.login-button');
    document.querySelectorAll('.password-wrapper').forEach(icon => {
        const input = icon.closest('.login-design').querySelector('input');
        icon.style.cursor = 'pointer';
        icon.addEventListener('click', () => {
            const isHidden = input.type === 'password';
            input.type = isHidden ? 'text' : 'password';
            icon.src = isHidden
                ? './assets/imgs/icon/eye-on.svg'
                : './assets/imgs/icon/eye-off.svg';
        });
    });
    const updateButtonState = () => {
        const hasEmail = emailInput.value.trim().length > 0;
        const hasPassword = passwordInput.value.trim().length > 0;
        loginButton.disabled = !(hasEmail && hasPassword);
    };
    emailInput.addEventListener('input', updateButtonState);
    passwordInput.addEventListener('input', updateButtonState);
    updateButtonState();
});
