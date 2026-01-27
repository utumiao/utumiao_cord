document.addEventListener("DOMContentLoaded", () => {

  // =====================
  // ページ切り替え（大枠）
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

  // =====================
  // シナリオページ制御
  // =====================
  let scenarioPages = [];
  let currentIndex = 0;

  function initScenario() {
    scenarioPages = Array.from(
      document.querySelectorAll(".scenario-page")
    );

    scenarioPages.forEach(p => p.style.display = "none");
    currentIndex = 0;

    showScenarioPage(0);
  }

  function showScenarioPage(index) {
    scenarioPages.forEach(p => p.style.display = "none");

    const page = scenarioPages[index];
    if (!page) return;

    page.style.display = "block";
    setupCopyBlocks(page);
    currentIndex = index;
    window.scrollTo(0, 0);
  }

  // HTMLから呼ぶ用
  window.nextScenarioPage = function () {
    if (currentIndex < scenarioPages.length - 1) {
      showScenarioPage(currentIndex + 1);
    }
  };

  window.prevScenarioPage = function () {
    if (currentIndex > 0) {
      showScenarioPage(currentIndex - 1);
    }
  };

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

});
