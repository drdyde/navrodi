/* =========================================================
   НАВРОДИ — всё, что меняется, лежит здесь, вверху файла.
   Новый выпуск = одна строчка в списке ВЫПУСКИ.
   Настроение пишется одним словом: "весело", "никак", "грустно".
   ========================================================= */

var ССЫЛКИ = {
  telegram:   "https://t.me/navrodi",
  youtube:    "",   // пусто = кнопки YouTube нет. Было: https://www.youtube.com/@Navrodi
  bot:        "https://t.me/navrodi_podcast_bot",
  tiktok:     ""     // появится — вписать ссылку, кнопка добавится сама
};

// Разделы сайта (меню). Новый раздел = новая строка + папка с index.html
var РАЗДЕЛЫ = [
  { id: "glavnaya", имя: "Эфир",    путь: "./" },
  { id: "vypuski",  имя: "Выпуски", путь: "vypuski.html" },
  { id: "pesni",    имя: "Песни",   путь: "pesni.html" },
  { id: "kto",      имя: "Кто это", путь: "kto.html" },
  { id: "merch",    имя: "Мерч",    путь: "merch.html" }
];

// Выпуски: самый новый — сверху
var ВЫПУСКИ = [
  { номер: 1, название: "Навроди начали", настроение: "весело", дата: "скоро",
    telegram: "", youtube: "" }
];

// Песни
var ПЕСНИ = [
  { название: "Don't Worry, Be Happy", заметка: "Переделка под укулеле. Готовится.", настроение: "весело", ссылка: "" }
];

/* ======= ниже — механика, трогать не нужно ======= */

var НАСТРОЕНИЕ = {
  "весело": { цвет: "#e8892f", рот: "M178 196 Q210 220 242 196" },
  "никак":  { цвет: "#5a9e7f", рот: "M180 204 L240 204" },
  "грустно":{ цвет: "#c4573a", рот: "M178 212 Q210 190 242 212" }
};
var uid = 0;
function стикмен(настроение, px) {
  var н = НАСТРОЕНИЕ[настроение] || НАСТРОЕНИЕ["весело"], ink = "#1a1612", id = "c" + (uid++);
  return '<svg class="stick" viewBox="0 0 400 400" width="' + px + '" height="' + px + '" role="img" aria-label="Навроди, настроение: ' + настроение + '">' +
    '<defs><clipPath id="' + id + '"><circle cx="200" cy="200" r="189"/></clipPath></defs>' +
    '<circle cx="200" cy="200" r="194" fill="' + н.цвет + '"/>' +
    '<g clip-path="url(#' + id + ')" fill="none" stroke="' + ink + '" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">' +
    '<circle cx="210" cy="160" r="72"/><path d="M126 176 C112 48 308 48 294 176"/>' +
    '<circle cx="178" cy="152" r="23"/><circle cx="242" cy="152" r="23"/><path d="M201 152 L219 152"/>' +
    '<path d="' + н.рот + '"/>' +
    '<path d="M70 400 C78 320 130 268 210 268 C260 268 300 286 320 318"/><path d="M320 318 L330 380"/>' +
    '<path d="M118 296 C84 280 66 250 78 196"/><path d="M86 168 L86 104"/></g>' +
    '<g fill="' + ink + '"><circle cx="130" cy="186" r="15"/><circle cx="290" cy="186" r="15"/>' +
    '<rect x="66" y="164" width="34" height="40" rx="14" transform="rotate(-8 83 184)"/></g>' +
    '<circle cx="200" cy="200" r="194" fill="none" stroke="' + ink + '" stroke-width="10"/></svg>';
}
// старый микрофон на стойке
function микрофон(px) {
  return '<svg class="mic" viewBox="0 0 120 220" width="' + px + '" aria-hidden="true"><g fill="none" stroke="#eadfc8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="22" y="8" width="76" height="96" rx="38"/>' +
    '<path d="M30 36 L90 36"/><path d="M26 56 L94 56"/><path d="M30 76 L90 76"/>' +
    '<path d="M60 104 L60 124"/><path d="M38 124 L82 124"/><path d="M60 124 L60 196"/>' +
    '<path d="M24 210 Q60 192 96 210"/></g></svg>';
}
function ссылка(url, текст, cls) {
  var пусто = !url || url === "#";
  return '<a class="' + (cls || "") + (пусто ? " soon" : "") + '" href="' + (пусто ? "#" : url) + '"' + (пусто ? ' aria-disabled="true"' : ' target="_blank" rel="noopener"') + '>' + текст + '</a>';
}
function карточкаВыпуска(в) {
  var кнопки = [];
  кнопки.push(ссылка(в.telegram || ССЫЛКИ.telegram, "Слушать целиком", "mini tg"));
  if (в.youtube) кнопки.push(ссылка(в.youtube, "Шортс", "mini yt"));
  return '<article class="ep">' + стикмен(в.настроение, 58) +
    '<div class="ep-body"><p class="ep-meta">Выпуск ' + в.номер + ', ' + в.настроение + ', ' + в.дата + '</p>' +
    '<h3>' + в.название + '</h3><div class="ep-links">' + кнопки.join("") + '</div></div></article>';
}
document.addEventListener("DOMContentLoaded", function () {
  var root = document.body.getAttribute("data-root") || "";
  var page = document.body.getAttribute("data-page");
  var last = ВЫПУСКИ[0] ? ВЫПУСКИ[0].настроение : "весело";

  var шапка = document.getElementById("shapka");
  if (шапка) шапка.innerHTML =
    '<a class="home" href="./"><img src="' + root + 'mark.svg" alt="Навроди" width="150"></a>' +
    '<nav aria-label="Разделы">' + РАЗДЕЛЫ.map(function (р) {
      return '<a href="' + р.путь + '"' + (р.id === page ? ' aria-current="page"' : '') + '>' + р.имя + '</a>';
    }).join("") + '</nav>';

  var hero = document.getElementById("hero");
  if (hero) hero.innerHTML = '<div class="hero-pic">' + стикмен(last, 210) + микрофон(70) + '</div>' +
    '<img class="hero-mark" src="' + root + 'mark.svg" alt="NAVRODI.COM" width="230">';

  var кнопки = document.getElementById("knopki");
  if (кнопки) кнопки.innerHTML =
    ссылка(ССЫЛКИ.telegram, "<b>Телеграм</b><span>полные выпуски</span>", "plate t1") +
    (ССЫЛКИ.youtube ? ссылка(ССЫЛКИ.youtube, "<b>YouTube</b><span>коротко, шортсы</span>", "plate t2") : "") +
    ссылка(ССЫЛКИ.bot, "<b>Спросить Навроди</b><span>что это, кто это, написать</span>", "plate t4") +
    (ССЫЛКИ.tiktok ? ссылка(ССЫЛКИ.tiktok, "<b>TikTok</b><span>коротко</span>", "plate t3") : "");

  var spisok = document.getElementById("vypuski");
  if (spisok) {
    var n = parseInt(spisok.getAttribute("data-limit") || "0", 10);
    var list = n ? ВЫПУСКИ.slice(0, n) : ВЫПУСКИ;
    spisok.innerHTML = list.length ? list.map(карточкаВыпуска).join("") : '<p class="empty">Первый выпуск готовится.</p>';
  }
  var pesni = document.getElementById("pesni");
  if (pesni) pesni.innerHTML = ПЕСНИ.map(function (п) {
    return '<article class="ep">' + стикмен(п.настроение, 58) + '<div class="ep-body"><h3>' + п.название + '</h3><p class="ep-meta">' + п.заметка + '</p>' +
      (п.ссылка ? '<div class="ep-links">' + ссылка(п.ссылка, "Слушать", "mini tg") + '</div>' : '') + '</div></article>';
  }).join("");

  var podval = document.getElementById("podval");
  if (podval) podval.innerHTML = '<div class="wrap">' + стикмен("никак", 40) +
    '<span>' + ссылка(ССЫЛКИ.telegram, "Телеграм") + ' ' + (ССЫЛКИ.youtube ? ссылка(ССЫЛКИ.youtube, "YouTube") + ' ' : '') + ссылка(ССЫЛКИ.bot, "Написать") + (ССЫЛКИ.tiktok ? ' ' + ссылка(ССЫЛКИ.tiktok, "TikTok") : '') + '</span></div>';

  [].forEach.call(document.querySelectorAll("a.soon"), function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); });
    a.title = "Ссылка появится скоро";
  });
});
