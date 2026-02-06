#!/usr/bin/env node
import { helpCommand } from "../commands/help.js";
import { initCommand } from "../commands/init.js";

const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  console.log("anvilx: no command provided. See 'anvilx -help'.");
} else {
  switch (command) {
    case "-help":
    case "-h":
      helpCommand();
      break;
    case "init":
      initCommand({ name: args[1] });
      break;
    default:
      console.log(
        `anvilx: '${command}' is not an anvilx command. See 'anvilx -help'.`,
      );
  }
}
