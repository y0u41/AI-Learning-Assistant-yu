import type { Config } from 'tailwindcss';

/**
 * Tailwind 配置 —— design tokens 映射（Tech_Design §7）。
 * 颜色只允许引用 src/index.css 的 CSS 变量（AGENTS §5.1：只有黑白）；
 * 调主题只改 index.css tokens + 本文件映射，禁止逐组件改色值（AGENTS §11.3）。
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          bg: 'var(--bg)',
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          border: 'var(--border)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)'],
      },
      borderRadius: { card: 'var(--radius-card)' },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.4)',
        'glass-hover': '0 12px 40px rgba(0,0,0,0.55)',
      },
      maxWidth: { content: '1120px' },
    },
  },
  plugins: [],
} satisfies Config;