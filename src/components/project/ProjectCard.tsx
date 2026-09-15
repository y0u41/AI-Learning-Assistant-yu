import { motion, useReducedMotion } from 'framer-motion';
import type { MotionProps } from 'framer-motion';
import Chip from '../ui/Chip';
import GlassCard from '../ui/GlassCard';
import ProjectLinks from './ProjectLinks';
import { cardHover, hoverSpring } from '../../lib/motion';
import { PROJECT_TYPE_LABEL } from '../../types';
import type { Project } from '../../types';

/** 技术栈 chips 最多展示数量，超出折叠为 +N（PRD F4） */
const TECH_CHIPS_MAX = 4;

interface ProjectCardProps {
  project: Project;
}

/**
 * 项目卡片（M2 完整视觉）：GlassCard 承载（玻璃配方 + hover 高光流动）、motion 上浮、
 * 封面懒加载 / 类型文字占位、右上角类型徽标、置顶 ☆、chips ≤4 + N、ProjectLinks 链接组。
 * 整卡点击 → links[0].url（内部交互元素 stopPropagation，Tech_Design §6）。
 * TODO(M3): 类型专属玻璃占位图形（PRD F4.1 缺省策略）精细化。
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  const reduced = useReducedMotion();
  // reduced 时退化为普通容器（无上浮动画，AGENTS §5.4）
  const hoverProps: MotionProps = reduced ? {} : { whileHover: cardHover, transition: hoverSpring };

  const visibleTech = project.techStack.slice(0, TECH_CHIPS_MAX);
  const hiddenCount = project.techStack.length - visibleTech.length;
  const primaryLink = project.links[0];

  /** 整卡点击 = 打开主链接（window.open + noopener，与外链安全要求等效） */
  function openPrimaryLink() {
    window.open(primaryLink.url, '_blank', 'noopener,noreferrer');
  }

  return (
    <motion.article {...hoverProps} onClick={openPrimaryLink} className="h-full cursor-pointer">
      <GlassCard className="flex h-full flex-col">
        <div className="relative aspect-[16/10] w-full shrink-0">
          {project.cover?.type === 'image' ? (
            <img
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : (
            /* TODO(M3): 类型专属玻璃占位图形（PRD F4.1 缺省策略） */
            <div className="flex h-full w-full items-center justify-center bg-white/5 font-mono text-sm text-ink-tertiary">
              {PROJECT_TYPE_LABEL[project.type]}
            </div>
          )}
          <span className="absolute right-3 top-3 rounded-full border border-ink-border bg-black/60 px-2.5 py-0.5 font-mono text-xs text-ink-secondary">
            {PROJECT_TYPE_LABEL[project.type]}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-ink-primary">
            {project.name}
            {project.pinned ? (
              <span aria-label="置顶作品" title="置顶" className="text-ink-secondary">
                ☆
              </span>
            ) : null}
          </h3>
          <p className="text-sm leading-relaxed text-ink-secondary">{project.tagline}</p>

          <div className="mt-auto flex flex-wrap gap-2">
            {visibleTech.map((tech) => (
              <Chip key={tech} label={tech} />
            ))}
            {hiddenCount > 0 ? <Chip label={`+${hiddenCount}`} /> : null}
          </div>

          {/* 链接区阻止冒泡，避免触发整卡点击重复打开（Tech_Design §6） */}
          <div onClick={(event) => event.stopPropagation()}>
            <ProjectLinks links={project.links} />
          </div>
        </div>
      </GlassCard>
    </motion.article>
  );
}