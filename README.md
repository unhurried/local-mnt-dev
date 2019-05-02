MongoDBとNode.js（TypeScript）を使うアプリケーションの開発環境をローカルマシンに構築する。

#### テスト用MongoDBサーバー

ローカルマシンにインストールMongoDBをインストールすると、バージョンを変更しにくく、データの管理も煩雑になるため、メモリ上に開発用のMongoDBを立てることができる[mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server)を使う。

#### Visual Studio Codeでのデバッグ実行

Visual Code Studioはlaunch.jsonに起動設定を記述することで、アプリケーションをデバッグ実行できる。ただし、Visual Studio Code単体ではソースコード変更を検知してアプリケーションを再起動する機能はサポートされないため、nodemonを組み合わせ、launch.jsonのrestart属性をtrueにすることで、デバッグセッション終了時に再接続をできるようにする。

nodemonの起動コマンドはVisual Studio Code以外でも使えるように、launch.jsonではなくpackage.jsonのscriptとして記述する。以下に各設定ファイルを記載している。

launch.json（抜粋）

```json
{
  "configurations": [
        {
            "name": "Launch via npm",
            "type": "node",
            "request": "launch",
            "cwd": "${workspaceRoot}",
            "runtimeExecutable": "npm",
            "runtimeArgs": ["run-script", "debug"],
            "port": 9229,
            "restart": true
        }
    ]
}
```

package.json（抜粋）

```json
{
  "scripts": {
    "debug": "nodemon -w src -e ts --nolazy --inspect=9229 -r ts-node/register ./src/app.ts",
  }
}
```

##### 参考

* https://code.visualstudio.com/docs/nodejs/nodejs-debugging

##### 補足：Visual Studio Code単体でのソース変更検知

nodemonを使わずにVisual Studio Code単体でソースコードの変更を検知してアプリケーションを再起動する機能については、GitHub上に要望としては挙がっているが、対応には消極的のようである。

https://github.com/Microsoft/vscode/issues/49209
