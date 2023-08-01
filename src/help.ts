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
      key: 'add <name> <url>',
      description: 'Add source address by name and url'
    },
    {
      key: 'add <name> <newUrl>',
      description: 'Change source address by new url'
    },
    {
      key: 'rename <name> <newName>',
      description: 'Change source address name by new name'
    },
    {
      key: 'del <name>',
      description: 'Delete source address by name'
    },
    {
      key: 'use <name> [extend]',
      description: 'Select the currently used address source',
      extend: [
        {
          key: '--all',
          description: 'Default option to modify the download address source for npm, cnpm, yarn@2, and pnpm'
        },
        {
          key: '--n',
          description: 'Only modify the npm download address source'
        },
        {
          key: '--c',
          description: 'Only modify the cnpm download address source'
        },
        {
          key: '--y2',
          description: 'Only modify the yarn@2 and below versions download address source'
        },
        {
          key: '--y3',
          description: 'generate the address configuration file corresponding to Yarn3 and above'
        },
        {
          key: '--p',
          description: 'Only modify the pnpm download address source'
        },
      ]
    }
  ]
  console.log('NZM:');
  console.log("  The JavaScript Launcher ⚡");
  console.log("  Next generation package manager download address source management tool");
  console.log("SUBCOMMANDS:");
  let max = Math.max(...Object.keys(h).map(v => Number(v.length)))
  h.forEach(v => {
    console.log(`  ${chalk.info(v.key)} : ${' '.repeat(max - v.key.length + 24)}${v.description}`);
    if (v.extend) {
      console.log(`${v.key.split(" ")[0].toUpperCase()} EXTEND: `);
      v.extend.forEach(v => {
        console.log(`  ${chalk.info(v.key)} : ${' '.repeat(max - v.key.length + 24)}${v.description}`);
      })
    }
  })
};
