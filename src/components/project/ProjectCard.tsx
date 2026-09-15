import { motion, useReducedMotion } from 'framer-motion';
import type { MotionProps } from 'framer-motion';
import { Bot, Blocks, Code, Sparkles, Terminal } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Chip from '../ui/Chip';
import GlassCard from '../ui/GlassCard';
import ProjectLinks from './ProjectLinks';
import { cardHover, hoverSpring } from '../../lib/motion';
import { PROJECT_TYPE_LABEL } from '../../types';
import type { Project, ProjectType } from '../../types';

/** 技术栈 chips 最多展示数量，超出折叠为 +N（PRD F4） */
const TECH_CHIPS_MAX = 4;

/** 类型专属占位图形（PRD F4.1 缺省策略，M3）：各类型一个黑白线性图标 */
const TYPE_PLACEHOLDER_ICON: Record<ProjectType, LucideIcon> = {
  agent: Bot,
  lowcode: Blocks,
  editor: Code,
  cli: Terminal,
  other: Sparkles,
};

/** 类型专属玻璃占位：径向微光 + 类型图标 + 类型名（无封面时的缺省视觉，PRD F4.1） */
function TypePlaceholder({ type }: { type: ProjectType }) {
  const Icon = TYPE_PLACEHOLDER_ICON[type];
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(140px_circle_at_50%_42%,rgba(255,255,255,0.08),transparent_70%)]">
      <Icon size={40} strokeWidth={1.5} aria-hidden="true" className="text-ink-tertiary" />
      <span className="font-mono text-xs uppercase tracking-widest text-ink-tertiary">
        {PROJECT_TYPE_LABEL[type]}
      </span>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
}

/**
 * 项目卡片：GlassCard 承载（玻璃配方 + hover 高光流动）、motion 上浮、封面懒加载 /
 * 类型专属占位图形、右上角类型徽标、置顶 ☆、chips ≤4 + N、ProjectLinks 链接组。
 * 整卡点击走 stretched-link（M3 键盘可达化，Build.md §2.4）：h3 主链接 after:inset-0
 * 铺满整卡——鼠标点卡片任意处即打开 links[0]，键盘 Tab 首站即主链接（替代原静态 onClick）。
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  const reduced = useReducedMotion();
  // reduced 时退化为普通容器（无上浮动画，AGENTS §5.4）
  const hoverProps: MotionProps = reduced ? {} : { whileHover: cardHover, transition: hoverSpring };

  const visibleTech = project.techStack.slice(0, TECH_CHIPS_MAX);
  const hiddenCount = project.techStack.length - visibleTech.length;
  const primaryLink = project.links[0];

  return (
    <motion.article {...hoverProps} className="h-full">
      <GlassCard className="flex h-full flex-col">
        <div className="relative aspect-[16/10] w-full shrink-0">
          {project.cover?.type === 'image' ? (
            <img
              src={`${import.meta.env.BASE_URL}${project.cover.src}`}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : (
            <TypePlaceholder type={project.type} />
          )}
          <span className="absolute right-3 top-3 rounded-full border border-ink-border bg-black/60 px-2.5 py-0.5 font-mono text-xs text-ink-secondary">
            {PROJECT_TYPE_LABEL[project.type]}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-ink-primary">
            {/* stretched-link：after:inset-0 铺满 GlassCard（relative isolate），整卡可点且键盘可达 */}
            <a
              href={primaryLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded after:absolute after:inset-0"
            >
              {project.name}
            </a>
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

          {/* 链接区抬到 stretched-link 之上（relative z-10），真实链接优先接收点击（Tech_Design §6） */}
          <div className="relative z-10">
            <ProjectLinks links={project.links} />
          </div>
        </div>
      </GlassCard>
    </motion.article>
  );
}