# [基础](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)

## tsc（typesctipt 编译器）

我们一直在讨论类型检查，但还没有使用过类型检查器。让我们来认识一下我们的新朋友 tsc - TypeScript 编译器。首先，我们需要通过 npm 安装它。

### 全局安装

::: code-group

```sh [npm]
$ npm install -g typescript
```

```sh [pnpm]
$ pnpm add -g typescript
```

```sh [yarn]
$ yarn dlx typescript
```

:::

::: tip
上述命令将全局安装 TypeScript 编译器 tsc。如果你想从本地的 node_modules 包运行 tsc，可以使用 npx 或类似工具。
:::

### [在项目中安装](https://www.typescriptlang.org/download/)

::: code-group

```sh [npm]
$ npm install typescript --save-dev
```

```sh [pnpm]
$ pnpm add typescript -D
```

```sh [yarn]
$ yarn add typescript --dev
```

:::

使用下面的命令运行编译器:
::: code-group

```sh [npm]
$ npx tsc
```

```sh [pnpm]
$ pnpm tsc
```

```sh [yarn]
$ yarn tsc
```

:::
