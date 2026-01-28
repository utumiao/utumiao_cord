document.addEventListener('DOMContentLoaded', () => {

const state = {};

/* ===== ページ管理 ===== */
const pages = document.querySelectorAll('.page');
const pageMenu = document.getElementById('pageMenu');

pages.forEach(p => {
  const item = document.createElement('div');
  item.textContent = p.dataset.title;
  item.onclick = () => showPage(p.id);
  pageMenu.appendChild(item);
});

document.getElementById('pageMenuBtn').onclick = () => {
  pageMenu.style.display =
    pageMenu.style.display === 'block' ? 'none' : 'block';
};

function showPage(id) {
  pages.forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function applyReplace() {
  document.querySelectorAll('.page').forEach(page => {
    page.innerHTML = page.innerHTML.replace(
      /\{(.*?)\}/g,
      (_, key) => state[key] || key
    );
  });
}


/* ===== エントランス ===== */
function enterScenario() {
  const inputs = document.querySelectorAll('[data-key]');
  for (let i of inputs) {
    if (!i.value) {
      document.getElementById('inputError').textContent =
        '入力に不足があります！';
      return;
    }
    state[i.dataset.key] = i.value;
  }
  applyReplace();
  showPage('page1');
}

function enterLater() {
  document.querySelectorAll('[data-key]').forEach(i => {
    state[i.dataset.key] = i.placeholder;
  });
  applyReplace();
  showPage('page1');
}

/* ===== 文字置換 ===== */
function applyReplace() {
  document.body.innerHTML = document.body.innerHTML.replace(
    /\{(.*?)\}/g,
    (_, key) => state[key] || key
  );
}
  /* ===== copy-block ===== */
  const copyBlock = e.target.closest('.copy-block');
  if (copyBlock && e.target === copyBlock.querySelector('::after')) return;

  if (copyBlock && e.target === copyBlock) {
    let text = copyBlock.innerHTML
      .replace(/<rt>(.*?)<\/rt>/g, '（$1）')
      .replace(/<[^>]+>/g, '');

    navigator.clipboard.writeText(text);
    return;
  }

  /* ===== toggle ===== */
  if (e.target.classList.contains('toggle-btn')) {
    const content = e.target.nextElementSibling;
    if (!content) return;
    content.style.display =
      content.style.display === 'block' ? 'none' : 'block';
  }

  /* ===== シナリオへ ===== */
  if (e.target.classList.contains('enter-scenario')) {
    const inputs = document.querySelectorAll('[data-key]');
    const error = document.getElementById('inputError');
    error.textContent = '';

    for (const i of inputs) {
      if (!i.value) {
        error.textContent = '入力に不足があります！';
        return;
      }
      state[i.dataset.key] = i.value;
    }

    applyReplace();
    showPage('page1');
  }

  /* ===== 後で入力する ===== */
  if (e.target.classList.contains('enter-later')) {
    document.querySelectorAll('[data-key]').forEach(i => {
      state[i.dataset.key] = i.placeholder;
    });

    applyReplace();
    showPage('page1');
  }

});
