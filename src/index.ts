import { getArguments, isDef, checkUrl, chalk, throwError, handlerError } from "./util"
import ensureOptions from "./ensureOptions"
import help from "./help"
import ls from "./ls"
import add from "./add"
import del from "./del"
import rename from "./rename"
import use from "./use"

function init() {
  try {
    let args = getArguments()
    ensureOptions()
    let name = args[1]
    let url = args[2]
    let extend = args.slice(2)
    switch (args[0]) {
      case '-h':
        help()
        break;
      case 'ls':
        ls()
        break;
      case 'add':
        if (!isDef(name) || !isDef(url)) throwError("Please input correct argument")
        if (!checkUrl(url)) throwError("Please input correct url, the url must start with http or https")
        add(name, url)
        break;
      case 'del':
        if (!isDef(name)) throwError("Please input correct name")
        del(name)
        break;
      case 'rename':
        if (!isDef(name) || !isDef(url)) throwError("Please input correct argument")
        rename(name, url)
        break;
      case 'use':
        if (!isDef(name)) throwError("Please input correct name")
        use(name, extend)
        break;
      case undefined:
        throwError('')
        break;
      default:
        throwError(`Found argument ${chalk.error(args[0])} which wasn't expected, or isn't valid in this context`)
        break;
    }
  } catch (error) {
    handlerError(error as any, [`${chalk.info('USAGE')}: You can use ${chalk.success('nzm -h')} to check command list`]);
  }
}

init()

