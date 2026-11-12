import { spawn } from "node:child_process";
import { cp, mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";

const nextCli = path.join("node_modules", "next", "dist", "bin", "next");
const liveStaticDirectory = path.join(".next", "static");
const releaseDirectory = ".next-release";
const releaseStaticDirectory = path.join(releaseDirectory, "static");

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function mergeMissingFiles(source, destination) {
  await mkdir(destination, { recursive: true });
  const entries = await readdir(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      await mergeMissingFiles(sourcePath, destinationPath);
      continue;
    }

    if (!(await exists(destinationPath))) {
      await cp(sourcePath, destinationPath);
    }
  }
}

if (await exists(releaseDirectory)) {
  await rm(releaseDirectory, { recursive: true, force: true });
}

await new Promise((resolve, reject) => {
  const build = spawn(process.execPath, [nextCli, "build", "--webpack"], {
    env: {
      ...process.env,
      NEXT_DIST_DIR: releaseDirectory,
    },
    stdio: "inherit",
  });

  build.on("error", reject);
  build.on("close", (code) => {
    if (code === 0) {
      resolve();
      return;
    }
    reject(new Error(`Next.js production build failed with exit code ${code}.`));
  });
});

if (await exists(liveStaticDirectory)) {
  await mergeMissingFiles(liveStaticDirectory, releaseStaticDirectory);
}

console.log("Production release is ready in .next-release.");
console.log("Stop the current server, then run: npm run activate:production && npm run start");
