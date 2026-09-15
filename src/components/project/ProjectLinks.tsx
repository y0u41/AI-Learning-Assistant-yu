import { Download, FileText, FolderGit2, Globe, Terminal } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import CopyButton from '../ui/CopyButton';
import { LINK_KIND_LABEL } from '../../types';
import type { LinkKind, ProjectLink } from '../../types';

/** kind → lucide 图标（黑白线性，AGENTS §3） */
const KIND_ICON: Record<LinkKind, LucideIcon> = {
  repo: FolderGit2,
  demo: Globe,
  article: FileText,
  download: Download,
  install: Terminal,
};

interface ProjectLinksProps {
  links: ProjectLink[];
}

/**
 * 卡片链接组（PRD F4.1）：按 kind 渲染图标按钮；install 渲染命令 + CopyButton。
 * 外链一律新标签 + noopener noreferrer（AGENTS §4.6）；
 * 点击 stopPropagation，避免触发整卡点击重复打开（Tech_Design §6）。
 */
export default function ProjectLinks({ links }: ProjectLinksProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map((link) => {
        const key = `${link.kind}-${link.url}`;
        const label = link.label ?? LINK_KIND_LABEL[link.kind];

        if (link.kind === 'install' && link.command) {
          return (
            <div
              key={key}
              className="flex items-center gap-2 rounded-full border border-ink-border bg-white/5 py-1 pl-3 pr-1.5"
            >
              <code
                className="max-w-[220px] truncate font-mono text-xs text-ink-secondary"
                title={link.command}
              >
                {link.command}
              </code>
              <CopyButton text={link.command} label={`复制安装命令：${link.command}`} />
            </div>
          );
        }

        const Icon = KIND_ICON[link.kind];
        return (
          <a
            key={key}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            onClick={(event) => event.stopPropagation()}
            className="inline-flex items-center gap-1.5 rounded-full border border-ink-border bg-white/5 px-3 py-1.5 font-mono text-xs text-ink-secondary transition-colors hover:text-ink-primary"
          >
            <Icon size={14} aria-hidden="true" />
            {label}
          </a>
        );
      })}
    </div>
  );
}