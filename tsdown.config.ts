import { defineConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'

export default defineConfig({
  platform: 'neutral',
  fromVite: false,
  plugins: [Vue({ isProduction: true })],
  dts: { vue: true },
  css: {
    inject: true
  }
})