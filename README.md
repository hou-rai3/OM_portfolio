# MINATO PORTFOLIO // MECH INTERFACE

[![Pilot Status](https://img.shields.io/badge/STATUS-ONLINE-00f0ff?style=for-the-badge&logo=probot)](https://github.com/hou-rai3)
[![System](https://img.shields.io/badge/SYSTEM-VER_3.12-00a8ff?style=for-the-badge)](https://github.com/hou-rai3)

**"NEURAL LINK ESTABLISHED."**

大阪公立大学工業高等専門学校 岡部昊斗のポートフォリオサイトです。
 
## System Gimmicks (技術的な小ネタ)

このサイトは単なる静的なポートフォリオではありません。没入感を高めるための「動的なギミック」が多数搭載されています。

### 1. Startup Sequence (GSAP Animation)
ページロード時に発動する「システム起動シーケンス」です。
- **GSAP (GreenSock Animation Platform)** を使用し、Timeline制御による精密なアニメーションを実装。
- メカニカルなハッチの開放、HUD（ヘッドアップディスプレイ）の展開、ガラスの反射エフェクトなどを順序立てて実行し、コックピットに乗り込むような体験を演出しています。

### 2. Real-time Battery Sync
HUD上部の `BATT` 表示は飾りではありません。
- **Battery Status API** を使用し、**「あなた（閲覧者）のデバイスの実際のバッテリー残量」** をリアルタイムで取得・表示しています。
- 充電中は `[CHRG]` マークが点灯。
- 残量が20%を切ると、ゲージと文字色が**警告色（赤）**に変化し、点滅するアラートモードへ移行します。

### 3. Live GitHub Activity Graph
HUD右側の `CODE ACTIVITY` パネルには、実際のGitHub活動状況が表示されます。
- 外部APIを使用し、ユーザー `@hou-rai3` の直近49日間のコントリビューション（草）データを動的にフェッチ。
- 取得したデータを、GitHub純正の色ではなく、サイトのテーマカラー（シアンブルー）に合わせてCSSクラスでマッピングし直し、HUDのデザインに統合しています。

### 4. Immersion Background
- 背景には没入感を高める環境映像（雨のサイバーパンク・シティ等を想定）を配置し、CSSフィルタで彩度と明度を調整してUIの視認性を確保しています。

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
├── style.css       # デザイン・装飾（レスポンシブ対応）
├── images/         # 制作物サムネイル画像
└── README.md       # ドキュメント