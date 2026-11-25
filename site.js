/* =========================================================
   НАВРОДИ · АХ…ИГЕННО ХУЛИ… ГАН… СКИЙ ПОДЪ…КАСТ С И-И
   Всё, что меняется, лежит здесь, вверху файла.
   Новый выпуск = одна строчка в списке ВЫПУСКИ (самый новый сверху).
   Настроение одним словом: "весело", "никак", "грустно".
   пипы = сколько раз запикано (число). Пока не знаем — пиши "".
   ========================================================= */

var ССЫЛКИ = {
  telegram:   "https://t.me/navrodi",
  youtube:    "https://www.youtube.com/@pAIpecPodcast",   // пусто = кнопки YouTube нет. Канал «пИИп-ец Подкаст»
  bot:        "https://t.me/navrodi_podcast_bot",
  tiktok:     "",   // появится — вписать ссылку, кнопка добавится сама
  kopilka:    ""    // ссылка на донаты (появится — кнопка оживёт)
};

// Разделы сайта (меню)
var РАЗДЕЛЫ = [
  { id: "glavnaya",     имя: 'эф<span class="ii">ИИ</span>р', робот: true, путь: "./" },
  { id: "vypuski",      имя: "Нахули… ганили",    путь: "vypuski.html" },
  { id: "blagodarnosti",имя: "Бляя… годарности 🐖", путь: "blagodarnosti.html" },
  { id: "kto",          имя: "Анас…👀",           путь: "kto.html" }
  // Песни спрятаны до лучших времён. Вернуть: { id: "pesni", имя: "Песни", путь: "pesni.html" },
];

// Постоянные — завсегдатаи кухни (ИИ)
var ГОСТИ = [
  { имя: "Гена",  кто: "Gemini", цвет: "#5a9e7f", заметка: "Начинаем с него. «Гена, найди!»" },
  { имя: "Клава", кто: "Claude", цвет: "#e8892f", заметка: "Девочка. Говорить пока не умеет, придумаем." },
  { имя: "Жора",  кто: "GPT",    цвет: "#c4573a", заметка: "Скоро в эфире." },
  { имя: "Гриша", кто: "Grok",   цвет: "#eadfc8", заметка: "Скоро в эфире." }
];

// Гости — кто угодно: другие ИИ, люди. Новый гость = одна строчка.
// тип: "ИИ" или "человек". Пример:
// { имя: "Вася", кто: "сосед", тип: "человек", заметка: "Пришёл за солью, остался на выпуск." },
var ГОСТИ_ЭФИРА = [
];

// Выпуски: самый новый — сверху
var ВЫПУСКИ = [
  { номер: 1, название: "Гена, всё пошло по п… папе сделали укол", гость: "Гена",
    настроение: "весело", пипы: "", дата: "скоро", telegram: "", youtube: "" }
];

// Песни
var ПЕСНИ = [
  { название: "Don't Worry, Be Happy", заметка: "Своя переделка под укулеле. Готовится.", настроение: "весело", ссылка: "" }
];

/* ======= ниже — механика, трогать не нужно ======= */

var ЦВЕТ = { "весело": "#e8892f", "никак": "#5a9e7f", "грустно": "#c4573a" };

function робот(цвет, px, лицо) {
  var ink = "#1a1612";
  // лицо: "" обычный, "подмиг", "думает", "мат"
  var глаз = function (x) { return '<rect x="' + x + '" y="28" width="18" height="18" rx="4" fill="#fff" stroke="' + ink + '" stroke-width="3"/>'; };
  var зрачок = function (x, y) { return '<rect x="' + x + '" y="' + y + '" width="7" height="8" rx="2" fill="' + ink + '"/>'; };
  var рот = '<path d="M24 58 L56 58 M30 54 L30 62 M40 54 L40 62 M50 54 L50 62" stroke="' + ink + '" stroke-width="3" stroke-linecap="round"/>';
  var лицоSVG;
  if (лицо === "подмиг") лицоSVG = глаз(18) + зрачок(28, 33) + '<path d="M44 38 Q53 30 62 38" fill="none" stroke="' + ink + '" stroke-width="4" stroke-linecap="round"/>' +
    '<path d="M26 56 Q40 66 54 56" fill="none" stroke="' + ink + '" stroke-width="3.5" stroke-linecap="round"/>';
  else if (лицо === "думает") лицоSVG = глаз(18) + глаз(44) + зрачок(28, 30) + зрачок(54, 30) +
    '<path d="M30 59 Q36 55 42 59 T54 59" fill="none" stroke="' + ink + '" stroke-width="3" stroke-linecap="round"/>' +
    '<path d="M66 70 C58 74 50 72 48 66" fill="none" stroke="' + ink + '" stroke-width="3.5" stroke-linecap="round"/><circle cx="47" cy="64" r="4" fill="' + цвет + '" stroke="' + ink + '" stroke-width="2.5"/>';
  else if (лицо === "мат") лицоSVG = глаз(18) + глаз(44) + зрачок(28, 35) + зрачок(46, 35) +
    '<path d="M16 26 L36 32 M64 26 L44 32" stroke="' + ink + '" stroke-width="4" stroke-linecap="round"/>' +
    '<rect x="20" y="52" width="40" height="13" rx="2" fill="' + ink + '"/><text x="40" y="62.5" text-anchor="middle" font-family="Rubik,sans-serif" font-weight="800" font-size="11" fill="#f2b01e">#@!</text>';
  if (лицоSVG) return '<svg class="robot" viewBox="0 0 80 84" width="' + px + '" height="' + Math.round(px * 1.05) + '" aria-hidden="true">' +
    '<path d="M40 4 L40 16" stroke="' + (цвет === "#eadfc8" ? "#eadfc8" : цвет) + '" stroke-width="4" stroke-linecap="round"/><circle cx="40" cy="5" r="5" fill="#c4573a"/>' +
    '<rect x="8" y="16" width="64" height="56" rx="12" fill="' + цвет + '" stroke="' + ink + '" stroke-width="3"/>' +
    '<rect x="2" y="34" width="8" height="18" rx="3" fill="' + цвет + '" stroke="' + ink + '" stroke-width="2"/><rect x="70" y="34" width="8" height="18" rx="3" fill="' + цвет + '" stroke="' + ink + '" stroke-width="2"/>' +
    лицоSVG + '</svg>';
  return '<svg class="robot" viewBox="0 0 80 84" width="' + px + '" height="' + Math.round(px * 1.05) + '" aria-hidden="true">' +
    '<path d="M40 4 L40 16" stroke="' + (цвет === "#eadfc8" ? "#eadfc8" : цвет) + '" stroke-width="4" stroke-linecap="round"/><circle cx="40" cy="5" r="5" fill="#c4573a"/>' +
    '<rect x="8" y="16" width="64" height="56" rx="12" fill="' + цвет + '" stroke="' + ink + '" stroke-width="3"/>' +
    '<rect x="2" y="34" width="8" height="18" rx="3" fill="' + цвет + '" stroke="' + ink + '" stroke-width="2"/><rect x="70" y="34" width="8" height="18" rx="3" fill="' + цвет + '" stroke="' + ink + '" stroke-width="2"/>' +
    '<rect x="18" y="28" width="18" height="18" rx="4" fill="#fff" stroke="' + ink + '" stroke-width="3"/><rect x="44" y="28" width="18" height="18" rx="4" fill="#fff" stroke="' + ink + '" stroke-width="3"/>' +
    '<rect x="28" y="33" width="7" height="8" rx="2" fill="' + ink + '"/><rect x="54" y="33" width="7" height="8" rx="2" fill="' + ink + '"/>' +
    '<path d="M24 58 L56 58 M30 54 L30 62 M40 54 L40 62 M50 54 L50 62" stroke="' + ink + '" stroke-width="3" stroke-linecap="round"/></svg>';
}
function глаза(px) {
  var ink = "#1a1612";
  return '<svg class="eyes" viewBox="0 0 54 26" width="' + px + '" height="' + Math.round(px * 26 / 54) + '" aria-hidden="true">' +
    '<rect x="2" y="2" width="22" height="22" rx="5" fill="#fff" stroke="' + ink + '" stroke-width="3"/><rect x="30" y="2" width="22" height="22" rx="5" fill="#fff" stroke="' + ink + '" stroke-width="3"/>' +
    '<rect x="14" y="8" width="8" height="10" rx="2" fill="' + ink + '"/><rect x="42" y="8" width="8" height="10" rx="2" fill="' + ink + '"/></svg>';
}
function человек(px) {
  var ink = "#1a1612";
  return '<svg viewBox="0 0 80 84" width="' + px + '" height="' + Math.round(px * 1.05) + '" aria-hidden="true"><g fill="none" stroke="#eadfc8" stroke-width="4" stroke-linecap="round"><ellipse cx="40" cy="26" rx="15" ry="18"/><path d="M40 44 L40 66 M40 52 L24 60 M40 52 L56 60 M40 66 L28 82 M40 66 L52 82"/></g></svg>';
}
function табурет(px) {
  return '<svg viewBox="0 0 80 84" width="' + px + '" height="' + Math.round(px * 1.05) + '" aria-hidden="true"><g stroke="#1a1612" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"><path d="M18 60 L12 82 M62 60 L68 82 M30 60 L28 82 M50 60 L52 82" stroke="#eadfc8" stroke-width="5"/><ellipse cx="40" cy="56" rx="30" ry="9" fill="#e8892f"/><ellipse cx="40" cy="52" rx="30" ry="9" fill="#f2b01e"/></g><text x="40" y="30" text-anchor="middle" font-family="Rubik,sans-serif" font-weight="800" font-size="30" fill="#eadfc8">?</text></svg>';
}
function самолётик(px) {
  return '<svg class="tg-ico" viewBox="0 0 48 48" width="' + px + '" height="' + px + '" aria-hidden="true"><circle cx="24" cy="24" r="22" fill="#2aa3dd" stroke="#1a1612" stroke-width="2.5"/><path d="M11 23.5 L35 14 L31 35 L23.5 29.5 L19.5 33.5 L19 27 L31 17.5 L17 25.5 Z" fill="#fff" stroke="#1a1612" stroke-width="1.6" stroke-linejoin="round"/></svg>';
}
// ПИП-счётчик: однорукий бандит. Три барабана с цифрами, под ними роботы-матерщинники цветами светофора.
function бандит(пипы) {
  var есть = !(пипы === "" || пипы === undefined || пипы === null);
  var n = есть ? Math.min(999, Math.max(0, parseInt(пипы, 10) || 0)) : null;
  var цифры = есть ? ("00" + n).slice(-3).split("") : ["?", "?", "?"];
  var цвета = ["#c4573a", "#f2b01e", "#5a9e7f"];
  return '<div class="slot" title="ПИП-счётчик: сколько раз запикали">' +
    '<div class="slot-top">ПИП-счётчик</div>' +
    '<div class="slot-body"><div class="reels">' + цифры.map(function (ц) { return '<span class="reel">' + ц + '</span>'; }).join("") + '</div>' +
    '<div class="bots">' + цвета.map(function (c) { return робот(c, 30, "мат"); }).join("") + '</div>' +
    '<div class="slot-foot">' + (есть ? n + ' ' + пипСлово(n) : 'пока не считали') + '</div></div>' +
    '<span class="lever" aria-hidden="true"></span></div>';
}
function пипСлово(n) { var a = n % 10, b = n % 100; if (a === 1 && b !== 11) return "пип"; if (a >= 2 && a <= 4 && (b < 12 || b > 14)) return "пипа"; return "пипов"; }
function ссылка(url, текст, cls) {
  var пусто = !url || url === "#";
  return '<a class="' + (cls || "") + (пусто ? " soon" : "") + '" href="' + (пусто ? "#" : url) + '"' + (пусто ? ' aria-disabled="true"' : ' target="_blank" rel="noopener"') + '>' + текст + '</a>';
}
function номер(n) { return "#" + ("00" + n).slice(-3); }
function гостьПо(имя) { for (var i = 0; i < ГОСТИ.length; i++) if (ГОСТИ[i].имя === имя) return ГОСТИ[i]; return null; }

function карточкаВыпуска(в) {
  var г = гостьПо(в.гость), кнопки = [];
  кнопки.push(ссылка(в.telegram || ССЫЛКИ.telegram, "Смотреть целиком → тык", "mini tg"));
  if (в.youtube) кнопки.push(ссылка(в.youtube, "Шортс", "mini yt"));
  var пипы = (в.пипы === "" || в.пипы === undefined) ? "?" : в.пипы;
  return '<article class="ep" style="--mood:' + (ЦВЕТ[в.настроение] || ЦВЕТ["весело"]) + '">' +
    '<div class="ep-side">' + (г ? робот(г.цвет, 52) : '') + '<span class="ep-num">' + номер(в.номер) + '</span></div>' +
    '<div class="ep-body"><p class="ep-meta">' + (г ? 'Гость: ' + г.имя + ' (' + г.кто + ') · ' : '') + 'настроение: ' + в.настроение + ' · выйдет: ' + в.дата + '</p>' +
    '<h3>' + в.название + '</h3>' +
    бандит(в.пипы) +
    '<div class="ep-links">' + кнопки.join("") + '</div></div></article>';
}

document.addEventListener("DOMContentLoaded", function () {
  var page = document.body.getAttribute("data-page");

  var шапка = document.getElementById("shapka");
  if (шапка) шапка.innerHTML =
    '<a class="home" href="./"><img src="avatar.jpg" alt="Навроди" width="52" height="52"><span>НАВРОДИ</span></a>' +
    '<nav aria-label="Разделы">' + РАЗДЕЛЫ.map(function (р) {
      return '<a href="' + р.путь + '"' + (р.id === page ? ' aria-current="page"' : '') + '>' + р.имя + (р.робот ? ' ' + робот("#eadfc8", 24) : '') + '</a>';
    }).join("") + '</nav>';

  var hero = document.getElementById("hero");
  if (hero) hero.innerHTML =
    '<div class="banner">' +
      '<div class="b-top"><span class="b-name">НАВРОДИ</span><span class="stamp">АХ…ИГЕННО</span></div>' +
      '<div class="boards"><span class="board b1">ХУЛИ…</span><span class="board b2">ГАН…</span><span class="board b3">СКИЙ</span></div>' +
      '<div class="b-tag"><span class="pod">подЪ…каст с</span> <span class="ii">И<span class="d">-</span>И</span> ' + робот("#eadfc8", 64, "подмиг") + '</div>' +
    '</div>' +
    '<img class="hero-avatar" src="avatar.jpg" alt="Навроди ржёт в наушниках, изо рта вылетает запиканный мат" width="300" height="300">' +
    '<p class="hero-text">Трещим с искусственным интеллектом. Мат запикан ' + робот("#e8892f", 30, "мат") + ' чтобы не упасть со стула.</p>';

  var кнопки = document.getElementById("knopki");
  if (кнопки) кнопки.innerHTML =
    ссылка(ССЫЛКИ.telegram, "<b>" + самолётик(34) + "Телеграм</b><span>полные выпуски</span><i class=\"tyk\">тык!</i>", "plate t1") +
    ссылка(ССЫЛКИ.bot, "<b>Чё за Навроди? " + робот("#eadfc8", 34, "думает") + "</b><span>что это? кто это? написать ✍️</span><i class=\"tyk\">клац!</i>", "plate t4") +
    (ССЫЛКИ.youtube ? ссылка(ССЫЛКИ.youtube, "<b>YouTube</b><span>пИИп-ец Подкаст, эфИИры</span><i class=\"tyk\">жми!</i>", "plate t2") : "") +
    (ССЫЛКИ.tiktok ? ссылка(ССЫЛКИ.tiktok, "<b>TikTok</b><span>коротко</span><i class=\"tyk\">дави!</i>", "plate t3") : "");

  var gosti = document.getElementById("gosti");
  if (gosti) {
    var карточка = function (г) {
      var лицо = г.тип === "человек" ? человек(64) : робот(г.цвет || "#eadfc8", 64);
      return '<div class="guest">' + лицо + '<b>' + г.имя + '</b><span>' + г.кто + (г.тип === "человек" ? " · человек" : "") + '</span><small>' + (г.заметка || "") + '</small></div>';
    };
    var стул = '<a class="guest stul" href="' + ССЫЛКИ.bot + '" target="_blank" rel="noopener">' + табурет(64) + '<b>Свободный стул</b><span>для тебя</span><small>Хочешь в эф<span class="ii">ИИ</span>р? Пиши.</small></a>';
    gosti.innerHTML = '<h3 class="g-h">Постоянные</h3><div class="g-row">' + ГОСТИ.map(карточка).join("") + '</div>' +
      '<h3 class="g-h">Гости</h3><div class="g-row">' + ГОСТИ_ЭФИРА.map(карточка).join("") + стул + '</div>';
  }

  var spisok = document.getElementById("vypuski");
  if (spisok) {
    var n = parseInt(spisok.getAttribute("data-limit") || "0", 10);
    var list = n ? ВЫПУСКИ.slice(0, n) : ВЫПУСКИ;
    spisok.innerHTML = list.length ? list.map(карточкаВыпуска).join("") : '<p class="empty">Первый выпуск готовится.</p>';
  }
  var pesni = document.getElementById("pesni");
  if (pesni) pesni.innerHTML = ПЕСНИ.map(function (п) {
    return '<article class="ep" style="--mood:' + (ЦВЕТ[п.настроение] || ЦВЕТ["весело"]) + '"><div class="ep-side"><span class="ep-num">♪</span></div><div class="ep-body"><h3>' + п.название + '</h3><p class="ep-meta">' + п.заметка + '</p>' +
      (п.ссылка ? '<div class="ep-links">' + ссылка(п.ссылка, "Слушать", "mini tg") + '</div>' : '') + '</div></article>';
  }).join("");

  var kop = document.getElementById("kopilka");
  if (kop) kop.innerHTML = ссылка(ССЫЛКИ.kopilka, "<b>Бросить в копилку 🪙</b><i class=\"tyk\">дзынь!</i><span>" + (ССЫЛКИ.kopilka ? "спасибо, родной" : "копилка скоро откроется") + "</span>", "plate t1");

  var podval = document.getElementById("podval");
  if (podval) podval.innerHTML = '<div class="wrap"><img src="avatar.jpg" alt="" width="40" height="40">' +
    '<span>' + ссылка(ССЫЛКИ.telegram, "Телеграм") + ' ' + (ССЫЛКИ.youtube ? ссылка(ССЫЛКИ.youtube, "YouTube") + ' ' : '') + ссылка(ССЫЛКИ.bot, "Написать") + (ССЫЛКИ.tiktok ? ' ' + ссылка(ССЫЛКИ.tiktok, "TikTok") : '') + '</span></div>';

  // штампик «тык!» выносим из дощечки, чтобы рваный край его не обрезал
  [].forEach.call(document.querySelectorAll(".plate"), function (p) {
    var t = p.querySelector(".tyk"); if (!t) return;
    var w = document.createElement("span"); w.className = "pw " + p.className.replace("plate", "").trim();
    p.parentNode.insertBefore(w, p); w.appendChild(p); w.appendChild(t);
  });
  [].forEach.call(document.querySelectorAll("a.soon"), function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); });
    a.title = "Ссылка появится скоро";
  });
});
