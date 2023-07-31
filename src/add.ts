import { chalk, writeJsonSync } from "./util"
import { NZMRC, getOptions } from "./contains"

export default function add(name: string, url: string) {
  const options = getOptions()
  options[name] = url
  writeJsonSync(NZMRC, options)
  console.log(`${chalk.success('SUCCESS')}: Add new npm origin url success.`);
};
