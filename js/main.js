// GSAPプラグインの登録
gsap.registerPlugin(ScrollTrigger);

// ページ読み込み時の初期設定
document.addEventListener("DOMContentLoaded", () => {
    // 初期状態の設定（非表示にしておく）
    gsap.set("#main-viewport", { autoAlpha: 0 });
    gsap.set(".hud-container", { autoAlpha: 0 });
    gsap.set(".mech-frame", { scale: 1.1, opacity: 0 });
    
    // GitHubグラフの生成（API取得開始）
    initGitHubGraph();
});

// ■ 起動シーケンス
window.initSystem = function() {
    const tl = gsap.timeline();

    // 1. スタート画面をフェードアウト
    tl.to("#start-screen", {
        duration: 1,
        opacity: 0,
        pointerEvents: "none",
        ease: "power2.inOut",
        onComplete: () => {
            const startScreen = document.getElementById('start-screen');
            if(startScreen) startScreen.style.display = 'none';
        }
    })
    // 2. メカフレームとHUDの展開
    .to(".mech-frame", {
        duration: 1.5,
        scale: 1,
        opacity: 1,
        stagger: 0.1,
        ease: "elastic.out(1, 0.7)"
    }, "-=0.5")
    .to(".hud-container", {
        duration: 0.5,
        autoAlpha: 1
    }, "-=1.0")
    // 3. メインコンテンツの表示
    .to("#main-viewport", {
        duration: 1,
        autoAlpha: 1,
        onComplete: startHudSystems // アニメーション完了後にシステム始動
    }, "-=0.5");
};

// ■ HUDシステム（常時稼働系）
function startHudSystems() {
    // 【修正】バッテリー表示：APIを使わず、演出として100%へアニメーションさせる
    // これにより、どのブラウザでも確実に動作します
    const batteryDisplay = document.getElementById("battery-display");
    
    gsap.to("#batt-bar", {
        width: "100%", // バーを100%にする
        duration: 2,
        ease: "power1.inOut",
        onUpdate: function() {
            // バーの伸びに合わせて数値をカウントアップさせる演出
            const val = Math.round(this.ratio * 100);
            if(batteryDisplay) {
                batteryDisplay.innerText = `POWER: ${val}%`;
                
                // 演出：文字色を少し変化させる（オプション）
                if(val < 30) batteryDisplay.style.color = "var(--alert-color)";
                else batteryDisplay.style.color = "var(--primary-color)";
            }
        },
        onComplete: function() {
            if(batteryDisplay) batteryDisplay.innerText = "POWER: 100% [MAX]";
        }
    });

    // スキルバーのアニメーション
    gsap.utils.toArray(".skill-bar-fill").forEach((bar) => {
        const width = bar.style.width; 
        gsap.fromTo(bar, 
            { width: "0%" },
            { width: width, duration: 1.5, ease: "power2.out", delay: 0.5 }
        );
    });

    // スクロール連動エフェクトの開始
    initScrollEffects();
}

// ■ スクロール連動エフェクト
function initScrollEffects() {
    ScrollTrigger.refresh();

    const sections = gsap.utils.toArray("section");
    sections.forEach((section) => {
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%", 
                toggleActions: "play none none reverse",
                scroller: "#main-viewport"
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // 横スクロール対応
    const workContainer = document.querySelector(".horizontal-scroll");
    if(workContainer) {
        workContainer.addEventListener("wheel", (evt) => {
            if (!evt.shiftKey) {
                evt.preventDefault();
                workContainer.scrollLeft += evt.deltaY;
            }
        });
    }
}

// ■ GitHub Activity Graph (API取得版)
async function initGitHubGraph() {
    const username = 'hou-rai3';
    const graphContainer = document.getElementById('git-graph');
    if (!graphContainer) return;
    
    try {
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);
        const data = await response.json();
        const contributions = data.contributions || [];
        
        if (contributions.length === 0) throw new Error("No data found");

        const recentContributions = contributions.slice(-49);

        while (recentContributions.length < 49) {
            recentContributions.unshift({ count: 0, level: 0 });
        }

        graphContainer.innerHTML = ''; 

        recentContributions.forEach(day => {
            const dot = document.createElement('div');
            dot.className = 'git-dot';
            if (day.level > 0) {
                dot.classList.add(`active-${day.level}`);
            }
            dot.title = `${day.date}: ${day.count} contributions`;
            graphContainer.appendChild(dot);
        });

    } catch (error) {
        console.error('GitHub API Error:', error);
        generateDummyGraph(graphContainer);
    }
}

// フォールバック用ダミーグラフ
function generateDummyGraph(container) {
    container.innerHTML = '';
    for (let i = 0; i < 49; i++) {
        const dot = document.createElement('div');
        dot.className = 'git-dot';
        if (Math.random() > 0.7) dot.classList.add('active-1');
        container.appendChild(dot);
    }
}