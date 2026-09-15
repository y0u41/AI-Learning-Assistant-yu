import { defineConfig } from 'vite'
import type { HtmlTagDescriptor, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { profile } from './src/data/profile'
import { skills } from './src/data/skills'

/**
 * M4（Build.md §2.5）：首屏字体 preload。
 * 字体产物文件名带 hash，无法在 index.html 手写，故构建时从 bundle 解析
 * Quicksand latin 400/600（H1 与正文字重，首屏必用）注入 <link rel="preload">。
 */
function firstScreenFontPreload(): Plugin {
  return {
    name: 'preload-first-screen-fonts',
    apply: 'build',
    transformIndexHtml(_html, ctx) {
      if (!ctx.bundle) return []
      const tags: HtmlTagDescriptor[] = []
      for (const [fileName, file] of Object.entries(ctx.bundle)) {
        if (file.type !== 'asset') continue
        if (/^assets\/quicksand-latin-(400|600)-normal-[\w-]+\.woff2$/.test(fileName)) {
          tags.push({
            tag: 'link',
            attrs: {
              rel: 'preload',
              as: 'font',
              type: 'font/woff2',
              href: `/${fileName}`,
              // 字体请求始终以 CORS 模式发出，preload 必须带 crossorigin
              crossorigin: '',
            },
            injectTo: 'head-prepend',
          })
        }
      }
      return tags
    },
  }
}

/** M4：Person JSON-LD（Tech_Design §11）——数据取自 src/data，与页面内容同源（AGENTS §7） */
function personJsonLd(): Plugin {
  return {
    name: 'person-json-ld',
    transformIndexHtml() {
      const data = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profile.name,
        description: profile.tagline,
        jobTitle: profile.roles.join(' · '),
        email: profile.email,
        knowsAbout: skills.flatMap((group) => group.items),
        sameAs: profile.socials.map((social) => social.url),
        // M5：GitHub Pages 子路径地址（切换 Vercel 等根域名托管时同步更新）
        url: 'https://y0u41.github.io/AI-Learning-Assistant-yu/',
      }
      return [
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(data),
          injectTo: 'head',
        },
      ]
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), firstScreenFontPreload(), personJsonLd()],
})

