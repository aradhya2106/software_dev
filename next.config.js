/** @type {import('next').NextConfig} */
const { dirname, resolve } = require('path');

const nextConfig = {
  reactStrictMode: true,
  // Define the workspace root explicitly
  distDir: ".next",
  // Explicitly set the output to have the correct structure
  output: "standalone",
  // Define workspace root and aliases correctly
  turbopack: {
    root: __dirname,
    resolveAlias: {
      // Ensure imports are resolved correctly from the project root
      '@/*': resolve(__dirname, './src/*'),
    }
  },
};

module.exports = nextConfig;
