import Chip from '../ui/Chip';
import { profile } from '../../data/profile';

/**
 * 首屏 Hero（M1 静态版）：Logo 占位 + H1 + 简介 + 身份标签 + 头像 + 快捷按钮 + 滚动指示。
 * <h1> 必须是全页唯一（PRD F1 验收）。
 * TODO(M2): Logo 占位换 YuLogo（描边入场 + 呼吸）；滚动指示浮动动画（reduced-motion 降级）。
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center"
    >
      {/* Logo 占位：M2 换 YuLogo 同款字标 */}
      <div
        aria-hidden="true"
        className="flex items-center justify-center rounded-full border border-ink-border bg-white/5 px-8 py-3 font-mono text-3xl font-semibold text-ink-primary shadow-glass"
      >
        yu
      </div>

      <h1 className="text-4xl font-semibold text-ink-primary md:text-6xl">yu 的作品集</h1>

      <p className="max-w-xl text-base text-ink-secondary md:text-lg">{profile.tagline}</p>

      <ul className="flex flex-wrap items-center justify-center gap-2">
        {profile.roles.map((role) => (
          <li key={role}>
            <Chip label={role} />
          </li>
        ))}
      </ul>

      {/* 显式宽高防 CLS（PRD §7 性能要求） */}
      <img
        src={profile.avatar}
        alt={`${profile.name} 的头像`}
        width="96"
        height="96"
        className="h-24 w-24 rounded-full border border-ink-border object-cover"
      />

      <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#projects"
          className="rounded-full border border-ink-border bg-white/5 px-6 py-2.5 text-sm font-medium text-ink-primary transition-colors hover:bg-white/10"
        >
          查看项目
        </a>
        <a
          href="#contact"
          className="rounded-full border border-ink-border px-6 py-2.5 text-sm text-ink-secondary transition-colors hover:text-ink-primary"
        >
          联系我
        </a>
      </div>

      {/* 滚动指示：点击平滑滚动至「关于」（M2 加浮动动画，须 reduced-motion 降级） */}
      <a
        href="#about"
        aria-label="向下滚动至「关于我」"
        className="absolute bottom-8 text-ink-tertiary transition-colors hover:text-ink-primary"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}