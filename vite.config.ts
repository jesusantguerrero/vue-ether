import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'vue-ethers'
    },
    rollupOptions: {
      external: ['ethers', 'vue', 'moralis', 'web3']
    }
  },
  test: {
    global: true,
    environment: 'happy-dom',
  }
})
