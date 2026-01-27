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

// 「シナリオへ」
startButton.addEventListener("click", () => {
  const hasEmpty = inputs.some(input => input.value.trim() === "");

  if (hasEmpty) {
    errorMessage.style.display = "block";
    return;
  }

  errorMessage.style.display = "none";
  goToPage1();
});

// 「後で入力」
skipButton.addEventListener("click", () => {
  goToPage1();
});

function goToPage1() {
  // ここに1ページ目の処理を書く
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
  // コピーブロック
function setupCopyBlocks(root = document) {
  root.querySelectorAll(".copy-block").forEach(block => {
    if (block.querySelector(".copy-btn")) return;

    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.textContent = "コピー";

    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(block.innerText);
      btn.textContent = "完了";
      setTimeout(() => btn.textContent = "コピー", 1200);
    });

    block.appendChild(btn);
  });
}

});
