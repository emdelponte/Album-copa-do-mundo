// ============================================================
// APP.JS — Copa do Mundo 2026 Virtual Sticker Album
// ============================================================

// State
let collection = {}; // { "BRA-1": "normal" | "repeated", ... }
let currentCountry = null;
let currentScreen = "home";
let currentRegionFilter = "all";
let currentCollFilter = "all";
let pressTimer = null;
let longPressTriggered = false;

// ── Init ──────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  loadCollection();
  renderCountriesGrid();
  updateStats();

  // Splash animation
  setTimeout(() => {
    document.getElementById("splash").classList.add("fade-out");
    setTimeout(() => {
      document.getElementById("splash").classList.add("hidden");
      document.getElementById("app").classList.remove("hidden");
      document.getElementById("app").classList.add("fade-in");
    }, 600);
  }, 2000);
});

// ── Persistence ───────────────────────────────────────────
function saveCollection() {
  localStorage.setItem("copa2026_collection", JSON.stringify(collection));
  updateStats();
}

function loadCollection() {
  const saved = localStorage.getItem("copa2026_collection");
  if (saved) collection = JSON.parse(saved);
}

// ── Navigation ────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const screen = document.getElementById(id);
  screen.classList.add("active");
  screen.classList.add("screen-enter");
  setTimeout(() => screen.classList.remove("screen-enter"), 400);
  currentScreen = id.replace("screen-", "");

  const backBtn = document.getElementById("btn-back");
  if (currentScreen === "home") {
    backBtn.classList.add("hidden");
  } else {
    backBtn.classList.remove("hidden");
  }
}

function goBack() {
  if (currentScreen === "country") {
    showScreen("screen-home");
    renderCountriesGrid(); // refresh progress
  } else {
    showScreen("screen-home");
  }
}

function goHome() {
  showScreen("screen-home");
  renderCountriesGrid();
  updateStats();
}

// ── Countries Grid ────────────────────────────────────────
function renderCountriesGrid(filter = currentRegionFilter) {
  const grid = document.getElementById("countries-grid");
  grid.innerHTML = "";

  const list = filter === "all" ? COUNTRIES : COUNTRIES.filter(c => c.group === filter);

  list.forEach(country => {
    const owned = getCountryOwned(country.code);
    const total = getCountryTotal(country.code);
    const pct = Math.round((owned / total) * 100);
    const complete = owned === total;

    const card = document.createElement("div");
    card.className = `country-card${complete ? " complete" : ""}${country.host ? " host" : ""}`;
    card.setAttribute("data-group", country.group);
    card.onclick = () => openCountry(country);

    card.innerHTML = `
      <div class="card-flag">${country.flag}</div>
      <div class="card-group-badge">${country.group === 'Extra' || country.group === 'FWC' ? country.name : 'Grupo ' + country.group}</div>
      <div class="card-name">${country.name}</div>
      <div class="card-progress-wrap">
        <div class="card-progress-bar">
          <div class="card-progress-fill" style="width:${pct}%"></div>
        </div>
        <span class="card-progress-text">${owned}/${total}</span>
      </div>
      ${complete ? '<div class="card-badge">✔ COMPLETO</div>' : ""}
      ${country.host ? '<div class="card-host-badge">SEDE</div>' : ""}
    `;

    grid.appendChild(card);
  });
}

function filterRegion(btn, group) {
  document.querySelectorAll(".region-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  currentRegionFilter = group;
  renderCountriesGrid(group);
}

function getCountryOwned(code) {
  return Object.keys(collection).filter(k => k.startsWith(code + "-")).length;
}

function getCountryTotal(code) {
  const country = COUNTRIES.find(c => c.code === code);
  return country ? (country.count || STICKERS_PER_COUNTRY) : STICKERS_PER_COUNTRY;
}

// ── Country / Stickers Screen ─────────────────────────────
function openCountry(country) {
  currentCountry = country;
  document.getElementById("detail-flag").textContent = country.flag;
  document.getElementById("detail-name").textContent = country.name;
  document.getElementById("detail-region").textContent = `Grupo ${country.group}`;
  
  updateCountryNav();
  renderStickersGrid(country);
  showScreen("screen-country");
}

function updateCountryNav() {
  const index = COUNTRIES.findIndex(c => c.code === currentCountry.code);
  const total = COUNTRIES.length;

  const prevBtn = document.getElementById("btn-prev-country");
  const nextBtn = document.getElementById("btn-next-country");
  const prevLabel = document.getElementById("nav-prev-name");
  const nextLabel = document.getElementById("nav-next-name");
  const indexLabel = document.getElementById("country-nav-index");

  indexLabel.textContent = `${index + 1} / ${total}`;

  if (index > 0) {
    prevBtn.disabled = false;
    prevLabel.textContent = COUNTRIES[index - 1].name;
  } else {
    prevBtn.disabled = true;
    prevLabel.textContent = "";
  }

  if (index < total - 1) {
    nextBtn.disabled = false;
    nextLabel.textContent = COUNTRIES[index + 1].name;
  } else {
    nextBtn.disabled = true;
    nextLabel.textContent = "";
  }
}

function navigateCountry(dir) {
  const index = COUNTRIES.findIndex(c => c.code === currentCountry.code);
  const newIndex = index + dir;
  if (newIndex >= 0 && newIndex < COUNTRIES.length) {
    openCountry(COUNTRIES[newIndex]);
  }
}

function renderStickersGrid(country) {
  const grid = document.getElementById("stickers-grid");
  grid.innerHTML = "";

  let owned = 0;
  const count = country.count || STICKERS_PER_COUNTRY;
  const startAt = country.startZero ? 0 : 1;
  const endAt = country.startZero ? (count - 1) : count;

  for (let i = startAt; i <= endAt; i++) {
    const key = `${country.code}-${i}`;
    const state = collection[key] || "none"; // none | normal | repeated
    if (state !== "none") owned++;

    const cell = document.createElement("div");
    cell.className = `sticker sticker-${state}`;
    cell.id = `sticker-${key}`;
    cell.dataset.key = key;
    cell.innerHTML = buildStickerInner(i, state);

    attachStickerEvents(cell, key);
    grid.appendChild(cell);
  }

  updateCountryProgress(country.code, owned);
}

function buildStickerInner(num, state) {
  return `
    <span class="sticker-num">${num}</span>
    ${state === "repeated" ? '<span class="sticker-rep-badge">R</span>' : ""}
    ${state === "normal" ? '<span class="sticker-check">✔</span>' : ""}
  `;
}

function attachStickerEvents(cell, key) {
  let _pressTimer = null;
  let _longFired = false;

  function onLongPress() {
    _longFired = true;
    _pressTimer = null;
    const current = collection[key] || "none";
    if (current !== "repeated") {
      collection[key] = "repeated";
      showToast(`Marcada como REPETIDA! 🔁`);
    } else {
      collection[key] = "normal";
      showToast(`Repetida removida`);
    }
    saveCollection();
    refreshStickerCell(key);
    updateCountryProgress(currentCountry.code, getCountryOwned(currentCountry.code));
    if (navigator.vibrate) navigator.vibrate(80);
  }

  function startPress() {
    _longFired = false;
    _pressTimer = setTimeout(onLongPress, 600);
  }

  function cancelPress() {
    if (_pressTimer) {
      clearTimeout(_pressTimer);
      _pressTimer = null;
    }
  }

  // ── Mouse (desktop) ──
  cell.addEventListener("mousedown", startPress);
  cell.addEventListener("mouseup", cancelPress);
  cell.addEventListener("mouseleave", cancelPress);
  cell.addEventListener("click", () => {
    if (_longFired) { _longFired = false; return; } // ignore click after long press
    toggleSticker(key);
  });

  // ── Touch (mobile) ──
  cell.addEventListener("touchstart", (e) => {
    e.preventDefault(); // prevent ghost click & scrolling on the cell
    startPress();
  }, { passive: false });

  cell.addEventListener("touchend", (e) => {
    e.preventDefault();
    if (_pressTimer) {
      // Short tap — it's a toggle
      cancelPress();
      if (!_longFired) toggleSticker(key);
    }
    // If _pressTimer is null here, long press already fired — do nothing
  }, { passive: false });

  cell.addEventListener("touchcancel", () => {
    cancelPress();
  });
}

function toggleSticker(key) {
  const current = collection[key] || "none";

  if (current === "none") {
    collection[key] = "normal";
    showToast(`Figurinha marcada! ✔`);
  } else if (current === "normal") {
    delete collection[key];
    showToast(`Figurinha desmarcada`);
  } else if (current === "repeated") {
    collection[key] = "normal";
    showToast(`Marcada como normal`);
  }

  saveCollection();
  refreshStickerCell(key);
  updateCountryProgress(currentCountry.code, getCountryOwned(currentCountry.code));
}

function refreshStickerCell(key) {
  const state = collection[key] || "none";
  const cell = document.getElementById(`sticker-${key}`);
  if (!cell) return;

  // Update class and inner HTML only — events stay on the element (not re-attached)
  cell.className = `sticker sticker-${state}`;
  const num = key.split("-").slice(1).join("-"); // handles codes like USA-1
  cell.innerHTML = buildStickerInner(num, state);
  // NOTE: events attached in attachStickerEvents remain bound to the element;
  // innerHTML only replaces child nodes, not the element itself.
}

function updateCountryProgress(code, owned) {
  const total = getCountryTotal(code);
  const pct = Math.round((owned / total) * 100);
  document.getElementById("detail-count").textContent = `${owned}/${total}`;
  document.getElementById("detail-progress").style.width = `${pct}%`;
  updateCollectionBadge();
}

function markAllCountry() {
  if (!currentCountry) return;
  const count = currentCountry.count || STICKERS_PER_COUNTRY;
  const startAt = currentCountry.startZero ? 0 : 1;
  const endAt = currentCountry.startZero ? (count - 1) : count;

  for (let i = startAt; i <= endAt; i++) {
    const key = `${currentCountry.code}-${i}`;
    if (!collection[key]) collection[key] = "normal";
  }
  saveCollection();
  renderStickersGrid(currentCountry);
  showToast("Todas as figurinhas marcadas! 🎉");
}

function clearCountry() {
  if (!currentCountry) return;
  if (!confirm(`Limpar todas as figurinhas de ${currentCountry.name}?`)) return;
  
  const count = currentCountry.count || STICKERS_PER_COUNTRY;
  const startAt = currentCountry.startZero ? 0 : 1;
  const endAt = currentCountry.startZero ? (count - 1) : count;

  for (let i = startAt; i <= endAt; i++) {
    delete collection[`${currentCountry.code}-${i}`];
  }
  saveCollection();
  renderStickersGrid(currentCountry);
  showToast("Seção limpa");
}

// ── Collection Screen ─────────────────────────────────────
function showCollection() {
  renderCollection();
  showScreen("screen-collection");
}

function renderCollection() {
  const list = document.getElementById("collection-list");
  const empty = document.getElementById("collection-empty");
  const query = (document.getElementById("search-input")?.value || "").toLowerCase().trim();

  list.innerHTML = "";

  let groups = [];

  COUNTRIES.forEach(country => {
    const stickers = [];
    const count = country.count || STICKERS_PER_COUNTRY;
    const startAt = country.startZero ? 0 : 1;
    const endAt = country.startZero ? (count - 1) : count;

    for (let i = startAt; i <= endAt; i++) {
      const key = `${country.code}-${i}`;
      const state = collection[key] || "none";

      let show = false;
      if (currentCollFilter === "all") show = true;
      else if (currentCollFilter === "normal") show = state === "normal";
      else if (currentCollFilter === "repeated") show = state === "repeated";
      else if (currentCollFilter === "missing") show = state === "none";

      if (!show) continue; // ← era `return`, que saía do forEach inteiro!

      // Search filter
      if (query) {
        const matchCountry = country.name.toLowerCase().includes(query) || country.code.toLowerCase().includes(query);
        const matchNum = String(i).includes(query);
        if (!matchCountry && !matchNum) continue; // ← idem
      }

      stickers.push({ num: i, state, key });
    }

    if (stickers.length > 0) {
      groups.push({ country, stickers });
    }
  });

  if (groups.length === 0) {
    empty.classList.remove("hidden");
    list.classList.add("hidden");
    return;
  }

  empty.classList.add("hidden");
  list.classList.remove("hidden");

  groups.forEach(({ country, stickers }) => {
    const section = document.createElement("div");
    section.className = "coll-section";

    const header = document.createElement("div");
    header.className = "coll-section-header";
    header.innerHTML = `
      <span class="coll-flag">${country.flag}</span>
      <span class="coll-country-name">${country.name}</span>
      <span class="coll-country-code">${country.code}</span>
      <span class="coll-owned">${getCountryOwned(country.code)}/${getCountryTotal(country.code)}</span>
    `;
    header.onclick = () => openCountry(country);

    const chips = document.createElement("div");
    chips.className = "coll-chips";

    stickers.forEach(({ num, state, key }) => {
      const chip = document.createElement("div");
      chip.className = `coll-chip coll-chip-${state}`;
      chip.textContent = `${country.code}-${num}`;
      chip.title = state === "repeated" ? "Repetida" : state === "normal" ? "Tenho" : "Falta";
      chip.onclick = () => {
        currentCountry = country;
        openCountry(country);
      };
      chips.appendChild(chip);
    });

    section.appendChild(header);
    section.appendChild(chips);
    list.appendChild(section);
  });
}

function filterCollection() {
  renderCollection();
}

function clearSearch() {
  document.getElementById("search-input").value = "";
  renderCollection();
}

function setCollFilter(btn, filter) {
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  currentCollFilter = filter;
  renderCollection();
}

// ── Stats ─────────────────────────────────────────────────
function updateStats() {
  const totalOwned = Object.keys(collection).length;
  const countriesCount = new Set(Object.keys(collection).map(k => k.split("-")[0])).size;
  
  // Dynamic total stickers sum
  const totalStickers = COUNTRIES.reduce((acc, c) => acc + (c.count || STICKERS_PER_COUNTRY), 0);
  const pct = Math.round((totalOwned / totalStickers) * 100);

  document.getElementById("stat-total").textContent = totalOwned;
  document.getElementById("stat-countries").textContent = countriesCount;
  document.getElementById("stat-pct").textContent = pct + "%";
  updateCollectionBadge();
}

function updateCollectionBadge() {
  const total = Object.keys(collection).length;
  document.getElementById("collection-badge").textContent = total;
}

// ── Export / Import ───────────────────────────────────────
function exportData() {
  const json = JSON.stringify(collection, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "copa2026_album.json";
  a.click();
  URL.revokeObjectURL(url);
  showToast("Dados exportados! 📤");
}

function importDataClick() {
  document.getElementById("import-file").click();
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      collection = data;
      saveCollection();
      renderCollection();
      updateStats();
      showToast("Dados importados com sucesso! 📥");
    } catch {
      showToast("Erro ao importar arquivo ❌");
    }
  };
  reader.readAsText(file);
}

// ── Toast ─────────────────────────────────────────────────
let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2200);
}

// ── Helpers ───────────────────────────────────────────────
function getGroupLabel(group) {
  return `Grupo ${group} — Copa do Mundo 2026`;
}
