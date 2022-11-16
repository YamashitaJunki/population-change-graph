# population-change-graph

選択した都道府県の人口推移データをグラフで表示するアプリケーションを作成しました。

# Deploy

https://main.d3hrx15nogqyqc.amplifyapp.com/

# DEMO

![](https://user-images.githubusercontent.com/95216275/202092205-362bc07c-c605-48a4-9551-77839a6d0f60.gif)

閲覧したい都道府県のチェックボックスをクリックすると  
1960 年から 2045 年の間の総人口推移グラフが表示されます。

# グラフ作成に使用したライブラリ

- [chart.js@3.8.0](https://www.chartjs.org/)

# API

- 都道府県一覧および総人口情報のデータ取得元：[RESAS API](https://opendata.resas-portal.go.jp/)

# 技術

- Next.js
- Typescript

# 環境

- 動作確認済環境
  - node : v18.8.0
- Google Chrome 最新版、PC/スマートフォン表示で正しく表示確認済み

# 意識したこと

- 「API のデータ取得をするファイル」「データを整形するファイル」「整形したデータを表示するファイル」 という役割分担を可能な限りで行い、本試験の評価ポイントである「ビューとロジックの分離」を意識して作成しました。
- 取得した API のデータを、必要な形に整形していく過程がわかりやすいような変数の命名を意識しました。

# 環境構築の手順

## ① ローカルで以下のコマンドにてリポジトリをクローンします

```
git clone git@github.com:YamashitaJunki/population-change-graph.git
```

## ② 以下コマンドでコンテナを作成します

```
docker compose up -d
```

## ③ RESAS API のサイトにて利用登録後 API キーを取得します

[RESAS API 　会員登録ページ](https://opendata.resas-portal.go.jp/)

1. 画面右上の「利用登録」を押下
2. 必須入力欄に入力の上「入力内容確認」を押下
3. 登録完了画面に表示される API キーをコピーする

## ④`.env`のファイルに以下のように登録します。

```
RESAS_API_KEY = ***********
```

## ④ コンテナ内にて以下コマンドを実行します

```
yarn run dev
```

# 各種設定ファイルの解説

- .eslintrc.json

  - 目的
    - eslint のルールを自動的に強制するため
  - 参考情報
    - https://eslint.org/docs/latest/user-guide/configuring/
  - 参考経緯
    - 公式の正しい書き方を確認する為

- dockerfile

  - 目的
    - ローカル環境だけではなく、仮想環境でも正しく動くことを確認できるように docker を導入するため
  - 参考情報
    - https://docs.docker.jp/engine/reference/builder.html
  - 参考経緯
    - 公式の正しい書き方を確認する為
  - OS
    - alpine(v3.15)

- docker-compose.yml

  - 目的
    - 今後開発にあたりコンテナ数が増える可能性があるため
  - 参考情報
    - https://docs.docker.com/compose/compose-file/
  - 参考経緯
    - 公式の正しい書き方を確認する為
  - port
    - 3000:3000 →DockerImage を立ち上げるポート
    - 9229:9229 → デバッグ用のポート

- .prettierrc

  - 目的
    - eslint のルールを自動的に強制するため
  - 参考情報
    - https://prettier.io/docs/en/options.html
  - 参考経緯
    - 公式の正しい書き方を確認する為

- tsconfig.json

  - 目的
    - 型を宣言して未然にエラーを防ぐため typescript を導入
  - 参考情報
    - https://zenn.dev/toono_f/scraps/b9b8b5f7fb1c57
  - 参考経緯
    - オリジナルの最適設定を考える力が無い為

以上
