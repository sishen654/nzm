# pro-nzm

English | [简体中文](./README-zh.md)

## ✨ Introduce

> **Note**: The inspiration for this library comes from the problem of only switching npm when using [nrm](https://www.npmjs.com/package/nrm)

**You can use this library to help npm, cnpm, yarn and pnpm quickly switch download address sources**. Also, you can specify single or multiple address sources for switching.

This library will save you a lot of trouble switching address sources!



## 📦 Install

```bash
npm i -g pro-nzm
cnpm i -g pro-nzm
yarn add -g pro-nzm
pnpm add -g pro-nzm
```



## 🔨 Usage

You can use `nzm add [name] [url]` add new address source:

![add](assets/README.assets/add.gif)

You can use `nzm -h` to check all command list：

![image-20230801113412830](assets/README.assets/image-20230801113412830.png)

You can use `nzm ls` to check all address list：

![ls](assets/README.assets/ls.gif)

You can use `nzm use <name>` to switch address source:

> Default Switch All, with the same effect as using `nzm use <name> --all`

![use](assets/README.assets/use.gif)

You can also specify the packet manager to switch address sources, use `nzm use <url> [extend]`:

![extend](assets/README.assets/extend.gif)
