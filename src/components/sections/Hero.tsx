import YuLogo from '../logo/YuLogo';
import Chip from '../ui/Chip';
import { profile } from '../../data/profile';

/**
 * 首屏 Hero：YuLogo（描边入场 + 呼吸）+ H1 + 简介 + 身份标签 + 头像 + 快捷按钮 + 滚动指示。
 * <h1> 必须是全页唯一（PRD F1 验收）。
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center"
    >
      {/* "yu" 字标：导航 / Hero / Footer 三处复用（Tech_Design §9） */}
      <YuLogo size={96} animated />

      {/* 标题文案取自 data（AGENTS §7 禁止组件内硬编码内容） */}
      <h1 className="text-4xl font-semibold text-ink-primary md:text-6xl">
        {profile.name}的作品集
      </h1>

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
        src={`${import.meta.env.BASE_URL}${profile.avatar}`}
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

      {/* 滚动指示：点击平滑滚动至「关于」；float-y 浮动动画（index.css，reduced 降级） */}
      <a
        href="#about"
        aria-label="向下滚动至「关于我」"
        className="float-y absolute bottom-8 text-ink-tertiary transition-colors hover:text-ink-primary"
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