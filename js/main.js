const works = [
    {
        title: "高専ロボコン2024",
        tag: "Robocon",
        category: "Robocon",
        year: "2024",
        role: "制御",
        image: "images/himari.png",
        url: "https://official-robocon.com/kosen/",
        description: "Aチーム「銀火」のR1の機構制御を担当。",
        details: ["100点着地の安定動作", "R2のエリア3への射出", "地区大会準優勝・全国大会優勝"],
    },
     {
        title: "高専ロボコン2025",
        tag: "Robocon",
        category: "Robocon",
        year: "2025",
        role: "チームリーダー",
        image: "images/isana.png",
        url: "https://official-robocon.com/kosen/",
        description: "Aチーム「勇華」でチームリーダーとしてプロジェクトマネジメントを担当。",
        details: ["", "", ""],
    },
     {
        title: "高専ロボコン2026",
        tag: "Robocon",
        category: "Robocon",
        year: "2026",
        role: "チームリーダー",
        image: "images/none.png",
        url: "https://official-robocon.com/kosen/",
        description: "Aチーム「???」でチームリーダーとしてプロジェクトマネジメントを担当。",
        details: ["10月11日に近畿地区大会", "11月15日に全国大会", ""],
    },
    {
        title: "春ロボコン",
        tag: "Robot",
        category: "Robocon",
        year: "2024 - 2026",
        role: "設計補助 / 制御 / 改善",
        image: "images/greathing.png",
        url: "https://kansai-harurobo.org/",
        description: "短い開発期間の中で試作と改善を繰り返し、競技に必要な動きを形にしました。",
        details: ["操作性を意識した制御", "現地調整を前提にした改善", "競技中のトラブル対応"],
    },
    {
        title: "Battle with Slime",
        tag: "Game",
        category: "Other works",
        year: "2025",
        role: "Game logic / UI",
        image: "images/slime.png",
        url: "https://github.com/hou-rai3/battle_with_slime",
        description: "ゲームとしてすぐ理解できる動きと、画面上の分かりやすさを意識して制作しました。",
        details: ["当たり判定と状態管理", "画面遷移とUI調整", "プレイ感の調整"],
    },
    {
        title: "Steering Simulator",
        tag: "Simulator",
        category: "Other works",
        year: "2025",
        role: "Simulation / Tool",
        image: "images/steer.png",
        url: "https://github.com/hou-rai3/steering_simulator_ultimate-edition",
        description: "ロボットの動き方を画面上で確認し、設計や制御の検討に使うためのツールです。",
        details: ["ステアリング動作の可視化", "パラメータ調整", "検討用ツールとして整理"],
    },
    {
        title: "Pose Estimation",
        tag: "AI",
        category: "Other works",
        year: "2025",
        role: "Prototype / Interaction",
        image: "images/kousensai4.png",
        url: "https://github.com/hou-rai3/Pose_Estimation",
        description: "人の動きや入力を使って、画面内の体験が変化するインタラクティブ作品です。",
        details: ["入力情報の取得", "画面演出との連携", "展示向けの調整"],
    },
    {
        title: "Card Maker",
        tag: "Web",
        category: "Other works",
        year: "2025",
        role: "Frontend / Generator",
        image: "images/danjin-card-fixed.gif",
        url: "https://hou-rai3.github.io/danjin-card/",
        description: "入力した情報から、ブラウザ上でカード画像を生成できるWebツールです。",
        details: ["フォーム入力の整理", "カード表示の調整", "公開ページとして実装"],
    },
];

const histories = [
    { date: "2023", title: "ロボット制作を開始", text: "制御、機体調整、チームでの制作フローを経験。" },
    { date: "2024", title: "ロボコンでの開発経験", text: "高専ロボコン、春ロボコンなどで実装と改善を重ねる。" },
    { date: "2025", title: "制作範囲を拡張", text: "ロボット制作に加え、Webツールやゲーム制作にも取り組む。" },
    { date: "2026", title: "成果を見せる形へ", text: "制作物を整理し、伝わるポートフォリオとして公開準備。" },
];

const scrollRoot = document.getElementById("page");
const nav = document.getElementById("global_nav");
const sections = Array.from(document.querySelectorAll("#page > .container"));
const navLinks = Array.from(document.querySelectorAll("[data-jump]"));
const workCategories = ["Robocon", "Other works"];
const workIndexes = Object.fromEntries(workCategories.map((category) => [category, 0]));

let activeIndex = 0;
let activeWorkCategory = workCategories[0];
let isPageMoving = false;

function getCurrentWorks() {
    return works.filter((work) => work.category === activeWorkCategory);
}

function moveWork(direction) {
    const currentWorks = getCurrentWorks();
    if (currentWorks.length === 0) return;

    const nextIndex = (workIndexes[activeWorkCategory] + direction + currentWorks.length) % currentWorks.length;
    workIndexes[activeWorkCategory] = nextIndex;
    updateWorkTrack();
}

function updateWorkTrack() {
    const currentIndex = workIndexes[activeWorkCategory];
    const track = document.querySelector(".works_track");

    if (track) {
        track.style.transform = `translate3d(${-100 * currentIndex}%, 0, 0)`;
    }
}

function renderWorks() {
    const wrapper = document.getElementById("works-list");
    if (!wrapper) return;

    const currentWorks = getCurrentWorks();
    const currentIndex = Math.min(workIndexes[activeWorkCategory], currentWorks.length - 1);
    workIndexes[activeWorkCategory] = currentIndex;

    wrapper.innerHTML = "";

    const tabList = document.createElement("div");
    tabList.className = "works_tabs";
    workCategories.forEach((category) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "works_tab";
        button.textContent = category;
        button.setAttribute("aria-pressed", String(category === activeWorkCategory));
        button.addEventListener("click", () => {
            activeWorkCategory = category;
            renderWorks();
        });
        tabList.appendChild(button);
    });

    const intro = document.createElement("p");
    intro.className = "works_intro";
    intro.textContent = activeWorkCategory === "Robocon"
        ? "ロボコン関連の制作です。機体制作、制御、調整など、チームで動くものを完成させる過程をまとめています。"
        : "ゲーム、Webツール、シミュレーターなど、個人制作や展示向けに作ったものです。";

    const carousel = document.createElement("div");
    carousel.className = "works_carousel";
    carousel.innerHTML = `
        <button class="work_nav prev" type="button" aria-label="前の制作物へ"></button>
        <div class="works_viewport">
            <div class="works_track">
                ${currentWorks.map((work, index) => `<article class="work_focus">${getWorkMarkup(work, index, currentWorks.length)}</article>`).join("")}
            </div>
        </div>
        <button class="work_nav next" type="button" aria-label="次の制作物へ"></button>
    `;

    carousel.querySelector(".prev").addEventListener("click", () => moveWork(-1));
    carousel.querySelector(".next").addEventListener("click", () => moveWork(1));

    wrapper.appendChild(tabList);
    wrapper.appendChild(intro);
    wrapper.appendChild(carousel);
    updateWorkTrack();
}

function getWorkMarkup(work, currentIndex, total) {
    return `
        <a class="work_focus_media" href="${work.url}" target="_blank" rel="noopener">
            <img src="${work.image}" alt="${work.title}">
        </a>
        <div class="work_focus_body">
            <div class="work_meta">
                <span class="work_tag">${work.tag}</span>
                <span>${work.year}</span>
                    <span class="works_counter">${currentIndex + 1} / ${total}</span>
            </div>
            <h3 class="work_content_name">${work.title}</h3>
            <p class="work_role">${work.role}</p>
            <p class="work_contents_text">${work.description}</p>
            <ul class="work_details">
                ${work.details.map((detail) => `<li>${detail}</li>`).join("")}
            </ul>
        </div>
    `;
}

function renderHistory() {
    const list = document.getElementById("history-list");
    if (!list) return;

    list.innerHTML = histories.map((item) => `
        <article class="history_object">
            <div class="history_text"><span><strong>${item.title}</strong>${item.text}</span></div>
            <div class="history_circle_box"><div class="history_circle"></div></div>
            <div class="history_date">${item.date}</div>
        </article>
    `).join("");
}

function getSectionIndex(id) {
    const index = sections.findIndex((section) => section?.id === id);
    return index < 0 ? 0 : index;
}

function goToSection(index) {
    const nextIndex = Math.min(Math.max(index, 0), sections.length - 1);
    const target = sections[nextIndex];
    if (!target) return;
    isPageMoving = true;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
        isPageMoving = false;
    }, 720);
}

function setActive(index) {
    activeIndex = index;
    navLinks.forEach((link) => {
        link.classList.toggle("is-active", getSectionIndex(link.dataset.jump) === index);
    });
}

function setupNavigation() {
    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            goToSection(getSectionIndex(link.dataset.jump));
            nav?.classList.remove("motion");
        });
    });

    const navHitArea = document.querySelector(".nav-hit-area");
    navHitArea?.addEventListener("mouseenter", () => nav?.classList.add("motion"));
    navHitArea?.addEventListener("click", () => nav?.classList.toggle("motion"));
    nav?.addEventListener("mouseleave", () => nav.classList.remove("motion"));

    scrollRoot?.addEventListener("wheel", (event) => {
        const isInsideScrollableWorkText = event.target.closest(".work_focus_body");
        if (isInsideScrollableWorkText && isInsideScrollableWorkText.scrollHeight > isInsideScrollableWorkText.clientHeight) {
            return;
        }
        if (Math.abs(event.deltaY) < 28 || Math.abs(event.deltaY) < Math.abs(event.deltaX) || isPageMoving) return;

        event.preventDefault();
        goToSection(activeIndex + (event.deltaY > 0 ? 1 : -1));
    }, { passive: false });

    window.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ") {
            event.preventDefault();
            goToSection(activeIndex + 1);
        }
        if (event.key === "ArrowUp" || event.key === "PageUp") {
            event.preventDefault();
            goToSection(activeIndex - 1);
        }
        if (document.getElementById("works")?.contains(document.activeElement) || activeIndex === getSectionIndex("works")) {
            if (event.key === "ArrowRight") moveWork(1);
            if (event.key === "ArrowLeft") moveWork(-1);
        }
    });
}

function observeSections() {
    const observer = new IntersectionObserver((entries) => {
        const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(getSectionIndex(visible.target.id));
    }, {
        root: scrollRoot,
        threshold: [0.55, 0.75],
    });

    sections.forEach((section) => {
        if (section) observer.observe(section);
    });
}

renderWorks();
renderHistory();
setupNavigation();
observeSections();
setActive(0);
