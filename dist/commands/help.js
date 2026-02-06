export function helpCommand() {
    console.log(`
Anvilx — project scaffolding toolkit

Usage:
  anvilx <command> [options]

Commands:
  init <name>        Create a new project
  -h, -help          Show this help message

Examples:
  anvilx init my-app
  anvilx -h
`);
}
