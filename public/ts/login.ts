window.addEventListener('DOMContentLoaded', () => {
  const toggleIcons = document.querySelectorAll<HTMLImageElement>('.password-wrapper');

  toggleIcons.forEach(icon => {
    const wrapper = icon.closest('.login-design');
    if (!wrapper) return;
    
    const input = wrapper.querySelector<HTMLInputElement>('input[type="password"], input[type="text"]');
    if (!input) return;
    icon.addEventListener('click', () => {
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      icon.src = isHidden ? './assets/imgs/icon/eye-on.svg' : './assets/imgs/icon/eye-off.svg';
    });
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('email') as HTMLInputElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  const loginButton = document.querySelector<HTMLButtonElement>('.login-button')!;

  document.querySelectorAll<HTMLImageElement>('.password-wrapper').forEach(icon => {
    const input = icon.closest('.login-design')!.querySelector<HTMLInputElement>('input')!;
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