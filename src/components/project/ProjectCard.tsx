import Chip from '../ui/Chip';
import { LINK_KIND_LABEL, PROJECT_TYPE_LABEL } from '../../types';
import type { Project, ProjectLink } from '../../types';

/** 技术栈 chips 最多展示数量，超出折叠为 +N（PRD F4） */
const TECH_CHIPS_MAX = 4;

/** 链接显示名：自定义 label 优先，否则按 kind 从集中映射推导 */
function linkLabel(link: ProjectLink): string {
  return link.label ?? LINK_KIND_LABEL[link.kind];
}

interface ProjectCardProps {
  project: Project;
}

/**
 * 项目卡片（M1 静态版）：封面/类型占位、右上角类型徽标、名称 + 置顶 ☆、
 * 简介、技术栈 chips（≤4 + N）、主链接。
 * TODO(M2): 换 GlassCard 承载（玻璃配方 + 高光）、封面懒加载、
 * ProjectLinks 多链接组与 install 命令一键复制。
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  const visibleTech = project.techStack.slice(0, TECH_CHIPS_MAX);
  const hiddenCount = project.techStack.length - visibleTech.length;
  const primaryLink = project.links[0];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-ink-border bg-white/5 shadow-glass transition-colors hover:border-white/20">
      <div className="relative aspect-[16/10] w-full">
        {project.cover?.type === 'image' ? (
          <img
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            className="h-full w-full object-cover"
          />
        ) : (
          /* TODO(M2): 换类型专属玻璃占位图形（PRD F4.1 缺省策略） */
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

        {/* TODO(M2): 换 ProjectLinks 多链接组；install 类型渲染命令 + CopyButton */}
        <a
          href={primaryLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-ink-tertiary transition-colors hover:text-ink-primary"
        >
          {linkLabel(primaryLink)} ↗
        </a>
      </div>
    </article>
  );
}