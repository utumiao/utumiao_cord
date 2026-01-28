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
function goTo(pageName) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const target = document.querySelector(`.page[data-page="${pageName}"]`);
  if (target) {
    target.classList.add("active");
    window.scrollTo(0, 0);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // renderPage(0); ← これを消す
});


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

  start-Button.addEventListener("click", () => {
    const hasEmpty = inputs.some(i => i.value.trim() === "");
    if (hasEmpty) {
      errorMessage.style.display = "block";
      return;
    }
    error-Message.style.display = "none";
    goToScenario();
  });

  skip-Button.addEventListener("click", goToScenario);

  function goToScenario() {
    showPage("1");
    initScenario();
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

});
