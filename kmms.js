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
  
  //シナリオへボタン
  startButton.addEventListener("click", () => {
    const hasEmpty = inputs.some(i => i.value.trim() === "");
    if (hasEmpty) {
      errorMessage.style.display = "block";
      return;
    }
    errorMessage.style.display = "none";
    showPage("1");
  });
  
  //後で入力ボタン
  skipButton.addEventListener("click", () => {
    showPage("1");
  });

  //多分ページ制御
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

  let currentScenarioIndex = 0;
const scenarioPages = document.querySelectorAll(".scenario-page");

function showScenarioPage(index) {
  scenarioPages.forEach(p => p.classList.remove("active"));
  scenarioPages[index].classList.add("active");
}

function nextScenarioPage() {
  if (currentScenarioIndex < scenarioPages.length - 1) {
    currentScenarioIndex++;
    showScenarioPage(currentScenarioIndex);
  }
}

function prevScenarioPage() {
  if (currentScenarioIndex > 0) {
    currentScenarioIndex--;
    showScenarioPage(currentScenarioIndex);
  }
}

  let currentScenarioIndex = 0;
let scenarioPages = [];

// シナリオページ初期化
function initScenarioPages() {
  scenarioPages = document.querySelectorAll(".scenario-page");
  currentScenarioIndex = 0;

  scenarioPages.forEach(p => p.classList.remove("active"));
  if (scenarioPages.length > 0) {
    scenarioPages[0].classList.add("active");
    setupCopyBlocks(scenarioPages[0]);
  }
}

// 次へ
function nextScenarioPage() {
  if (currentScenarioIndex >= scenarioPages.length - 1) return;

  scenarioPages[currentScenarioIndex].classList.remove("active");
  currentScenarioIndex++;
  scenarioPages[currentScenarioIndex].classList.add("active");

  setupCopyBlocks(scenarioPages[currentScenarioIndex]);
  window.scrollTo(0, 0);
}

// 前へ
function prevScenarioPage() {
  if (currentScenarioIndex <= 0) return;

  scenarioPages[currentScenarioIndex].classList.remove("active");
  currentScenarioIndex--;
  scenarioPages[currentScenarioIndex].classList.add("active");

  setupCopyBlocks(scenarioPages[currentScenarioIndex]);
  window.scrollTo(0, 0);
}


  //coopy-block
  function setupCopyBlocks(root = document) {
    root.querySelectorAll(".copy-block").forEach(block => {
      if (block.querySelector(".copy-btn")) return;

      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.textContent = "コピー";

      btn.onclick = () => {
        const text = getTextWithRuby(block);
        navigator.clipboard.writeText(text);
        btn.textContent = "完了";
        setTimeout(() => btn.textContent = "コピー", 1200);
      };

      block.appendChild(btn);
    });
  }
  
  //ルビ
  function getTextWithRuby(element) {
    const clone = element.cloneNode(true);

    clone.querySelectorAll("ruby").forEach(ruby => {
      const rb = ruby.childNodes[0]?.textContent || "";
      const rt = ruby.querySelector("rt")?.textContent || "";
      ruby.replaceWith(`${rb}（${rt}）`);
    });

    return clone.innerText;
  }

});
