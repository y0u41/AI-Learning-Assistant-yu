import { useEffect, useState } from 'react';

/**
 * 导航高亮 hook（Tech_Design §3/§6）：IntersectionObserver 观察各分区，返回当前激活分区 id。
 * 触发带设在视口 30%–40% 高度处：分区顶边进入即高亮，保留最后一个命中的分区。
 * 注意：sectionIds 必须传模块级常量（引用稳定，避免 observer 反复重建）；
 * 新增页面分区时同步维护观察目标（AGENTS §11.2）。
 */
export function useActiveSection(sectionIds: readonly string[]): string {
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      // rootMargin：顶 30% / 底 40% 之间为触发带，接近「滚动到哪高亮哪」
      { rootMargin: '-30% 0px -40% 0px', threshold: 0 },
    );

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    }
    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}