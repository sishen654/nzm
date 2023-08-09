import { fileIsExits, ensureFile, writeJsonSync } from "./util"
import { NZMRC } from "./contains"

export default function ensureOptions() {
  if (!fileIsExits(NZMRC)) {
    ensureFile(NZMRC)
    const defaultOptions = {
      npm: "https://registry.npmjs.org/",
      tencent: "https://mirrors.cloud.tencent.com/npm/",
      cnpm: "https://r.cnpmjs.org/",
      taobao: "https://registry.npmmirror.com/",
      npmMirror: "https://skimdb.npmjs.com/registry/"
    }
    writeJsonSync(NZMRC, defaultOptions)
  }
};
