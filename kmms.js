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
  // renderPage(0); ← これを消す


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
  
// =====================
// ページ制御
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

  // シナリオへ（入力チェックあり）
  startButton.addEventListener("click", () => {
    // 今回は「入力欄があってもなくても」通す
    errorMessage.style.display = "none";
    showPage("1");
  });

  // 後で入力（無条件）
  skipButton.addEventListener("click", () => {
    showPage("1");
  });

});

  
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
