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
      setupCopyBlocks(target);
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
    goToPage1();
  });

  skipButton.addEventListener("click", goToPage1);

  function goToPage1() {
    showPage("1");
    initScenarioPages(); // ← ★ここで[newpage]初期化
  }

  // =====================
  // [newpage] 処理
  // =====================
  let scenarioPages = [];
  let currentIndex = 0;

  function initScenarioPages() {
    const container = document.getElementById("scenario-text");
    if (!container) return;

    const parts = container.innerHTML.split("[newpage]");
    container.innerHTML = "";
    scenarioPages = [];

    parts.forEach(html => {
      const div = document.createElement("div");
      div.className = "scenario-page";
      div.innerHTML = html.trim();
      div.style.display = "none";
      container.appendChild(div);
      scenarioPages.push(div);
    });

    showScenarioPage(0);
  }

  function showScenarioPage(index) {
    scenarioPages.forEach(p => p.style.display = "none");
    if (!scenarioPages[index]) return;

    scenarioPages[index].style.display = "block";
    setupCopyBlocks(scenarioPages[index]);
    currentIndex = index;
  }

  // グローバルに出す（HTMLから呼ぶ用）
  window.nextScenarioPage = function () {
    if (currentIndex < scenarioPages.length - 1) {
      showScenarioPage(currentIndex + 1);
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
