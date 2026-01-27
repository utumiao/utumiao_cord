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
  console.log("1ページ目へ進む");
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


