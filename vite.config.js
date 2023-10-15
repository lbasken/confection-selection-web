import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import {createHtmlPlugin} from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, "env");
  console.log(env);
  return {
    plugins: [
      react(),
      createHtmlPlugin({
        inject: {data: Object.assign({mode}, env)},
      })
    ]
  }
});
