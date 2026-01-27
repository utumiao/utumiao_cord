console.log("kmms.js is running");

// ✅ 画面の要素を取得
  const entrance = document.getElementById("entrance");
  const player1Input = document.getElementById("player1-name");
  const player2Input = document.getElementById("player2-name");
  const startBtn = document.getElementById("start-btn");
  const skipBtn = document.getElementById("skip-btn");

  const header = document.getElementById("header");
  const chapterSelect = document.getElementById("chapter-select");

  const scenarioBox = document.getElementById("scenario-box");
  const chapterTitleEl = document.getElementById("chapter-title");
  const chapterContentEl = document.getElementById("chapter-content");
  const choiceContainer = document.getElementById("choice-container");
  const backToEntranceBtn = document.getElementById("back-to-entrance-btn");

  // ✅ セレクトメニューに章を追加
  chapters.forEach((ch, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = ch.title;
    chapterSelect.appendChild(opt);
  });

  // ✅ 章の表示処理
  function showChapter(index) {
    const ch = chapters[index];
    const name1 = player1Input.value.trim() || "HO預言";
    const name2 = player2Input.value.trim() || "HO運命";

    chapterTitleEl.textContent = ch.title;
    let html = ch.content
      .replace(/{HO預言}/g, name1)
      .replace(/{HO運命}/g, name2);
    chapterContentEl.innerHTML = html;

    // 🔄 「戻る」ボタンの表示制御
    backToEntranceBtn.style.display = index === 0 ? "inline-block" : "none";

    // ✅ コピー機能
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

    // ✅ トグルボタン（クリックで開閉）
    chapterContentEl.querySelectorAll('.toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
      });
    });

    // ✅ 選択肢の描画
    choiceContainer.innerHTML = "";
    if (ch.choices) {
      ch.choices.forEach(c => {
        const btn = document.createElement('button');
        btn.textContent = c.text;
        btn.addEventListener('click', () => {
          showChapter(c.next);
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
        choiceContainer.appendChild(btn);
      });
    }

    chapterSelect.value = index;
  }

  // ✅ セレクトボックスの切り替え
  chapterSelect.addEventListener("change", () => {
    showChapter(Number(chapterSelect.value));
  });

  // ✅ 「スタート」ボタン
startBtn.addEventListener("click", () => {
  if (!player1Input.value.trim() || !player2Input.value.trim()) {
    alert("探索者の名前を入力してください！");
    return;
  }

  entrance.style.display = "none";
  scenarioBox.style.display = "block";
  showChapter(0);
});


  // ✅ 「スキップ」ボタン
skipBtn.addEventListener("click", () => {
  entrance.style.display = "none";
  scenarioBox.style.display = "block";
  showChapter(0);
});


  // ✅ 「戻る」ボタン
  backToEntranceBtn.addEventListener("click", () => {
    location.reload(); // 再読み込みで最初に戻る
  });

  // ✅ 背景のスクロール効果（お好みで）
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = scrollY / maxScroll;
    document.body.style.backgroundPosition = `
      top left,
      top left,
      center ${scrollPercent * 50}%`;
  });

  // ✅ ヘッダー
document.getElementById("header-title").addEventListener("click", () => {
  entrance.style.display = "none";
  scenarioBox.style.display = "block";
  showChapter(0);
});
  // ✅ プルダウン
const toggle = document.getElementById("chapter-toggle");
const list = document.getElementById("chapter-list");

toggle.addEventListener("click", () => {
  list.style.display = list.style.display === "flex" ? "none" : "flex";
});
  // ✅ 章一覧
chapters.forEach((ch, i) => {
  const btn = document.createElement("button");
  btn.textContent = ch.title;
  btn.addEventListener("click", () => {
    showChapter(i);
    list.style.display = "none";
  });
  list.appendChild(btn);
});

