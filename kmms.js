console.log("kmms.js 読み込まれた！");

let currentScenarioIndex = 0;
let scenarioPages = [];

document.addEventListener("DOMContentLoaded", () => {
  scenarioPages = document.querySelectorAll(".scenario-page");

  if (scenarioPages.length === 0) return;

  scenarioPages.forEach(p => p.style.display = "none");
  scenarioPages[0].style.display = "block";
});

function nextScenarioPage() {
  if (currentScenarioIndex >= scenarioPages.length - 1) return;

  scenarioPages[currentScenarioIndex].style.display = "none";
  currentScenarioIndex++;
  scenarioPages[currentScenarioIndex].style.display = "block";

  window.scrollTo(0, 0);
}

function prevScenarioPage() {
  if (currentScenarioIndex <= 0) return;

  scenarioPages[currentScenarioIndex].style.display = "none";
  currentScenarioIndex--;
  scenarioPages[currentScenarioIndex].style.display = "block";

  window.scrollTo(0, 0);
}
