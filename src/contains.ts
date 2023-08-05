import path from "node:path"
import fs from "node:fs"
import { runSync, chalk, createObjFromFile, ensureFile, readJsonSync } from "./util"

export const NZMRC = path.join(process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'] as string, '.nzmrc.json');
export const NPMRC = path.join(process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'] as string, '.npmrc');
export const CNPMRC = path.join(process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'] as string, '.cnpmrc');

export function getRegistry() {
  let obj = createObjFromFile(fs.readFileSync(NPMRC, { encoding: 'utf8' }))
  return obj['registry']
}
export function getOptions() {
  return readJsonSync(NZMRC)
}
export const manager = {
  npm: NPMRC,
  cnpm: CNPMRC
}
export type Type = keyof typeof manager

export function rewriteRegistry(type: Type, url: string, name: string) {
  // 1 检测是否下载该包管理器
  // let { stdout } = runSync([`${type} -v`])
  // if (stdout.length === 0) return;
  const PATH = manager[type]
  // 2 确保文件存在
  ensureFile(PATH)
  let data = fs.readFileSync(PATH, { encoding: 'utf8' })
  let registry = createObjFromFile(data)['registry']
  // 3 重写文件
  try {
    if (registry) {
      fs.writeFileSync(PATH, data.replace(`registry=${registry}`, `registry=${url}`))
    } else {
      fs.writeFileSync(PATH, data + `\nregistry=${url}`)
    }
    console.log(`${chalk.success('SUCCESS')}: The ${chalk.warn(type)} registry has been changed to '${chalk.info(name)}'.`);
  }
  // 4 错误恢复原样
  catch (error) {
    fs.writeFileSync(PATH, data)
    console.log(`${chalk.error('ERROR')}: The ${chalk.warn(type)} registry '${chalk.info(name)}' is not found.`);
  }
}

export function rewritePnpmRegistry(url: string, name: string) {
  try {
    let stdout = runSync([`pnpm -v`])
    if (stdout.length === 0) { return }
    runSync([`pnpm set registry ${url}`])
    console.log(`${chalk.success('SUCCESS')}: The ${chalk.warn('pnpm')} registry has been changed to '${chalk.info(name)}'.`);
  } catch (error) {
    // 未安装 pnpm
    console.log(error);
  }
}

export function rewriteYarnRegistry(url: string, name: string) {
  try {
    let stdout = runSync([`yarn -v`])
    if (stdout.length === 0) return;
    let X = Number(stdout[0])
    if (X <= 1) rewriteYarn1Registry(url, name)
    else rewriteYarn2Registry(url, name)
  } catch (error) {
    // 未安装 yarn
  }
}

export function rewriteYarn1Registry(url: string, name: string) {
  try {
    let stdout = runSync([`yarn config set registry ${url}`])
    if (stdout.includes('Error')) {
      console.log(`${chalk.error('ERROR')}: The ${chalk.warn('yarn')} registry changed fail`);
      return
    }
    console.log(`${chalk.success('SUCCESS')}: The ${chalk.warn('yarn')} registry has been changed to '${chalk.info(name)}'.`);
  } catch (error) {
    // 未安装 yarn@1 and below
  }
}

export function rewriteYarn2Registry(url: string, name: string) {
  try {
    let stdout = runSync([`yarn config set --home npmRegistryServer ${url}`])
    if (stdout.includes('Error')) {
      console.log(`${chalk.error('ERROR')}: The ${chalk.warn('yarn')} registry changed fail`);
      return
    }
    // ! yarn@2版本以上（非 https 需要添加白名单），检验全局添加无效
    if (!url.startsWith('https')) {
      let urlObj = new URL(url)
      let stdout = runSync([`yarn config set --home unsafeHttpWhitelist ${urlObj.host}`])
      console.log(stdout);
      if (stdout.includes('Error')) {
        console.log(`${chalk.error('ERROR')}: The ${chalk.warn('yarn')} due to your address not being https, adding a whitelist failed. Please use this command:\n`);
        console.log(`              ${chalk.info('yarn config set --home unsafeHttpWhitelist <url>')} \n`);
        console.log("       to manually add it");
        return
      }
    }
    // 成功打印
    console.log(`${chalk.success('SUCCESS')}: The ${chalk.warn('yarn')} registry has been changed to '${chalk.info(name)}'.`);
  } catch (error) {
    // 未安装 yarn@2 and above
  }
}
