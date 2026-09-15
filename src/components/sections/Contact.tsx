import { motion, useReducedMotion } from 'framer-motion';
import { AtSign, ExternalLink, GitBranch, Link2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import CopyButton from '../ui/CopyButton';
import SectionHeading from '../ui/SectionHeading';
import { profile } from '../../data/profile';
import { sectionReveal } from '../../lib/motion';

/** 社交平台 → lucide 图标（新版 lucide 已移除品牌图标，用核心图标表意）；未收录回退外链图标 */
const SOCIAL_ICONS: Record<string, LucideIcon> = {
  github: GitBranch,
  twitter: AtSign,
  link: Link2,
};

/**
 * 联系方式（PRD F5）：邮箱一键复制 + mailto 兜底 + 社交外链，内容全部来自 data 文件。
 * 分区 reveal：whileInView 一次性（reduced 时禁用，AGENTS §5.4）。
 */
export default function Contact() {
  const reduced = useReducedMotion();

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20">
      <motion.div
        className="mx-auto max-w-content px-6 py-16 md:py-24"
        initial={reduced ? false : 'hidden'}
        whileInView={reduced ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionReveal}
      >
        <SectionHeading index="03" title="联系" id="contact-title" />
        <div className="space-y-10">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-ink-tertiary">
              邮箱
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="font-mono text-lg text-ink-primary underline-offset-4 transition-colors hover:underline"
              >
                {profile.email}
              </a>
              <CopyButton text={profile.email} label="复制邮箱地址" />
            </div>
          </div>
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-tertiary">
              社交媒体
            </p>
            <ul className="flex flex-wrap gap-3">
              {profile.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon] ?? ExternalLink;
                return (
                  <li key={social.platform}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.platform}
                      title={social.platform}
                      className="inline-flex items-center gap-2 rounded-full border border-ink-border bg-white/5 px-4 py-2 text-sm text-ink-secondary transition-colors hover:text-ink-primary"
                    >
                      <Icon size={16} aria-hidden="true" />
                      {social.platform}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}