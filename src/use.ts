import { chalk } from "./util"
import { getOptions, rewriteRegistry, rewritePnpmRegistry, rewriteYarn2Registry, rewriteYarn3Registry } from "./contains"

export default function use(name: string, extend: string = '--n') {
  const options = getOptions()
  const keyExit = Object.keys(options).includes(name)
  const url = options[name]
  if (!keyExit) return console.log(`${chalk.warn('WARN')}: This address name does not exist.`);
  try {
    // npm
    // npm set registry https://registry.npm.taobao.or
    // npm get registry
    rewriteRegistry('npm', url, name)
    // cnpm set registry https://registry.npm.taobao.or
    // cnpm get registry
    // cnpm
    rewriteRegistry('cnpm', url, name)
    // yarn config set registry https://registry.npm.taobao.or
    // yarn config get registry
    // yarn@2版本及以下
    rewriteYarn2Registry(url, name)
    // yarn@3版本以上: 会在项目创建一个 .yarnrc.yml 文件，不可以直接修改全局
    // yarn config set npmRegistryServer <url>
    // yarn config get npmRegistryServer
    if (extend === '--y') {
      rewriteYarn3Registry(url, name)
      // ! 非 https 需要添加白名单
    }
    // pnpm set registry ttps://registry.npm.taobao.or
    // pnpm get registry
    // pnpm
    rewritePnpmRegistry(url, name)
  } catch (error) {

  }
};
