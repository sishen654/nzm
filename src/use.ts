import { chalk, handlerError } from "./util"
import { getOptions, rewriteRegistry, rewritePnpmRegistry, rewriteYarnRegistry } from "./contains"

export default function use(name: string, extend: string[]) {
  const options = getOptions()
  const keyExit = Object.keys(options).includes(name)
  const url = options[name]
  if (!keyExit) return console.log(`${chalk.warn('WARN')}: This address name does not exist.`);
  try {
    let all = extend.length === 0 || extend.includes('--all')
    let npm = all || extend.includes('--n')
    let cnpm = all || extend.includes('--c')
    let yarn = all || extend.includes('--y')
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
    // yarn@1版本及以下
    // yarn config set --home npmRegistryServer <url>
    // yarn config get npmRegistryServer
    yarn && rewriteYarnRegistry(url, name)
    // pnpm set registry ttps://registry.npm.taobao.or
    // pnpm get registry
    // pnpm
    pnpm && rewritePnpmRegistry(url, name)
  } catch (error) {
    handlerError(error as any)
  }
};
