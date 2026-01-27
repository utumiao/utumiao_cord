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
