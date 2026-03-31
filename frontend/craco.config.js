// frontend/craco.config.js
const path = require("path");
const pkg = require("./package.json");

// Read homepage from package.json (e.g., "https://CodeCode1990.github.io/Site")
// and normalize to a path with trailing slash: "/Site/"
function getServedPath() {
  const homepage = process.env.PUBLIC_URL || pkg.homepage || "/";
  try {
    const u = new URL(homepage);
    const p = u.pathname || "/";
    return p.endsWith("/") ? p : `${p}/`;
  } catch {
    // if homepage is already a path (e.g. "/Site")
    const p = homepage.startsWith("/") ? homepage : `/${homepage}`;
    return p.endsWith("/") ? p : `${p}/`;
  }
}

// Environment toggle
const config = {
  disableHotReload: process.env.DISABLE_HOT_RELOAD === "true",
};

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    configure: (webpackConfig) => {
      if (config.disableHotReload) {
        // remove Hot Module Replacement plugin if disabled
        webpackConfig.plugins = webpackConfig.plugins.filter(
          (p) =>
            !(
              p &&
              p.constructor &&
              p.constructor.name === "HotModuleReplacementPlugin"
            )
        );
        webpackConfig.watch = false;
        webpackConfig.watchOptions = { ignored: /.*/ };
      } else {
        // IMPORTANT: do not ignore "public/**"
        webpackConfig.watchOptions = {
          ...(webpackConfig.watchOptions || {}),
          ignored: [
            "**/node_modules/**",
            "**/.git/**",
            "**/build/**",
            "**/dist/**",
            "**/coverage/**",
            // removed "**/public/**"
          ],
        };
      }
      return webpackConfig;
    },
  },

  devServer: (devServerConfig) => {
    const servedPath = getServedPath(); // e.g., "/Site/"

    // Serve static files from "public" at the correct base path
    devServerConfig.static = [
      {
        directory: path.resolve(__dirname, "public"),
        publicPath: servedPath, // expose under /Site/*
        watch: true,
        serveIndex: true, // optional: http://localhost:3000/Site/Certificates lists files
      },
    ];

    // SPA fallback must return index.html under the same base
    devServerConfig.historyApiFallback = {
      disableDotRule: true,
      index: `${servedPath}index.html`,
    };

    // Ensure webpack dev middleware outputs bundles under /Site/*
    devServerConfig.devMiddleware = {
      ...(devServerConfig.devMiddleware || {}),
      publicPath: servedPath,
    };

    // Optional: only overlay errors
    devServerConfig.client = {
      ...(devServerConfig.client || {}),
      overlay: { errors: true, warnings: false },
    };

    return devServerConfig;
  },
};