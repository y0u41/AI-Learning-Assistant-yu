import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface YuLogoProps {
  /** 渲染宽度（px），高度按 viewBox 比例缩放 */
  size?: number;
  /** 是否启用入场/呼吸动画；Footer 等静态场景传 false（Tech_Design §9） */
  animated?: boolean;
}

/** sessionStorage 标记：描边入场每会话只播一次（Tech_Design §9） */
const INTRO_KEY = 'yu-logo-intro';

/** "yu" 连笔字标路径（=「宇」的拼音，圆头笔画，y 尾与 u 起笔连续成弧，PRD §6.5 流动母题） */
const LETTER_PATH =
  'M14 14 V34 Q14 50 30 48 Q40 46 48 34 L48 20 V38 Q48 52 62 50 Q76 48 76 34 V20';

/**
 * "yu" 字标（Tech_Design §9）：双层 SVG——玻璃容器层（胶囊 + 流光）+ 字标描边层。
 * 入场：motion.path pathLength 0→1 约 1.2s，sessionStorage 标记每会话一次；
 * 待机：流光/呼吸走 CSS keyframes（index.css，prefers-reduced-motion 包裹）。
 * animated=false（Footer/打印）时全静态；导航 / Hero / Footer 三处复用。
 */
export default function YuLogo({ size = 48, animated = true }: YuLogoProps) {
  const reduced = useReducedMotion();
  // useId 含冒号，URL fragment 中需去除以保证 clipPath 引用稳定
  const clipId = useId().replace(/:/g, '');
  const hasPlayed =
    typeof window !== 'undefined' && window.sessionStorage.getItem(INTRO_KEY) === '1';
  const playIntro = animated && !reduced && !hasPlayed;

  function markIntroPlayed() {
    try {
      window.sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      // 隐私模式等场景 sessionStorage 不可用：静默降级（下次进入仍尝试播放）
    }
  }

  return (
    <svg
      width={size}
      height={Math.round((size * 72) / 128)}
      viewBox="0 0 128 72"
      role="img"
      aria-label="宇（yu）字标"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="4" y="4" width="120" height="64" rx="32" />
        </clipPath>
        <linearGradient id={`${clipId}-sheen`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(255,255,255,0)" />
          <stop offset="0.5" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="1" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {/* 玻璃容器层：胶囊底 + 白 12% 描边；呼吸走 CSS（index.css .logo-breathe） */}
      <rect
        x="4"
        y="4"
        width="120"
        height="64"
        rx="32"
        fill="rgba(255,255,255,0.05)"
        stroke="rgba(255,255,255,0.12)"
        className={animated && !reduced ? 'logo-breathe' : undefined}
      />

      {/* 内部流光：clip 限制在胶囊内，CSS 往返（index.css .logo-sheen） */}
      <g clipPath={`url(#${clipId})`}>
        <rect
          x="24"
          y="10"
          width="22"
          height="52"
          rx="11"
          fill={`url(#${clipId}-sheen)`}
          className={animated && !reduced ? 'logo-sheen' : undefined}
        />
      </g>

      {/* 字标描边层：首次入场 pathLength 0→1（约 1.2s，仅一次） */}
      <motion.path
        d={LETTER_PATH}
        transform="translate(19 3)"
        fill="none"
        stroke="rgba(255,255,255,0.92)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={playIntro ? { pathLength: 0, opacity: 0.4 } : false}
        animate={playIntro ? { pathLength: 1, opacity: 1 } : undefined}
        transition={playIntro ? { duration: 1.2, ease: 'easeInOut' } : undefined}
        onAnimationComplete={playIntro ? markIntroPlayed : undefined}
      />
    </svg>
  );
}