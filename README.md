# PORTFOLIO

[![Pilot Status](https://img.shields.io/badge/STATUS-ONLINE-00f0ff?style=for-the-badge&logo=probot)](https://github.com/hou-rai3)
[![System](https://img.shields.io/badge/SYSTEM-VER_3.12-00a8ff?style=for-the-badge)](https://github.com/hou-rai3)

**"NEURAL LINK ESTABLISHED."**

大阪公立大学工業高等専門学校 岡部昊斗のポートフォリオサイトです。
[こちら](https://hou-rai3.github.io/OM_portfolio/)からご覧になれます。
## System Gimmicks (技術的な小ネタ)

没入感とかっこよさを高めるためのギミックを搭載しています。

### 1. Startup Sequence (GSAP Animation)
ページロード時に発動するシステム起動シーケンスです。
- **GSAP (GreenSock Animation Platform)** を使用し、Timeline制御による精密なアニメーションを実装。
- メカニカルなハッチの開放、HUDの展開、ガラスの反射エフェクトなどを順番に実行し、コックピットに乗り込むような雰囲気を演出しています。


### 2. Live GitHub Activity Graph
HUD右側の `CODE ACTIVITY` パネルには、実際のGitHub活動状況が表示されます。
- 外部APIを使用し、私 `@hou-rai3` の直近49日間のコントリビューションデータを動的にフェッチ。
- 取得したデータを、GitHub純正の色ではなく、サイトのテーマカラーであるシアンブルーに合わせてCSSクラスでマッピングし直し、HUDのデザインに統合しています。

### 3. Immersion Background
- 背景には没入感を高める環境映像を配置し、CSSフィルタで彩度と明度を調整してUIの視認性を確保しています。
- 今後はロボコンの動画に差し替えたいと考えています。

## Tech Stack

フレームワークを使わず、軽量かつ保守性の高い構成で構築されています。

- **Core:** HTML5, CSS3 (Variables used for theming)
- **Script:** Vanilla JavaScript (ES6+)
- **Animation:** [GSAP 3.12](https://gsap.com/) (ScrollTrigger included)
- **API:**
  - GitHub Contributions API (3rd party)
  - Navigator Battery API

## roject Structure

```text
.
├── index.html      # メイン構造・JSロジック
├── css       # デザイン・装飾（レスポンシブ対応）
│    └──main.css
├── js       # デザイン・装飾（レスポンシブ対応）
│    └──main.js
├── images/         # 制作物サムネイル画像
└── README.md       # ドキュメント