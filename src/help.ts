import { chalk } from "./util"

export default function help() {
  let h = [
    {
      key: '-h',
      description: 'Check command list'
    },
    {
      key: 'ls',
      description: 'Check all source address list'
    },
    {
      key: 'add [name] [url]',
      description: 'Add source address by name and url'
    },
    {
      key: 'add [name] [newUrl]',
      description: 'Change source address by new url'
    },
    {
      key: 'rename [name] [newName]',
      description: 'Change source address name by new name'
    },
    {
      key: 'del [name]',
      description: 'Delete source address by name'
    },
    {
      key: 'use [name]',
      description: 'Select the currently used address source'
    },
    {
      key: 'use [name] --y',
      description: 'Select address and generate the address configuration file corresponding to Yarn3 and above'
    },
  ]
  console.log("SUBCOMMANDS:");
  let max = Math.max(...Object.keys(h).map(v => Number(v.length)))
  h.forEach(v => {
    console.log(`  ${chalk.info(v.key)} : ${' '.repeat(max - v.key.length + 24)}${v.description}`);
  })
};
