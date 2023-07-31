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
  const PATH = manager[type]
  // 1 确保文件存在
  ensureFile(PATH)
  let data = fs.readFileSync(PATH, { encoding: 'utf8' })
  let registry = createObjFromFile(data)['registry']
  // 2 重写文件
  try {
    if (registry) {
      fs.writeFileSync(PATH, data.replace(`registry=${registry}`, `registry=${url}`))
    } else {
      fs.writeFileSync(PATH, data + `\nregistry=${url}`)
    }
    console.log(`${chalk.success('SUCCESS')}: The ${chalk.warn(type)} registry has been changed to '${chalk.info(name)}'.`);
  }
  // 3 错误恢复原样
  catch (error) {
    fs.writeFileSync(PATH, data)
    console.log(`${chalk.error('ERROR')}: The ${chalk.warn(type)} registry '${chalk.info(name)}' is not found.`);
  }
}

export function rewritePnpmRegistry(url: string, name: string) {
  try {
    runSync([`pnpm set registry ${url}`])
    console.log(`${chalk.success('SUCCESS')}: The ${chalk.warn('pnpm')} registry has been changed to '${chalk.info(name)}'.`);
  } catch (error) {
    // 未安装 pnpm
  }
}

export function rewriteYarn2Registry(url: string, name: string) {
  try {
    let { stdout } = runSync([`yarn config set registry ${url}`])
    if (stdout.includes('Error')) return
    console.log(`${chalk.success('SUCCESS')}: The ${chalk.warn('yarn@2')} registry has been changed to '${chalk.info(name)}'.`);
  } catch (error) {
    // 未安装 yarn@2
  }
}

export function rewriteYarn3Registry(url: string, name: string) {
  try {
    let { stdout } = runSync([`yarn config set npmRegistryServer ${url}`])
    if (stdout.includes('Error')) return
    console.log(`${chalk.success('SUCCESS')}: The ${chalk.warn('yarn@3')} registry has been changed to '${chalk.info(name)}'.`);
  } catch (error) {
    // 未安装 yarn@3
  }
}
