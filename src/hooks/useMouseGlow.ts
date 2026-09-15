import { useCallback } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';

/**
 * 卡片高光 hook（Tech_Design §6）：onMouseMove 写入 CSS 变量 --mx/--my（百分比），
 * 直改 DOM style、无重渲染；GlassCard 的 ::before 径向高光用其定位。
 */
export function useMouseGlow<T extends HTMLElement>() {
  const handleMouseMove = useCallback((event: ReactMouseEvent<T>) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    element.style.setProperty('--mx', `${x}%`);
    element.style.setProperty('--my', `${y}%`);
  }, []);

  return handleMouseMove;
}