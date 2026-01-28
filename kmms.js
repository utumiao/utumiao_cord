// =====================
// ルビ付きテキスト取得
// =====================
function getTextWithRuby(element) {
  const clone = element.cloneNode(true);

  clone.querySelectorAll("ruby").forEach(ruby => {
    const rb = ruby.childNodes[0]?.textContent || "";
    const rt = ruby.querySelector("rt")?.textContent || "";
    ruby.replaceWith(`${rb}（${rt}）`);
  });

  return clone.innerText;
}
// =====================
// ページ制御
// =====================
const root = document.getElementById("scenario-root");
let currentIndex = 0;
const history = [];

function renderPage(index) {
  const page = scenario[index];
  if (!page) return;

  history.push(currentIndex);
  currentIndex = index;

  root.innerHTML = `
    <h2>${page.title}</h2>
    ${page.content}
  `;

  setupCopyBlocks(root);
  window.scrollTo(0, 0);
}

function goNext() {
  const page = scenario[currentIndex];
  if (page.choices && page.choices[0]) {
    renderPage(page.choices[0].next);
  }
}

function goPrev() {
  if (history.length > 1) {
    history.pop();
    renderPage(history.pop());
  }
}

// =====================
// コピーブロック
// =====================
function setupCopyBlocks(root = document) {
  root.querySelectorAll(".copy-block").forEach(block => {
    if (block.querySelector(".copy-btn")) return;

    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.textContent = "コピー";

    btn.onclick = () => {
      navigator.clipboard.writeText(block.innerText);
      btn.textContent = "完了";
      setTimeout(() => btn.textContent = "コピー", 1200);
    };

    block.appendChild(btn);
  });
}

document.addEventListener("DOMContentLoaded", () => {

  // =====================
  // エントランス
  // =====================
  const startButton = document.getElementById("start-button");
  const skipButton  = document.getElementById("skip-button");
  const errorMessage = document.getElementById("error-message");

  const inputs = [
    document.getElementById("PC1-myouji"),
    document.getElementById("PC1-namae"),
    document.getElementById("PC2-myouji"),
    document.getElementById("PC2-namae")
  ];

  startButton.addEventListener("click", () => {
    const hasEmpty = inputs.some(i => i.value.trim() === "");
    if (hasEmpty) {
      errorMessage.style.display = "block";
      return;
    }
    errorMessage.style.display = "none";
    goToScenario();
  });

  skipButton.addEventListener("click", goToScenario);

  function goToScenario() {
    showPage("1");
    initScenario();
  }
  

});
