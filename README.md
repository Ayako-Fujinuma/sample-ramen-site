# 麺処 ぬくもり庵（サンプルサイト）

個人経営のラーメン屋さんを想定した、**営業用サンプル(ポートフォリオ)サイト**です。
実在の店舗ではなく架空の店舗として作成しています。プレーンな HTML / CSS / JS のみで構成し、Cloudflare Workers(Static Assets)にそのままデプロイできます。

他業種(美容室・整体など)へ流用する際は、`public/` 内のテキスト・画像・`wrangler.jsonc` の `name` を差し替えるだけで再利用できる構成にしています。

## デザイン案(Sample1〜5)

依頼企業がテイストを選びやすいよう、同じ内容で5つのデザイン方向性を用意しています。画面上部の常時表示タブでいつでも切り替えられます。

| ページ | コンセプト |
| --- | --- |
| `index.html`(Sample1) | あたたかみ系・王道(テラコッタ×クリーム、機能フル実装) |
| `sample2.html` | モダン・ミニマル(白黒ベース、余白多め) |
| `sample3.html` | 高級和食店風(墨黒×金、縦組み見出し) |
| `sample4.html` | ポップ・カジュアル(明るい配色、丸み) |
| `sample5.html` | 雑誌風フォトファースト(非対称グリッド) |

Sample2〜5はデザイン比較用の簡易版で、臨時休業お知らせ(スプレッドシート連携)とお問い合わせフォーム送信の実装はSample1にのみ搭載しています。採用するデザインが決まったら、Sample1の仕組みをそのレイアウトに移植してください。

## 構成

```
./
├── public/              # 静的アセット一式
│   ├── index.html
│   ├── css/style.css
│   ├── js/main.js
│   ├── js/config.js     # 臨時休業のお知らせ・お問い合わせフォームの連携設定
│   ├── js/notices.json  # 臨時休業のお知らせ(デフォルトのお知らせデータ)
│   └── images/          # プレースホルダー画像（差し替え方は images/README.md 参照）
├── wrangler.jsonc        # Workers Static Assets の設定
├── package.json
└── README.md
```

## 臨時休業のお知らせの出し方

お知らせを出すと、トップのお知らせバナーと「営業時間」セクションに自動反映されます。2通りの更新方法があります。

### 方法A: 店主さんがGoogleスプレッドシートで更新する(コード不要・おすすめ)

デプロイ後、非エンジニアの店主さんでも自分で更新できる方式です。

1. Googleスプレッドシートを新規作成し、1行目に見出し「日付」「メッセージ」、2行目以降に `2026-09-20` / `設備点検のため、臨時休業いたします。` のように入力する
2. 「ファイル」→「共有」→「ウェブに公開」を開き、対象シートを選択、形式を「カンマ区切りの値(.csv)」にして「公開」する
3. 発行されたURLをコピーし、`public/js/config.js` の `SHEET_CSV_URL` に貼り付けてデプロイする

```js
window.NOTICE_CONFIG = {
  SHEET_CSV_URL: "https://docs.google.com/.../pub?output=csv"
};
```

これ以降は、店主さんがスプレッドシートを編集して保存するだけで(コード編集・再デプロイ不要で)サイトに反映されます。

### 方法B: 開発者がコードで更新する(シンプル・初期状態)

`SHEET_CSV_URL` が空文字のままの場合は、`public/js/notices.json` の内容が使われます。

```json
[
  { "date": "2026-09-20", "message": "設備点検のため、臨時休業いたします。" }
]
```

配列を空 `[]` にすれば、お知らせ表示は自動的に非表示になります。

## お問い合わせフォーム

[Web3Forms](https://web3forms.com/)(登録無料・バックエンド不要)と連携しています。

1. web3forms.com で登録し、Access Key を発行する
2. `public/js/config.js` の `CONTACT_ACCESS_KEY` に貼り付ける

```js
window.CONTACT_CONFIG = {
  CONTACT_ACCESS_KEY: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
};
```

未設定のままだと、送信時に「サンプルサイトのため送信は無効になっています」という案内を表示します(誤送信防止のためのデモ用ガードです)。

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
