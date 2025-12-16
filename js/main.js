// GSAPプラグインの登録
gsap.registerPlugin(ScrollTrigger);

// ページ読み込み時の初期設定
document.addEventListener("DOMContentLoaded", () => {
    // メインコンテンツとHUDを最初は隠しておく
    gsap.set("#main-viewport", { autoAlpha: 0 });
    gsap.set(".hud-container", { autoAlpha: 0 });
    gsap.set(".mech-frame", { scale: 1.1, opacity: 0 });
    
    // GitHubグラフの生成（ダミーデータの描画）
    generateGitGraph();
});

// ■ 起動シーケンス（HTMLのボタンから呼び出される関数）
window.initSystem = function() {
    const tl = gsap.timeline();

    // 1. スタート画面をフェードアウト
    tl.to("#start-screen", {
        duration: 1,
        opacity: 0,
        pointerEvents: "none",
        ease: "power2.inOut",
        onComplete: () => {
            document.getElementById('start-screen').style.display = 'none';
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
        onComplete: startHudSystems // アニメーション完了後に常時稼働システムを始動
    }, "-=0.5");
};

// ■ HUDシステム（常時稼働系）
function startHudSystems() {
    // バッテリー表示のアニメーション
    gsap.to("#batt-bar", {
        width: "100%",
        duration: 2,
        ease: "power1.inOut",
        onUpdate: function() {
            // 数値をランダムに変動させる演出
            const val = Math.round(this.ratio * 100);
            const disp = document.getElementById("battery-display");
            if(disp) disp.innerText = `POWER: ${val}%`;
        }
    });

    // スキルバーのアニメーション
    gsap.utils.toArray(".skill-bar-fill").forEach((bar) => {
        const width = bar.style.width; // HTMLに書かれたwidthを取得
        gsap.fromTo(bar, 
            { width: "0%" },
            { width: width, duration: 1.5, ease: "power2.out", delay: 0.5 }
        );
    });

    // スクロール連動アニメーションの有効化
    initScrollEffects();
}

// ■ スクロール連動エフェクト
function initScrollEffects() {
    // ScrollTriggerの位置計算をリフレッシュ（display:noneから復帰した際に必要）
    ScrollTrigger.refresh();

    // セクションごとのフェードイン
    const sections = gsap.utils.toArray("section");
    sections.forEach((section) => {
        gsap.fromTo(section, 
            { y: 50, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%", // 画面の80%の位置に来たら開始
                    toggleActions: "play none none reverse",
                    scroller: "#main-viewport" // 重要：スクロールするコンテナを指定
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
            }
        );
    });

    // WORKSセクションの横スクロール演出（マウスホイールで横に動く）
    const workContainer = document.querySelector(".horizontal-scroll");
    if(workContainer) {
        workContainer.addEventListener("wheel", (evt) => {
            // Shiftキーが押されていない場合のみ横スクロールに変換
            if (!evt.shiftKey) {
                evt.preventDefault();
                workContainer.scrollLeft += evt.deltaY;
            }
        });
    }
}

// ■ GitHub風グラフの生成（装飾用）
function generateGitGraph() {
    const container = document.getElementById("git-graph");
    if (!container) return;

    // 7列 x 5行のグリッドを作成
    for (let i = 0; i < 35; i++) {
        const div = document.createElement("div");
        div.style.width = "10px";
        div.style.height = "10px";
        div.style.margin = "2px";
        div.style.display = "inline-block";
        div.style.backgroundColor = "#00f0ff";
        
        // ランダムな透明度で「活動している感」を出す
        const opacity = Math.random() > 0.5 ? Math.random() * 0.8 + 0.2 : 0.1;
        div.style.opacity = opacity;
        
        container.appendChild(div);
    }
}