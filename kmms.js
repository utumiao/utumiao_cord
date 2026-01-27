document.addEventListener("DOMContentLoaded", () => {

  const startButton = document.getElementById("start-button");
  const skipButton = document.getElementById("skip-button");
  const errorMessage = document.getElementById("error-message");

  const inputs = [
    document.getElementById("PC1-myouji"),
    document.getElementById("PC1-namae"),
    document.getElementById("PC2-myouji"),
    document.getElementById("PC2-namae")
  ];

  startButton.addEventListener("click", () => {
    const hasEmpty = inputs.some(input => input.value.trim() === "");

    if (hasEmpty) {
      errorMessage.style.display = "block";
      return;
    }

    errorMessage.style.display = "none";
    goToPage1();
  });

  skipButton.addEventListener("click", () => {
    goToPage1();
  });

  function goToPage1() {
    showPage("1");
  }

  function showPage(pageName) {
    document.querySelectorAll(".page").forEach(p => {
      p.classList.remove("active");
    });

    const target = document.querySelector(`.page[data-page="${pageName}"]`);
    if (target) {
      target.classList.add("active");
      setupCopyBlocks(target);
      window.scrollTo(0, 0);
    }
  }

// =====================
// ページ切り替え
// =====================
function showPage(name) {
  document.querySelectorAll(".page").forEach(p => {
    p.classList.remove("active");
  });

  const target = document.querySelector(`.page[data-page="${name}"]`);
  if (target) {
    target.classList.add("active");
    window.scrollTo(0, 0);
  }
}

// =====================
// エントランス処理
// =====================
const startButton = document.getElementById("start-button");
const skipButton = document.getElementById("skip-button");
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
  setupScenarioPages();
}

// =====================
// newpage 分割
// =====================
let currentScenarioPage = 0;

function setupScenarioPages() {
  const container = document.getElementById("scenario-text");
  const raw = container.innerHTML;
  const parts = raw.split("[newpage]");

  container.innerHTML = "";

  parts.forEach((html, i) => {
    const page = document.createElement("div");
    page.className = "scenario-page";
    page.dataset.index = i;
    page.innerHTML = html.trim();
    container.appendChild(page);
  });

  showScenarioPage(0);
}

function showScenarioPage(index) {
  const pages = document.querySelectorAll(".scenario-page");
  if (!pages[index]) return;

  pages.forEach(p => p.style.display = "none");
  pages[index].style.display = "block";

  setupCopyBlocks(pages[index]);
  currentScenarioPage = index;
}

function nextScenarioPage() {
  showScenarioPage(currentScenarioPage + 1);
}

// =====================
// コピーブロック自動生成
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
