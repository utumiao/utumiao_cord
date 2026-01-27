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

  startButton.addEventListener("click", () => {
    const hasEmpty = inputs.some(input => input.value.trim() === "");

    if (hasEmpty) {
      errorMessage.style.display = "block";
      return;
    }

    errorMessage.style.display = "none";
    goToPage1();
  });

  skipButton.addEventListener("click", () => {
    goToPage1();
  });

  function goToPage1() {
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

      chapterContentEl.querySelectorAll('.copy-block').forEach(block => {
      const btn = document.createElement('button');
      btn.textContent = 'コピー';
      btn.className = 'copy-paragraph-btn';
      btn.addEventListener('click', () => {
        const temp = block.cloneNode(true);
        temp.querySelectorAll('.copy-paragraph-btn').forEach(b => b.remove());
        temp.querySelectorAll('ruby').forEach(ruby => {
          const rt = ruby.querySelector('rt')?.textContent || '';
          ruby.replaceWith(document.createTextNode(`${ruby.childNodes[0].textContent}（${rt}）`));
        });
        navigator.clipboard.writeText(temp.innerText).then(() => {
          btn.textContent = '完了';
          setTimeout(() => btn.textContent = 'コピー', 1500);
        });
      });
      block.appendChild(btn);
    });

});
