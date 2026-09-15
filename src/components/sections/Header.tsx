import { useActiveSection } from '../../hooks/useActiveSection';

/** 导航锚点项（模块级常量：数组引用稳定，供 useActiveSection 的依赖使用） */
const NAV_ITEMS = [
  { id: 'about', label: '关于' },
  { id: 'projects', label: '项目' },
  { id: 'contact', label: '联系' },
] as const;

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

/**
 * 吸顶导航（M1 静态版）：锚点 + 当前分区高亮（当前项 92% 白，其余 65% 白，PRD F2）。
 * TODO(M2): 滚动玻璃态 + ≤768px 汉堡按钮与玻璃抽屉；
 * TODO(M3): 抽屉 Esc 可关、焦点样式复查（Build.md §2.4）。
 */
export default function Header() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="主导航"
        className="mx-auto flex h-16 max-w-content items-center justify-between px-6"
      >
        {/* TODO(M2): 替换为 YuLogo 组件（点击回顶部，Tech_Design §9） */}
        <a
          href="#top"
          className="font-mono text-xl font-semibold text-ink-primary transition-opacity hover:opacity-80"
        >
          yu
        </a>
        <ul className="flex items-center gap-6 text-sm md:gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={
                    isActive
                      ? 'text-ink-primary'
                      : 'text-ink-secondary transition-colors hover:text-ink-primary'
                  }
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}