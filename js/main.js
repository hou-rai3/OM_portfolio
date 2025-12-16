// GSAPのプラグイン登録
gsap.registerPlugin(ScrollTrigger);

// === SYSTEM INITIALIZATION SEQUENCE (Faster) ===
function initSystem() {
    const tl = gsap.timeline();

    // 1. スタート画面を消す
    tl.to("#start-screen", { opacity: 0, duration: 0.3, onComplete: () => document.getElementById('start-screen').style.display = 'none' });

    // 2. メカフレーム（ハッチ）が閉まる [高速化]
    tl.to(".frame-left", { left: 0, duration: 0.5, ease: "power2.inOut" }, "close-side");
    tl.to(".frame-right", { right: 0, duration: 0.5, ease: "power2.inOut" }, "close-side");
    
    tl.to(".frame-top", { top: 0, duration: 0.6, ease: "power4.inOut" }, "close-vert-=0.1"); 
    tl.to(".frame-bottom", { bottom: 0, duration: 0.6, ease: "power4.inOut" }, "close-vert-=0.1");

    // 支柱の出現
    tl.to([".frame-pillar-left", ".frame-pillar-right"], { opacity: 1, duration: 0.2 }, "-=0.2");

    // 3. システム起動エフェクト (HUD点灯)
    tl.to(".hud-container", { opacity: 1, duration: 0.1 }); 
    tl.from(".screen-glass", { scaleY: 0, opacity: 0, duration: 0.3, stagger: 0.1, ease: "back.out(1.7)" });
    
    // 4. コンテンツ表示許可 & 各種初期化
    tl.add(() => {
        document.body.style.overflow = "auto";
        initScrollAnimations();
        initBatterySystem();
        initGitHubGraph(); // GitHub連携開始
        
        // 横スクロールのホイール操作補助
        const scrollContainer = document.querySelector('.horizontal-scroll');
        if(scrollContainer) {
            scrollContainer.addEventListener('wheel', (evt) => {
                if (!evt.shiftKey) { 
                    evt.preventDefault();
                    scrollContainer.scrollLeft += evt.deltaY;
                }
            });
        }
    });
}

function initScrollAnimations() {
    gsap.utils.toArray('section').forEach(section => {
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse",
                scroller: "#main-viewport"
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
        });
    });
}

// === GITHUB GRAPH INTEGRATION ===
async function initGitHubGraph() {
    const username = 'hou-rai3';
    const graphContainer = document.getElementById('git-graph');
    
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
        console.error('Failed to fetch GitHub contributions:', error);
        generateRandomGraph(graphContainer); 
    }
}

function generateRandomGraph(container) {
    container.innerHTML = '';
    for (let i = 0; i < 49; i++) {
        const dot = document.createElement('div');
        dot.className = 'git-dot';
        const rand = Math.random();
        if (rand > 0.8) dot.classList.add('active-3');
        else if (rand > 0.6) dot.classList.add('active-2');
        else if (rand > 0.3) dot.classList.add('active-1');
        container.appendChild(dot);
    }
}

// === BATTERY SYSTEM MANAGEMENT ===
function initBatterySystem() {
    const batteryDisplay = document.getElementById('battery-display');
    const batteryBar = document.getElementById('batt-bar');
    const battIcon = document.querySelector('.batt-icon');

    if ('getBattery' in navigator) {
        navigator.getBattery().then(function(battery) {
            
            function updateBatteryUI() {
                const level = Math.floor(battery.level * 100);
                const isCharging = battery.charging;
                
                let text = `BATT: ${level}%`;
                if (isCharging) {
                    text += ' [CHRG]';
                }
                batteryDisplay.textContent = text;
                batteryBar.style.width = `${level}%`;

                if (level <= 20 && !isCharging) {
                    batteryDisplay.style.color = 'var(--alert-color)';
                    batteryDisplay.style.textShadow = '0 0 10px var(--alert-color)';
                    batteryBar.style.background = 'var(--alert-color)';
                    batteryBar.style.boxShadow = '0 0 5px var(--alert-color)';
                    battIcon.style.borderColor = 'var(--alert-color)';
                    batteryBar.style.animation = 'blink 0.5s infinite';
                } else {
                    batteryDisplay.style.color = 'var(--primary-color)';
                    batteryDisplay.style.textShadow = 'none';
                    batteryBar.style.background = 'var(--primary-color)';
                    batteryBar.style.boxShadow = '0 0 5px var(--primary-color)';
                    battIcon.style.borderColor = 'var(--primary-color)';
                    batteryBar.style.animation = 'batt-pulse 4s infinite';
                }
            }

            updateBatteryUI();

            battery.addEventListener('levelchange', updateBatteryUI);
            battery.addEventListener('chargingchange', updateBatteryUI);
        });
    } else {
        batteryDisplay.textContent = "BATT: N/A";
        batteryBar.style.width = "100%";
    }
}