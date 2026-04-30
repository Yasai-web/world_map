/* =========================
   色定義
========================= */

const COLORS = {
  未訪問: "#E5E7EB",
  訪問: "#86EFAC",
  宿泊: "#60A5FA",
  居住: "#F87171"
};

/* =========================
   国名辞書
========================= */

const COUNTRY_NAMES = {

  jp: "日本",
  kr: "韓国",
  kp: "北朝鮮",
  cn: "中国",
  tw: "台湾",
  hk: "香港",

  th: "タイ",
  vn: "ベトナム",
  sg: "シンガポール",
  my: "マレーシア",
  id: "インドネシア",
  ph: "フィリピン",

  us: "アメリカ",
  ca: "カナダ",
  mx: "メキシコ",

  gb: "イギリス",
  fr: "フランス",
  de: "ドイツ",
  it: "イタリア",
  es: "スペイン",

  au: "オーストラリア",
  nz: "ニュージーランド",

  in: "インド",
  ru: "ロシア",
  br: "ブラジル",
  za: "南アフリカ"

};

/* =========================
   訪問データ
========================= */

const countryStatus = {

  jp: "居住",
  kr: "訪問",
  tw: "宿泊",
  us: "訪問",
  fr: "訪問",
  sg: "訪問"

};

/* =========================
   SVG読み込み
========================= */

const mapObject = document.getElementById("world-map");

mapObject.addEventListener("load", () => {

  console.log("SVG読み込み成功");

  console.log(applyColors);

  const svgDoc = mapObject.contentDocument;

  console.log(svgDoc);

  if (!svgDoc) {
    console.log("svgDoc が null");
    return;
  }

  applyColors(svgDoc);

  setupPopup(svgDoc);

  updateStats();

});

/* =========================
   色適用
========================= */

function applyColors(svgDoc) {

  Object.entries(countryStatus).forEach(
    ([countryCode, status]) => {

      const group = svgDoc.getElementById(
        countryCode
      );

      if (!group) {
        console.log(
          `${countryCode} が見つかりません`
        );
        return;
      }

      const paths =
        group.querySelectorAll("path");

      paths.forEach(path => {

        path.style.fill =
          COLORS[status];

      });

    }
  );
}

/* =========================
   統計更新
========================= */

function updateStats() {

  const visitedCount = Object.values(
    countryStatus
  ).filter(status =>
    status !== "未訪問"
  ).length;

  const totalCountries = 195;

  const rate = Math.round(
    (visitedCount / totalCountries) * 100
  );

  document.getElementById(
    "visited-count"
  ).textContent = visitedCount;

  document.getElementById(
    "achievement-rate"
  ).textContent = `${rate}%`;

  document.getElementById(
    "progress-fill"
  ).style.width = `${rate}%`;
}

/* =========================
   ポップアップ設定
========================= */

function setupPopup(svgDoc) {

  const popup = document.getElementById("popup");

  Object.entries(countryStatus).forEach(
    ([countryCode, status]) => {

      const el = svgDoc.getElementById(
        countryCode
      );

      if (!el) return;

      el.addEventListener(
        "click",
        (event) => {

          const countryName =
            COUNTRY_NAMES[countryCode]
            || countryCode;

          showPopup(
            popup,
            countryName,
            status,
            event
          );

        }
      );

    }
  );
}

/* =========================
   ポップアップ表示
========================= */

let popupTimer = null;

function showPopup(
  popup,
  countryName,
  status,
  event
) {

  popup.innerHTML = `
    <div>${countryName}</div>
    <div>${status}</div>
  `;

  popup.style.left =
    `${event.clientX}px`;

  popup.style.top =
    `${event.clientY + 50}px`;

  popup.classList.add("show");

  clearTimeout(popupTimer);

  popupTimer = setTimeout(() => {

    popup.classList.remove("show");

  }, 1500);
}

console.log("world.js 読み込み成功");
