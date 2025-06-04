document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.querySelector(".login-button");
    const errorMessage = document.getElementById("errorMessage");

    let failedAttempts = 0;

    const validEmail = "admin";
    const validPassword = "1234";

    errorMessage.textContent = "아이디 또는 비밀번호를 n회 틀렸어요";
    errorMessage.style.display = "none";

    loginButton.addEventListener("click", function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (email === validEmail && password === validPassword) {
            errorMessage.style.display = "none";
            window.location.href = "payment.html";
        } else {
            failedAttempts++;

            const originalText = errorMessage.textContent;
            const updatedText = originalText.replace(/n|[0-9]+/g, failedAttempts);
            errorMessage.textContent = updatedText;

            errorMessage.style.display = "block";
        }
    });
});