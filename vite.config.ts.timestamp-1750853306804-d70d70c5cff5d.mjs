// vite.config.ts
import UnpluginTypia from "file:///home/a1/Desktop/dev-work/dydx-hashcase/v4-web/node_modules/.pnpm/@jsr+ryoppippi__unplugin-typia@1.1.0_@samchon+openapi@2.2.1_@types+node@20.12.13_rollup@2.79.1_tsx@4.7.1/node_modules/@jsr/ryoppippi__unplugin-typia/src/vite.js";
import react from "file:///home/a1/Desktop/dev-work/dydx-hashcase/v4-web/node_modules/.pnpm/@vitejs+plugin-react@4.2.1_vite@4.3.9/node_modules/@vitejs/plugin-react/dist/index.mjs";
import fs from "fs";
import path from "path";
import sourcemaps from "file:///home/a1/Desktop/dev-work/dydx-hashcase/v4-web/node_modules/.pnpm/rollup-plugin-sourcemaps@0.6.3_@types+node@20.12.13_rollup@2.79.1/node_modules/rollup-plugin-sourcemaps/dist/index.js";
import { defineConfig } from "file:///home/a1/Desktop/dev-work/dydx-hashcase/v4-web/node_modules/.pnpm/vite@4.3.9_@types+node@20.12.13/node_modules/vite/dist/node/index.js";
import nodePolyfills from "file:///home/a1/Desktop/dev-work/dydx-hashcase/v4-web/node_modules/.pnpm/vite-plugin-node-stdlib-browser@0.2.1_node-stdlib-browser@1.2.0_rollup@2.79.1_vite@4.3.9/node_modules/vite-plugin-node-stdlib-browser/index.cjs";
import ViteRestart from "file:///home/a1/Desktop/dev-work/dydx-hashcase/v4-web/node_modules/.pnpm/vite-plugin-restart@0.4.0_vite@4.3.9/node_modules/vite-plugin-restart/dist/index.js";
import svgr from "file:///home/a1/Desktop/dev-work/dydx-hashcase/v4-web/node_modules/.pnpm/vite-plugin-svgr@3.2.0_rollup@2.79.1_typescript@5.7.2_vite@4.3.9/node_modules/vite-plugin-svgr/dist/index.js";
var __vite_injected_original_dirname = "/home/a1/Desktop/dev-work/dydx-hashcase/v4-web";
var entryPointsDir = path.join(__vite_injected_original_dirname, "entry-points");
var entryPointsExist = fs.existsSync(entryPointsDir);
var entryPoints = entryPointsExist ? fs.readdirSync(entryPointsDir).map((file) => `/entry-points/${file}`) : [];
var vite_config_default = defineConfig(({ mode }) => ({
  define: {
    "process.env": {}
  },
  rollupOptions: {
    // Needed for Abacus sourcemaps since Rollup doesn't load external sourcemaps by default.
    // https://github.com/vitejs/vite/issues/11743
    plugins: mode === "development" ? [sourcemaps()] : []
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__vite_injected_original_dirname, "src") },
      { find: "public", replacement: path.resolve(__vite_injected_original_dirname, "public") },
      {
        find: "stream",
        replacement: "stream-browserify"
      },
      {
        find: "assert",
        replacement: "assert"
      },
      {
        find: "url",
        replacement: "url-polyfill"
      },
      {
        find: "util",
        replacement: "util/"
      },
      {
        find: "zlib",
        replacement: "browserify-zlib"
      }
    ]
  },
  plugins: [
    nodePolyfills(),
    UnpluginTypia({}),
    react({
      babel: {
        plugins: [
          "babel-plugin-twin",
          "babel-plugin-macros",
          [
            "babel-plugin-styled-components",
            {
              displayName: mode === "development"
            }
          ]
        ],
        exclude: ["@dydxprotocol/v4-client-js"]
      }
    }),
    svgr({
      exportAsDefault: true
    }),
    // Currently, the Vite file watcher is unable to watch folders within node_modules.
    // Workaround is to use ViteRestart plugin + a generated file to trigger the restart.
    // See https://github.com/vitejs/vite/issues/8619
    ViteRestart({
      restart: ["local-abacus-hash", "local-client-js-hash"]
    })
  ],
  publicDir: "public",
  test: {
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
      "**/e2e/**"
    ],
    environment: "jsdom"
  },
  build: {
    rollupOptions: {
      input: entryPoints
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9hMS9EZXNrdG9wL2Rldi13b3JrL2R5ZHgtaGFzaGNhc2UvdjQtd2ViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9hMS9EZXNrdG9wL2Rldi13b3JrL2R5ZHgtaGFzaGNhc2UvdjQtd2ViL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2ExL0Rlc2t0b3AvZGV2LXdvcmsvZHlkeC1oYXNoY2FzZS92NC13ZWIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgVW5wbHVnaW5UeXBpYSBmcm9tICdAcnlvcHBpcHBpL3VucGx1Z2luLXR5cGlhL3ZpdGUnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBzb3VyY2VtYXBzIGZyb20gJ3JvbGx1cC1wbHVnaW4tc291cmNlbWFwcyc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBub2RlUG9seWZpbGxzIGZyb20gJ3ZpdGUtcGx1Z2luLW5vZGUtc3RkbGliLWJyb3dzZXInO1xuaW1wb3J0IFZpdGVSZXN0YXJ0IGZyb20gJ3ZpdGUtcGx1Z2luLXJlc3RhcnQnO1xuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3Zncic7XG5cbmNvbnN0IGVudHJ5UG9pbnRzRGlyID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJ2VudHJ5LXBvaW50cycpO1xuY29uc3QgZW50cnlQb2ludHNFeGlzdCA9IGZzLmV4aXN0c1N5bmMoZW50cnlQb2ludHNEaXIpO1xuXG5jb25zdCBlbnRyeVBvaW50cyA9IGVudHJ5UG9pbnRzRXhpc3RcbiAgPyBmcy5yZWFkZGlyU3luYyhlbnRyeVBvaW50c0RpcikubWFwKChmaWxlKSA9PiBgL2VudHJ5LXBvaW50cy8ke2ZpbGV9YClcbiAgOiBbXTtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XG4gIGRlZmluZToge1xuICAgICdwcm9jZXNzLmVudic6IHt9LFxuICB9LFxuICByb2xsdXBPcHRpb25zOiB7XG4gICAgLy8gTmVlZGVkIGZvciBBYmFjdXMgc291cmNlbWFwcyBzaW5jZSBSb2xsdXAgZG9lc24ndCBsb2FkIGV4dGVybmFsIHNvdXJjZW1hcHMgYnkgZGVmYXVsdC5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdml0ZWpzL3ZpdGUvaXNzdWVzLzExNzQzXG4gICAgcGx1Z2luczogbW9kZSA9PT0gJ2RldmVsb3BtZW50JyA/IFtzb3VyY2VtYXBzKCldIDogW10sXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczogW1xuICAgICAgeyBmaW5kOiAnQCcsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJykgfSxcbiAgICAgIHsgZmluZDogJ3B1YmxpYycsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAncHVibGljJykgfSxcbiAgICAgIHtcbiAgICAgICAgZmluZDogJ3N0cmVhbScsXG4gICAgICAgIHJlcGxhY2VtZW50OiAnc3RyZWFtLWJyb3dzZXJpZnknLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZmluZDogJ2Fzc2VydCcsXG4gICAgICAgIHJlcGxhY2VtZW50OiAnYXNzZXJ0JyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZpbmQ6ICd1cmwnLFxuICAgICAgICByZXBsYWNlbWVudDogJ3VybC1wb2x5ZmlsbCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBmaW5kOiAndXRpbCcsXG4gICAgICAgIHJlcGxhY2VtZW50OiAndXRpbC8nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZmluZDogJ3psaWInLFxuICAgICAgICByZXBsYWNlbWVudDogJ2Jyb3dzZXJpZnktemxpYicsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICBub2RlUG9seWZpbGxzKCksXG4gICAgVW5wbHVnaW5UeXBpYSh7fSksXG5cbiAgICByZWFjdCh7XG4gICAgICBiYWJlbDoge1xuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgJ2JhYmVsLXBsdWdpbi10d2luJyxcbiAgICAgICAgICAnYmFiZWwtcGx1Z2luLW1hY3JvcycsXG4gICAgICAgICAgW1xuICAgICAgICAgICAgJ2JhYmVsLXBsdWdpbi1zdHlsZWQtY29tcG9uZW50cycsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBtb2RlID09PSAnZGV2ZWxvcG1lbnQnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICBdLFxuICAgICAgICBleGNsdWRlOiBbJ0BkeWR4cHJvdG9jb2wvdjQtY2xpZW50LWpzJ10sXG4gICAgICB9LFxuICAgIH0pLFxuXG4gICAgc3Zncih7XG4gICAgICBleHBvcnRBc0RlZmF1bHQ6IHRydWUsXG4gICAgfSksXG5cbiAgICAvLyBDdXJyZW50bHksIHRoZSBWaXRlIGZpbGUgd2F0Y2hlciBpcyB1bmFibGUgdG8gd2F0Y2ggZm9sZGVycyB3aXRoaW4gbm9kZV9tb2R1bGVzLlxuICAgIC8vIFdvcmthcm91bmQgaXMgdG8gdXNlIFZpdGVSZXN0YXJ0IHBsdWdpbiArIGEgZ2VuZXJhdGVkIGZpbGUgdG8gdHJpZ2dlciB0aGUgcmVzdGFydC5cbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVqcy92aXRlL2lzc3Vlcy84NjE5XG4gICAgVml0ZVJlc3RhcnQoe1xuICAgICAgcmVzdGFydDogWydsb2NhbC1hYmFjdXMtaGFzaCcsICdsb2NhbC1jbGllbnQtanMtaGFzaCddLFxuICAgIH0pLFxuICBdLFxuICBwdWJsaWNEaXI6ICdwdWJsaWMnLFxuICB0ZXN0OiB7XG4gICAgZXhjbHVkZTogW1xuICAgICAgJyoqL25vZGVfbW9kdWxlcy8qKicsXG4gICAgICAnKiovZGlzdC8qKicsXG4gICAgICAnKiovY3lwcmVzcy8qKicsXG4gICAgICAnKiovLntpZGVhLGdpdCxjYWNoZSxvdXRwdXQsdGVtcH0vKionLFxuICAgICAgJyoqL3trYXJtYSxyb2xsdXAsd2VicGFjayx2aXRlLHZpdGVzdCxqZXN0LGF2YSxiYWJlbCxueWMsY3lwcmVzcyx0c3VwLGJ1aWxkfS5jb25maWcuKicsXG4gICAgICAnKiovZTJlLyoqJyxcbiAgICBdLFxuICAgIGVudmlyb25tZW50OiAnanNkb20nLFxuICB9LFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiBlbnRyeVBvaW50cyxcbiAgICB9LFxuICB9LFxufSkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0VCxPQUFPLG1CQUFtQjtBQUN0VixPQUFPLFdBQVc7QUFDbEIsT0FBTyxRQUFRO0FBQ2YsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sVUFBVTtBQVJqQixJQUFNLG1DQUFtQztBQVV6QyxJQUFNLGlCQUFpQixLQUFLLEtBQUssa0NBQVcsY0FBYztBQUMxRCxJQUFNLG1CQUFtQixHQUFHLFdBQVcsY0FBYztBQUVyRCxJQUFNLGNBQWMsbUJBQ2hCLEdBQUcsWUFBWSxjQUFjLEVBQUUsSUFBSSxDQUFDLFNBQVMsaUJBQWlCLElBQUksRUFBRSxJQUNwRSxDQUFDO0FBR0wsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE9BQU87QUFBQSxFQUN6QyxRQUFRO0FBQUEsSUFDTixlQUFlLENBQUM7QUFBQSxFQUNsQjtBQUFBLEVBQ0EsZUFBZTtBQUFBO0FBQUE7QUFBQSxJQUdiLFNBQVMsU0FBUyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO0FBQUEsRUFDdEQ7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEVBQUUsTUFBTSxLQUFLLGFBQWEsS0FBSyxRQUFRLGtDQUFXLEtBQUssRUFBRTtBQUFBLE1BQ3pELEVBQUUsTUFBTSxVQUFVLGFBQWEsS0FBSyxRQUFRLGtDQUFXLFFBQVEsRUFBRTtBQUFBLE1BQ2pFO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsTUFDZjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWE7QUFBQSxNQUNmO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYTtBQUFBLE1BQ2Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsTUFDZjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWE7QUFBQSxNQUNmO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLGNBQWM7QUFBQSxJQUNkLGNBQWMsQ0FBQyxDQUFDO0FBQUEsSUFFaEIsTUFBTTtBQUFBLE1BQ0osT0FBTztBQUFBLFFBQ0wsU0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFlBQ0U7QUFBQSxZQUNBO0FBQUEsY0FDRSxhQUFhLFNBQVM7QUFBQSxZQUN4QjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxTQUFTLENBQUMsNEJBQTRCO0FBQUEsTUFDeEM7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUVELEtBQUs7QUFBQSxNQUNILGlCQUFpQjtBQUFBLElBQ25CLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUtELFlBQVk7QUFBQSxNQUNWLFNBQVMsQ0FBQyxxQkFBcUIsc0JBQXNCO0FBQUEsSUFDdkQsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFdBQVc7QUFBQSxFQUNYLE1BQU07QUFBQSxJQUNKLFNBQVM7QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxhQUFhO0FBQUEsRUFDZjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
