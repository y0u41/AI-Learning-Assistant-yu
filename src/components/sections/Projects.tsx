import SectionHeading from '../ui/SectionHeading';
import ProjectCard from '../project/ProjectCard';
import { projects } from '../../data/projects';
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
 * 项目展示（M1 静态网格版）：置顶优先排序，暂不做筛选（PRD F4）。
 * TODO(M2): ProjectFilter 类型筛选 + 计数 + ≤200ms 列表过渡 + 空状态。
 */
export default function Projects() {
  const sorted = sortProjects(projects);

  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-20">
      <div className="mx-auto max-w-content px-6 py-16 md:py-24">
        <SectionHeading index="02" title="项目" id="projects-title" />
        {/* TODO(M2): 类型筛选 Tab（全部/智能体/零代码/AI 编辑器/命令行/其他） */}
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}