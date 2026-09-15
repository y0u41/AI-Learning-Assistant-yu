import type { HTMLAttributes } from 'react';
import { useMouseGlow } from '../../hooks/useMouseGlow';

/**
 * 玻璃配方唯一定义处（AGENTS §5.3/§4.4，业务组件禁止复制粘贴配方）：
 * 135deg 白色渐变底 + blur(16px) saturate(140%) + 1px 白 10% 描边 + 圆角 20px（tokens）；
 * 鼠标跟随高光：::before 径向渐变定位在 --mx/--my，hover 渐显（opacity 200ms，无 JS 动画循环）。
 */
const GLASS_CLASS = [
  'glass relative isolate overflow-hidden rounded-card border border-ink-border',
  'bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]',
  'shadow-glass backdrop-blur-[16px] backdrop-saturate-[1.4]',
  'before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[inherit]',
  'before:bg-[radial-gradient(240px_circle_at_var(--mx,50%)_var(--my,50%),var(--glow),transparent_60%)]',
  'before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100',
].join(' ');

type GlassCardProps = HTMLAttributes<HTMLDivElement>;

/**
 * 玻璃容器（Tech_Design §6）：玻璃配方 + useMouseGlow 鼠标跟随高光。
 * @supports 降级见 src/index.css（.glass → 实色 rgba(255,255,255,0.07)）。
 */
export default function GlassCard({ children, className = '', ...rest }: GlassCardProps) {
  const handleMouseMove = useMouseGlow<HTMLDivElement>();

  return (
    <div {...rest} onMouseMove={handleMouseMove} className={`${GLASS_CLASS} ${className}`.trim()}>
      {children}
    </div>
  );
}