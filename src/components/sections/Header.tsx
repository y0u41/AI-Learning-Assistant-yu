import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import YuLogo from '../logo/YuLogo';
import { useActiveSection } from '../../hooks/useActiveSection';

/** 导航锚点项（模块级常量：数组引用稳定，供 useActiveSection 的依赖使用） */
const NAV_ITEMS = [
  { id: 'about', label: '关于' },
  { id: 'projects', label: '项目' },
  { id: 'contact', label: '联系' },
] as const;

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

/**
 * 吸顶玻璃导航（PRD F2）：下滑后玻璃态（顶部透明）、当前分区高亮（92% 白 / 其余 65% 白）、
 * ≤768px 汉堡 + 玻璃抽屉（点击菜单项滚动并收起，Esc 可关）。
 * TODO(M3): 焦点样式与抽屉焦点管理复查（Build.md §2.4）。
 */
export default function Header() {
  const reduced = useReducedMotion();
  const active = useActiveSection(SECTION_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 抽屉 Esc 可关（Build.md §2.4 键盘路径，M2 提前接入）
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled || open
          ? 'border-b border-ink-border bg-black/60 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      ].join(' ')}
    >
      <nav
        aria-label="主导航"
        className="mx-auto flex h-16 max-w-content items-center justify-between px-6"
      >
        {/* Logo：三处复用 YuLogo（Tech_Design §9），点击回顶部 */}
        <a href="#top" aria-label="回到顶部" onClick={() => setOpen(false)}>
          <YuLogo size={44} />
        </a>

        {/* 桌面锚点导航 */}
        <ul className="hidden items-center gap-8 text-sm md:flex">
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

        {/* 移动端汉堡按钮（≤768px，PRD F2） */}
        <button
          type="button"
          className="p-2 text-ink-secondary transition-colors hover:text-ink-primary md:hidden"
          aria-expanded={open}
          aria-controls="mobile-drawer"
          aria-label={open ? '关闭菜单' : '打开菜单'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>

      {/* 移动端玻璃抽屉：点击菜单项滚动并自动收起；进出动画 200ms（reduced 降级） */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-drawer"
            initial={reduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-b border-ink-border bg-black/70 backdrop-blur-md md:hidden"
          >
            <ul className="space-y-1 px-6 py-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={[
                      'block rounded-lg px-3 py-2.5 text-base transition-colors',
                      active === item.id
                        ? 'bg-white/5 text-ink-primary'
                        : 'text-ink-secondary hover:text-ink-primary',
                    ].join(' ')}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}