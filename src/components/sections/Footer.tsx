/**
 * 页脚（M1）：版权 + 回顶部（PRD F6）。年份取运行时当年（等价构建年份展示）。
 * TODO(M2): 补 YuLogo 静态版（animated=false，Tech_Design §6）。
 */
export default function Footer() {
  return (
    <footer className="border-t border-ink-border">
      <div className="mx-auto flex max-w-content flex-col items-center gap-3 px-6 py-10 text-sm text-ink-tertiary">
        <p>© {new Date().getFullYear()} yu · Designed &amp; Built by yu</p>
        <a href="#top" aria-label="回到顶部" className="transition-colors hover:text-ink-primary">
          ↑ 顶部
        </a>
      </div>
    </footer>
  );
}