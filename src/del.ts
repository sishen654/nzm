import { chalk, writeJsonSync } from "./util"
import { NZMRC, getOptions } from "./contains"

export default function del(name: string) {
  const options = getOptions()
  const keyExit = Object.keys(options).includes(name)
  delete options[name]
  writeJsonSync(NZMRC, options)
  console.log(keyExit ? `${chalk.success('SUCCESS')}: Delete success.` : `${chalk.warn('WARN')}: The name is not exit.`);
};
