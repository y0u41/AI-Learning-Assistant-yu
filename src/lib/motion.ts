import type { TargetAndTransition, Transition, Variants } from 'framer-motion';

/**
 * 统一动效 variants（Tech_Design §8）。改动画只动本文件（AGENTS §7），
 * 禁止各组件自造动画。消费方须配合 useReducedMotion() 降级（AGENTS §5.4）：
 * reduced 时 initial={false}、不传 whileInView / exit。
 */

/** 分区 reveal：whileInView 一次性触发（viewport once），custom 控制子项延迟（间隔 60–80ms 红线） */
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.07, type: 'spring', stiffness: 120, damping: 20 },
  }),
};

/** 卡片 hover 上浮（200ms 级，PRD §5 参数红线） */
export const cardHover: TargetAndTransition = { y: -4 };

/** 卡片 hover 弹簧参数 */
export const hoverSpring: Transition = { type: 'spring', stiffness: 300, damping: 20 };

/** 筛选列表项（≤200ms 过渡，Build.md §2.3 验收）：按 variant 标签引用，规避复杂联合类型 */
export const listItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
};