# 麺処 ひなた（サンプルサイト）

個人経営のラーメン屋さんを想定した、**営業用サンプル(ポートフォリオ)サイト**です。
実在の店舗ではなく架空の店舗として作成しています。プレーンな HTML / CSS / JS のみで構成し、Cloudflare Workers(Static Assets)にそのままデプロイできます。

他業種(美容室・整体など)へ流用する際は、`public/` 内のテキスト・画像・`wrangler.jsonc` の `name` を差し替えるだけで再利用できる構成にしています。

## 構成

```
./
├── public/              # 静的アセット一式
│   ├── index.html
│   ├── css/style.css
│   ├── js/main.js
│   ├── js/notices.json  # 臨時休業のお知らせ(ここを編集するだけでOK)
│   └── images/          # プレースホルダー画像（差し替え方は images/README.md 参照）
├── wrangler.jsonc        # Workers Static Assets の設定
├── package.json
└── README.md
```

## 臨時休業のお知らせの出し方

`public/js/notices.json` を編集するだけで、トップのお知らせバナーと「営業時間」セクションに自動反映されます。

```json
[
  { "date": "2026-09-20", "message": "設備点検のため、臨時休業いたします。" }
]
```

配列を空 `[]` にすれば、お知らせ表示は自動的に非表示になります。

## ローカルで確認する

```bash
npm install
npm run dev
```

`wrangler dev` が起動し、表示されたローカルURL(通常 `http://localhost:8787`)をブラウザで開くと確認できます。

## Cloudflare Workers へデプロイする

初回のみ、Cloudflareアカウントへのログインが必要です。

```bash
npx wrangler login
```

ブラウザが開くので、Cloudflareアカウントで認可してください。ログイン後、以下でデプロイできます。

```bash
npm run deploy
```

デプロイが完了すると、`https://sample-ramen-site.<あなたのサブドメイン>.workers.dev` のようなURLが発行されます。

独自ドメインを割り当てたい場合は、Cloudflareダッシュボードの当該Workerの「Triggers」→「Custom Domains」から設定してください。

## 差し替えが必要な箇所

- `public/images/` 内のプレースホルダー画像 → 実写真(詳細は [`public/images/README.md`](public/images/README.md))
- `public/index.html` のアクセス情報(住所・最寄駅・電話番号)、Googleマップの座標
- `public/index.html` のSNSリンク(Instagram / X のダミーURL)
- `public/index.html` のメニュー内容・価格
- `wrangler.jsonc` の `name`(Workersのプロジェクト名。業種を変えて流用する場合はここも変更)
