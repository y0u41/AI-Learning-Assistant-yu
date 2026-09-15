import YuLogo from '../logo/YuLogo';
import { profile } from '../../data/profile';

/**
 * 页脚（PRD F6）：静态 YuLogo（animated=false，Tech_Design §9）+ 版权 + 回顶部。
 * 版权行姓名取自 data（AGENTS §7 禁止组件内硬编码内容）。
 */
export default function Footer() {
  return (
    <footer className="border-t border-ink-border">
      <div className="mx-auto flex max-w-content flex-col items-center gap-4 px-6 py-10 text-sm text-ink-tertiary">
        <YuLogo size={56} animated={false} />
        <p>
          © {new Date().getFullYear()} {profile.name} · Designed &amp; Built by {profile.name}
        </p>
        <a href="#top" aria-label="回到顶部" className="transition-colors hover:text-ink-primary">
          ↑ 顶部
        </a>
      </div>
    </footer>
  );
}