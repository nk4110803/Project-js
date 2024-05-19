

const dos = {
  login_up: document.getElementById('login_up'),
  number_card: document.getElementById('number_card'),
  pwdtokef: document.getElementById('pwdtokef'),
  pwdcvc: document.getElementById('pwdcvc'),
  checkbox_card: document.getElementById('checkbox_card')
};

dos.login_up.onclick = () => {
  if (!dos.number_card.value || !dos.pwdtokef.value || !dos.pwdcvc.value) {
    alert("נא למלא את כל השדות  ");
    return false;
  }
  if (parseInt(dos.pwdcvc.value) >= 999) {
    alert("גדול משלוש ספרות cvc מספר");
    return false;
  }
  if (parseInt(dos.pwdcvc.value) < 99) {
    alert("קטן משלוש ספרות cvc מספר");
    return false;
  }
    localStorage.setItem("baskate", "[]");
    localStorage.setItem("baskate1", "[]");
    localStorage.setItem("cnt", "0");
    alert("ההזמנה בוצעה בהצלחה")
  location.href = './../html/home.html';
};