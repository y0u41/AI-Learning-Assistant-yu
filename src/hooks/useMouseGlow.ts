/**
 * 卡片高光 hook（Tech_Design §6）：onMouseMove 写入 CSS 变量 --mx/--my（百分比），无重渲染。M2 实现。
 * TODO(M2): 供 GlassCard 使用，配合 ::before
 * radial-gradient(240px circle at var(--mx) var(--my), var(--glow), transparent 60%)。
 */
export {};