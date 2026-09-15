import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import ProjectCard from '../project/ProjectCard';
import ProjectFilter from '../project/ProjectFilter';
import type { FilterValue } from '../project/ProjectFilter';
import { projects } from '../../data/projects';
import { listItem, sectionReveal } from '../../lib/motion';
import type { Project } from '../../types';

/**
 * 置顶 → date 降序的稳定排序（Tech_Design §6）。
 * 无 date 视为最早；Array.prototype.sort 在 ES2019+ 保证稳定性。
 */
function sortProjects(list: Project[]): Project[] {
  return [...list].sort((a, b) => {
    if (Boolean(a.pinned) !== Boolean(b.pinned)) {
      return a.pinned ? -1 : 1;
    }
    return (b.date ?? '').localeCompare(a.date ?? '');
  });
}

/**
 * 项目展示（M2）：类型筛选（useState，不引状态库）+ 置顶优先 +
 * AnimatePresence ≤200ms 列表过渡 + 空状态（PRD F4）。
 */
export default function Projects() {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<FilterValue>('all');

  const sorted = useMemo(() => sortProjects(projects), []);

  // 各类型计数（含 'all' 总数），供筛选 Tab 展示与空类型隐藏
  const counts = useMemo(() => {
    const result = { all: projects.length } as Record<FilterValue, number>;
    for (const project of projects) {
      result[project.type] = (result[project.type] ?? 0) + 1;
    }
    return result;
  }, []);

  const filtered = filter === 'all' ? sorted : sorted.filter((p) => p.type === filter);

  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-20">
      <motion.div
        className="mx-auto max-w-content px-6 py-16 md:py-24"
        initial={reduced ? false : 'hidden'}
        whileInView={reduced ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionReveal}
      >
        <SectionHeading index="02" title="项目" id="projects-title" />
        <ProjectFilter active={filter} counts={counts} onChange={setFilter} />

        {filtered.length === 0 ? (
          <p className="rounded-card border border-ink-border bg-white/5 p-10 text-center text-sm text-ink-tertiary">
            该类型下暂无作品
          </p>
        ) : (
          <motion.ul layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.li
                  key={project.id}
                  layout
                  variants={listItem}
                  initial={reduced ? false : 'hidden'}
                  animate="visible"
                  exit={reduced ? undefined : 'exit'}
                  transition={reduced ? { duration: 0 } : { duration: 0.15 }}
                >
                  <ProjectCard project={project} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </motion.div>
    </section>
  );
}