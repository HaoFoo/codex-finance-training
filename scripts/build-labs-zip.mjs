#!/usr/bin/env node
// 把 public/labs/ 打包成 codex-labs.zip（zip 内是 codex-labs/ 文件夹），
// 供学员一键下载课程材料包。构建前（prebuild）自动运行。
import { execFileSync } from "node:child_process";
import { cpSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const labsDir = path.join(root, "public", "labs");
const zipPath = path.join(root, "public", "codex-labs.zip");

const staging = mkdtempSync(path.join(tmpdir(), "codex-labs-"));
try {
  cpSync(labsDir, path.join(staging, "codex-labs"), { recursive: true });
  rmSync(zipPath, { force: true });
  execFileSync("zip", ["-r", "-X", "-q", zipPath, "codex-labs"], { cwd: staging });
  console.log("Packed public/codex-labs.zip");
} finally {
  rmSync(staging, { recursive: true, force: true });
}
