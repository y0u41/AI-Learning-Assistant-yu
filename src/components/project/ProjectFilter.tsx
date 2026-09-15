import { PROJECT_TYPE_LABEL } from '../../types';
import type { ProjectType } from '../../types';

/** 筛选值：'all' + 全部作品类型 */
export type FilterValue = ProjectType | 'all';

/** Tab 顺序（PRD F4.2：全部 / 智能体 / 零代码 / AI 编辑器 / 命令行 / 其他） */
const TABS: FilterValue[] = ['all', 'agent', 'lowcode', 'editor', 'cli', 'other'];

interface ProjectFilterProps {
  active: FilterValue;
  /** 各筛选值数量（'all' 为总数）；计数为 0 的类型不渲染 */
  counts: Record<FilterValue, number>;
  onChange: (value: FilterValue) => void;
}

/**
 * 类型筛选 Tab（PRD F4.2）：含计数、隐藏空类型；切换即时生效（useState，不引状态库）。
 */
export default function ProjectFilter({ active, counts, onChange }: ProjectFilterProps) {
  const visibleTabs = TABS.filter((tab) => tab === 'all' || counts[tab] > 0);

  return (
    <div aria-label="按类型筛选项目" className="mb-8 flex flex-wrap gap-2" role="group">
      {visibleTabs.map((tab) => {
        const isActive = active === tab;
        return (
          <button
            key={tab}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(tab)}
            className={[
              'rounded-full border px-4 py-1.5 text-sm transition-colors',
              isActive
                ? 'border-white/25 bg-white/10 text-ink-primary'
                : 'border-ink-border text-ink-secondary hover:text-ink-primary',
            ].join(' ')}
          >
            {tab === 'all' ? '全部' : PROJECT_TYPE_LABEL[tab]}
            <span className="ml-1.5 font-mono text-xs text-ink-tertiary">{counts[tab]}</span>
          </button>
        );
      })}
    </div>
  );
}