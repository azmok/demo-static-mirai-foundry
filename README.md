# MIRAI FOUNDRY — Digital Artifacts Foundry

> 柔和さを拒絶する。グリッドを信奉する。タイポグラフィを建築と捉える。角丸はいらない。ぼかしもいらない。あるのは精密さのみ。

MIRAI FOUNDRY（ミライ・ファウンドリ）は、人間の直感と合成知性（AI）の交差点で活動するクリエイティブスタジオです。現代のウェブにおける標準的な美学に挑戦し、高精細なデジタル環境とプロダクトを構築します。

## ⚡ コア・プリンシプル（核となる指針）

- **効率は弱者のためのもの。**
  私たちは効率化によって得た時間を、ラジカルな美学の追求へと再投資します。
- **精密さこそが最優先。**
  すべてのピクセルは広大な可能性空間における座標であり、外科的な意図を持ってそこを航行します。
- **構造はアナーキーである。**
  ルールは数学的な完璧さをもって破られるために存在します。グリッドを受け入れるのは、それを凌駕するためだけです。

## 🛠 テクノロジースタック

このプロジェクトは、ビルド工程を必要としない純粋な静的サイトとして構築されています。

- **構造**: セマンティック HTML5
- **スタイリング**: Tailwind CSS (CDN経由) + カスタム・ブルータリズム・デザインシステム
- **タイポグラフィ**: 
  - [Inter](https://fonts.google.com/specimen/Inter) (欧文見出し・本文)
  - [Noto Sans JP](https://fonts.google.com/specimen/Noto+Sans+JP) (和文タイポグラフィ)
- **アイコン**: [Material Symbols Outlined](https://fonts.google.com/icons)

## 📁 プロジェクト構造

```text
.
├── index.html          # Home: ファウンドリの着地点
├── about.html          # Studio: 起源とマニフェスト
├── works.html          # Archive: 選ばれたアーティファクト
├── contact.html        # Contact: シーケンスの開始
├── stitch_assets/      # ブランドアイデンティティとビジュアル資産
├── wrangler.toml       # Cloudflare Pages 設定
└── .antigravity/       # デプロイルールとプロジェクトプロンプト
```

## 🚀 デプロイ方法

このプロジェクトは **Cloudflare Pages** 向けに設定されています。静的プロジェクトのため、ビルドステップは不要です。

### ローカル開発

静的サイトなので、`index.html` をブラウザで直接開くか、シンプルなローカルサーバーを使用してください。

```bash
# npx を使用する場合
npx serve .
```

### Cloudflare Pages へのデプロイ

1. [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) がインストールされていることを確認してください。
2. 以下のコマンドを実行してデプロイします。

```bash
npx wrangler pages deploy . --project-name demo-static-mirai-foundry
```

---

©2024 MIRAI FOUNDRY. TOKYO — BERLIN.
