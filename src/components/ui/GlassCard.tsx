/**
 * 玻璃容器（Tech_Design §6）。M2 实现样式与高光。
 *
 * TODO(M2):
 * - 玻璃配方收敛于此（AGENTS §5.3，业务组件禁止复制粘贴配方）：
 *   135deg 白色渐变底 + backdrop blur(16px) saturate(140%) + 1px rgba(255,255,255,.10) 描边
 *   + 圆角 20px+ + @supports 实色降级（见 src/index.css）
 * - useMouseGlow 写入 --mx/--my，::before 白色径向高光跟随鼠标（“流动”母题，PRD §6.4）
 */
export default function GlassCard() {
  return null;
}