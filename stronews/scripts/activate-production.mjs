import { rename, rm, stat } from "node:fs/promises";
import net from "node:net";
import path from "node:path";

const liveDirectory = ".next";
const previousDirectory = ".next-previous";
const releaseDirectory = ".next-release";

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

function isAppPortActive() {
  return new Promise((resolve) => {
    const socket = net.connect({ host: "127.0.0.1", port: 5003 });
    socket.once("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.once("error", () => resolve(false));
  });
}

if (await isAppPortActive()) {
  throw new Error(
    "Port 5003 is still active. Stop the current Next.js server before activating the new build.",
  );
}

if (!(await exists(path.join(releaseDirectory, "BUILD_ID")))) {
  throw new Error("No complete production release found in .next-release.");
}

if (await exists(liveDirectory)) {
  if (await exists(previousDirectory)) {
    await rm(previousDirectory, { recursive: true, force: true });
  }
  await rename(liveDirectory, previousDirectory);
}

await rename(releaseDirectory, liveDirectory);
console.log("Production build activated. Start the server with: npm run start");
