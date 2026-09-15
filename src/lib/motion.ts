/**
 * 统一动效 variants（Tech_Design §8）。M2 实现；改动画只动本文件（AGENTS §7 变更边界），
 * 禁止各组件自造动画。
 * TODO(M2): sectionReveal（whileInView + stagger，间隔 60–80ms，viewport once: true）等；
 * 全部动画尊重 prefers-reduced-motion（useReducedMotion → initial={false}，AGENTS §5.4）。
 */
export {};