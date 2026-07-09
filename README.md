# Minato Portfolio
大阪公立大学工業高等専門学校 岡部昊斗のポートフォリオサイトです。
[こちら](https://hou-rai3.github.io/OM_portfolio/)からご覧になれます。

## Sections

- Home
- About me
- History
- Works
- Contact

各項目は別ページへ遷移せず、同じページ内で切り替わります。

## Features

- 右端の三角形ナビゲーション
  - ホバーまたはクリックで展開
  - `Home / About me / History / Works / Contact` に移動
- ホイール、矢印キー、PageUp/PageDown によるセクション移動
- Works のカテゴリ切り替え
  - `Robocon`
  - `Other works`
- Works のカルーセル表示
  - 中央に1件ずつ表示
  - 左右ボタンで、横につながった帯が移動するように切り替え
  - 画像は全体が見えるように表示
- フレームワークなしの静的サイト

## Editing Works

制作物は [js/main.js](js/main.js) の `works` 配列で管理しています。

```js
{
    title: "作品名",
    tag: "分類ラベル",
    category: "Robocon",
    year: "2025",
    role: "担当内容",
    image: "images/example.png",
    url: "https://example.com",
    description: "作品の説明",
    details: ["詳細1", "詳細2", "詳細3"],
}
```

`category` は現在、以下のどちらかを指定します。

- `Robocon`
- `Other works`

画像は `images/` に置き、`image` にパスを書きます。

## Files

```text
.
├── index.html
├── css/
│   └── main.css
├── js/
│   └── main.js
├── images/
└── README.md
```

## Tech

- HTML
- CSS
- Vanilla JavaScript