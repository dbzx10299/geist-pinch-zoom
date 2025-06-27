import { defineConfig } from 'vitepress'
import { createCssVariablesTheme } from 'shiki/core'

const cssVarsTheme = createCssVariablesTheme({ 
  name: 'css-variables',
  variablePrefix: '--shiki-',
  variableDefaults: {},
  fontStyle: true
})

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Geist Pinch Zoom",
  description: "An opinionated pinch zoom component for Vue.",
  markdown: {
    theme: cssVarsTheme,
  },
  cleanUrls: true,
  appearance: 'force-dark',
  themeConfig: {
    logo: '/site-logo.svg',
    editLink: {
      pattern: 'https://github.com/dbzx10299/geist-pinch-zoom/edit/main/docs/:path',
      text: 'Suggest changes to this page',
    },
    nav: [
      // { text: 'API', link: '/api' },
      { text: 'Docs', link: '/getting-started' }
    ],
    sidebar: [
      {
        text: 'Basics',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'API', link: '/api' }
        ]
      },
      // {
      //   text: 'Drawer',
      //   items: [
      //     { text: 'Examples', link: '/examples' }
      //   ]
      // },
      // {
      //   text: 'Minimal Drawer',
      //   items: [
      //     { text: 'Geist Vaul', link: '/geist-vaul' }
      //   ]
      // }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/dbzx10299/geist-pinch-zoom' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/geist-pinch-zoom' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present Geist'
    }
  },
  head: [
    ['meta', { name: 'theme-color', content: '#000' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'author', content: 'David Bender' }],
    ['meta', { property: 'og:title', content: 'Geist Pinch Zoom' }],
    ['meta', { property: 'og:description', content: 'Geist Pinch Zoom: An opinionated pinch zoom component for Vue.' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
  ],
})
