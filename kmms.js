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

document.addEventListener("DOMContentLoaded", () => {

// =====================
// ページ制御（超シンプル）
// =====================
let pages = [];
let currentPage = 0;

document.addEventListener("DOMContentLoaded", () => {
  pages = Array.from(document.querySelectorAll(".page"));

  // 全部非表示
  pages.forEach(p => p.style.display = "none");

  // 最初の1ページだけ表示
  if (pages[0]) {
    pages[0].style.display = "block";
  }
});

// 次のページへ
function nextPage() {
  if (currentPage < pages.length - 1) {
    pages[currentPage].style.display = "none";
    currentPage++;
    pages[currentPage].style.display = "block";
    window.scrollTo(0, 0);
  }
}

// 前のページへ
function prevPage() {
  if (currentPage > 0) {
    pages[currentPage].style.display = "none";
    currentPage--;
    pages[currentPage].style.display = "block";
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
  // コピーブロック
  // =====================
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

});
