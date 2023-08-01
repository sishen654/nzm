import { chalk, handlerError } from "./util"
import { getOptions, rewriteRegistry, rewritePnpmRegistry, rewriteYarn2Registry, rewriteYarn3Registry } from "./contains"

export default function use(name: string, extend: string[]) {
  const options = getOptions()
  const keyExit = Object.keys(options).includes(name)
  const url = options[name]
  if (!keyExit) return console.log(`${chalk.warn('WARN')}: This address name does not exist.`);
  try {
    let all = extend.length === 0 || extend.includes('--all')
    let npm = all || extend.includes('--n')
    let cnpm = all || extend.includes('--c')
    let yarn2 = all || extend.includes('--y2')
    let yarn3 = extend.includes('--y3')
    let pnpm = all || extend.includes('--p')
    // npm
    // npm set registry https://registry.npm.taobao.or
    // npm get registry
    npm && rewriteRegistry('npm', url, name)
    // cnpm set registry https://registry.npm.taobao.or
    // cnpm get registry
    // cnpm
    cnpm && rewriteRegistry('cnpm', url, name)
    // yarn config set registry https://registry.npm.taobao.or
    // yarn config get registry
    // yarn@2版本及以下
    yarn2 && rewriteYarn2Registry(url, name)
    // yarn@3版本以上: 会在项目创建一个 .yarnrc.yml 文件，不可以直接修改全局
    // yarn config set npmRegistryServer <url>
    // yarn config get npmRegistryServer
    yarn3 && rewriteYarn3Registry(url, name)
    // ! 非 https 需要添加白名单
    // pnpm set registry ttps://registry.npm.taobao.or
    // pnpm get registry
    // pnpm
    pnpm && rewritePnpmRegistry(url, name)
  } catch (error) {
    handlerError(error as any)
  }
};
