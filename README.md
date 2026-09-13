# 麺処 ぬくもり庵（サンプルサイト）

個人経営のラーメン屋さんを想定した、**営業用サンプル(ポートフォリオ)サイト**です。
実在の店舗ではなく架空の店舗として作成しています。プレーンな HTML / CSS / JS のみで構成し、Cloudflare Workers(Static Assets)にそのままデプロイできます。

他業種(美容室・整体など)へ流用する際は、`public/` 内のテキスト・画像・`wrangler.jsonc` の `name` を差し替えるだけで再利用できる構成にしています。

## デザイン案(サンプル1〜6)

依頼企業がテイストを選びやすいよう、同じ内容で6つのデザイン方向性を用意しています。画面上部の常時表示タブでいつでも切り替えられます。

| ページ | コンセプト |
| --- | --- |
| `index.html`(サンプル1) | あたたかみ系・王道(テラコッタ×クリーム、機能フル実装) |
| `sample2.html` | モダン・ミニマル(白黒ベース、余白多め) |
| `sample3.html` | 高級和食店風(墨黒×金、縦組み見出し) |
| `sample4.html` | ポップ・カジュアル(明るい配色、丸み) |
| `sample5.html` | 雑誌風フォトファースト(非対称グリッド) |
| `sample6.html` | フォトジェニック・ダーク(墨黒×琥珀色、ヒーローは左右分割で写真をフルサイズ表示、メニューは横スライダー) |

サンプル2〜6はデザイン比較用の簡易版で、臨時休業お知らせ(スプレッドシート連携)はサンプル1にのみ搭載しています。採用するデザインが決まったら、サンプル1の仕組みをそのレイアウトに移植してください。

## 構成

```
./
├── public/              # 静的アセット一式
│   ├── index.html
│   ├── css/style.css
│   ├── js/main.js
│   ├── js/config.js     # 臨時休業のお知らせの連携設定
│   ├── js/notices.json  # 臨時休業のお知らせ(デフォルトのお知らせデータ)
│   └── images/          # 店舗写真(AI生成のサンプル画像。差し替え方は images/README.md 参照)
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

## お問い合わせページ

各デザイン案の「お問い合わせ」は、同一ページにフォームをまるごと表示するのではなく `contact.html` へのリンクにしてあります。

`contact.html` にはお名前・メールアドレス・お問い合わせ内容の入力欄と送信ボタンを用意していますが、**見た目確認用で実際の送信機能はありません**(`onsubmit` でページ遷移を止めているだけです)。実際に稼働させる際は、[Web3Forms](https://web3forms.com/)(登録無料・バックエンド不要)などと連携して送信処理を実装してください。

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

独自ドメインを割り当てたい場合は、Cloudflareダッシュボードの当該Workerの「Triggers」→「Custom Domains」から設定してください(`wrangler.jsonc` の `routes` に `custom_domain: true` で追記する形でも設定できます)。

現在このサイトには `sample-ramen.hirakuhp.com` を独自ドメインとして割り当て済みです。

## 差し替えが必要な箇所

- `public/images/` 内の画像(AI生成のサンプル写真) → 実店舗の写真(詳細は [`public/images/README.md`](public/images/README.md))
- `public/index.html` のアクセス情報(住所・最寄駅・電話番号)、Googleマップの座標
- `public/index.html` のSNSリンク(Instagram / X のダミーURL)
- `public/index.html` のメニュー内容・価格
- `public/contact.html` のプレースホルダー文言 → 実際のお問い合わせフォーム
- `wrangler.jsonc` の `name`(Workersのプロジェクト名。業種を変えて流用する場合はここも変更)
