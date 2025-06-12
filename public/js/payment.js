document.addEventListener('DOMContentLoaded', () => {
  const master      = document.getElementById('agreementAll');
  const items       = document.querySelectorAll('.custom-checkbox.item');
  const payButton   = document.getElementById('payPayment');

  function updateStates() {
    const allItemsChecked = Array.from(items).every(item => item.checked);
    master.checked       = allItemsChecked;
    payButton.disabled   = !allItemsChecked;
  }

  master.addEventListener('change', () => {
    items.forEach(item => item.checked = master.checked);
    updateStates();
  });

  items.forEach(item => {
    item.addEventListener('change', updateStates);
  });

  payButton.addEventListener('click', () => {
    if (!payButton.disabled) {
      alert('구매완료되었습니다!');
      window.location.href = 'home.html';
    }
  });

  updateStates();
});
