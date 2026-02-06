import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import { execSync } from "node:child_process";

export function initCommand({ name }: { name: string }) {
  if (!name) {
    console.error("anvilx: missing project name. See 'anvilx -help'.");
    return;
  }

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const targetDir = path.join(process.cwd(), name);
  const templateDir = path.join(__dirname, "..", "..", "template");

  if (fs.existsSync(targetDir)) {
    console.error(
      `anvilx: folder "${name}" already exists. Choose a different project name.`,
    );
    return;
  }

  const pnpmVersion = execSync("npm view pnpm version").toString().trim();
  copyDir(templateDir, targetDir, {
    name,
    pnpmVersion,
  });

  console.log(`anvilx: project "${name}" created successfully!`);

  try {
    console.log(`anvilx: installing dependencies with pnpm...`);

    execSync(
      "pnpm add -w -D typescript @types/node tailwindcss @tailwindcss/postcss postcss eslint prettier",
      { cwd: targetDir, stdio: "inherit" },
    );
    execSync("pnpm add -w @dotenvx/dotenvx-ops", {
      cwd: targetDir,
      stdio: "inherit",
    });

     execSync("pnpm add -D @eslint/js globals typescript-eslint", {
      cwd: path.join(targetDir, "packages", "eslint"),
      stdio: "inherit",
    });

    execSync("pnpm add express cors", {
      cwd: path.join(targetDir, "apps", "api"),
      stdio: "inherit",
    });
    execSync("pnpm add -D @types/express tsup tsx", {
      cwd: path.join(targetDir, "apps", "api"),
      stdio: "inherit",
    });

    execSync("pnpm add react react-dom react-router-dom", {
      cwd: path.join(targetDir, "apps", "web"),
      stdio: "inherit",
    });
    execSync("pnpm add -D @types/react @types/react-dom @vitejs/plugin-react-swc eslint-plugin-react-hooks eslint-plugin-react-refresh vite", {
      cwd: path.join(targetDir, "apps", "web"),
      stdio: "inherit",
    });

    execSync("git init", { cwd: targetDir, stdio: "inherit" });
    execSync("pnpm install", { cwd: targetDir, stdio: "inherit" });
    console.log(`anvilx: dependencies installed successfully!`);

    const srcEnv = path.join(targetDir, ".env.example");
    const destEnv = path.join(targetDir, ".env");

    if (!fs.existsSync(srcEnv)) return;
    if (fs.existsSync(destEnv)) return;

    fs.copyFileSync(srcEnv, destEnv);
  } catch (err) {
    console.error("anvilx: failed to install dependencies.", err);
  }
}

function copyDir(
  src: string,
  dest: string,
  replacements: Record<string, string> = {},
) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  for (const item of fs.readdirSync(src)) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      copyDir(srcPath, destPath, replacements);
    } else {
      let content = fs.readFileSync(srcPath, "utf-8");

      for (const [key, value] of Object.entries(replacements)) {
        const regex = new RegExp(`{{${key}}}`, "g");
        content = content.replace(regex, value);
      }

      fs.writeFileSync(destPath, content);
    }
  }
}
