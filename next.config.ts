// Do not modify unless you know what you're doing.
// GenStack Preview relies on this config working this way
// If you accidentally break your app, GenStack can regenerate this for you
import type { NextConfig } from "next";

// Function to check if cloudflare workerd is likely to be compatible
function isCloudflareCompatible() {
  try {
    // Try to get glibc version by checking Node.js process
    const { release } = process;

    // Simple version check - just skip Cloudflare setup entirely on older systems
    // This is a very simplified check, but avoids even importing the problematic module
    return false; // Disable for now until needed
  } catch (e) {
    return false; // If we can't determine, assume incompatible
  }
}

// Only import and use Cloudflare modules when compatibility is detected
let setupDevPlatform: () => Promise<void>;
if (isCloudflareCompatible()) {
  const cloudflareModule = require('@cloudflare/next-on-pages/next-dev');
  setupDevPlatform = cloudflareModule.setupDevPlatform;

  // Only run setup if compatible
  setupDevPlatform().catch(error => {
    console.log("❌ Cloudflare setup failed:", error.message);
  });
} else {
  console.log("ℹ️ Cloudflare integration disabled - development mode only");
}

const nextConfig: NextConfig = {
  /* config options here */
};

return nextConfig;