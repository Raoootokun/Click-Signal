# Click-Signal
![GitHub Release](https://img.shields.io/github/v/release/Raoootokun/Click-Signal)  
ボタン・レバー・感圧板・看板などの**操作したプレイヤーに対して**正確にコマンドを実行する拡張アドオンです。  
対応バージョン: `v1.21.13x`  

# 機能概要
- プレイヤーの操作（クリック・踏み込み・インタラクト）を検知  
- 操作した本人を実行主体としてコマンドを実行  
- ディメンション・座標単位での管理  
- 登録 / 解除 / 一括解除 / 一覧表示に対応  


# 対応トリガー
以下のトリガーを起こしたプレイヤーを取得し、コマンドを実行します。   

- ボタンを押す  
- レバーを操作する  
- 感圧版を踏む  
- 看板をインタラクトする  


# 使用方法

## 1.登録
指定したディメンション、座標に対してコマンドを登録します。  
`/cs:bind <dimensionId> <x> <y> <z> <command>`  

例  
`/cs:bind overworld 10 10 10 "say Hello"`  
座標 (10, 10, 10) のボタンを押したプレイヤーが `/say Hello` を実行します。


## 2.登録解除
指定したディメンション、座標に登録されているコマンドを解除します。  
`/cs:unbind <dimensionId> <x> <y> <z>`  

## 3.全登録解除
指定したディメンション内のすべてのコマンドを解除します。  
`/cs:unbind_all <dimensionId>`  

## 4.一覧表示
現在登録されているコマンドの一覧を表示します。  
`/cs:bind_list [dimensionId]`  


# ダウンロード・導入
- [ダウンロード](https://github.com/Raoootokun/Click-Signal/releases)  

- ワールド設定の **実験的機能 > ベータAPI** を有効にしてください。   
