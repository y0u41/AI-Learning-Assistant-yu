import SectionHeading from '../ui/SectionHeading';
import { profile } from '../../data/profile';

/**
 * 联系方式（M1 静态版）：邮箱 mailto + 社交链接，内容全部来自 data 文件（PRD F5）。
 * TODO(M2): 邮箱接入 CopyButton（一键复制 + 「已复制」反馈，US4）；
 * TODO(M2): 社交按钮换 lucide 图标 + 玻璃样式。
 */
export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20">
      <div className="mx-auto max-w-content px-6 py-16 md:py-24">
        <SectionHeading index="03" title="联系" id="contact-title" />
        <div className="space-y-10">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-ink-tertiary">
              邮箱
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-lg text-ink-primary underline-offset-4 transition-colors hover:underline"
            >
              {profile.email}
            </a>
          </div>
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-tertiary">
              社交媒体
            </p>
            <ul className="flex flex-wrap gap-3">
              {profile.socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="inline-flex items-center rounded-full border border-ink-border bg-white/5 px-5 py-2 text-sm text-ink-secondary transition-colors hover:text-ink-primary"
                  >
                    {social.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}