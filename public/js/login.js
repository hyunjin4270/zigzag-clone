"use strict";

window.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.querySelector('.login-button');
    const toggleIcons = document.querySelectorAll('.password-wrapper');
    toggleIcons.forEach(icon => {
        icon.style.cursor = 'pointer';
        const wrapper = icon.closest('.login-design');
        if (!wrapper) return;

        // 
        const input = wrapper.querySelector('input[type="password"], input[type="text"]');
        if (!input) return;

        // 패스워드 아이콘 교체
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

document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.querySelector(".login-button");

    const validEmail = "admin";
    const validPassword = "1234";

    loginButton.addEventListener("click", function () {
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (email === validEmail && password === validPassword) {
            document.cookie = "isLoggedIn=true; path=/";
            window.location.href = "home.html";
        } else {
            window.location.href = "login-failed.html";
        }
    });
});

