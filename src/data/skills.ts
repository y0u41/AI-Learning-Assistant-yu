import type { SkillGroup } from '../types';

/**
 * 技能分组数据（PRD F3）：About 区按分组渲染为 chips。
 * 维护方式：只改本文件即生效（AGENTS §7）。
 */
export const skills: SkillGroup[] = [
  { group: '语言', items: ['TypeScript', 'Python', 'SQL'] },
  { group: '框架', items: ['React', 'Node.js', 'FastAPI', 'Electron'] },
  { group: 'AI 与 Agent', items: ['LangGraph', 'RAG', 'Function Calling', 'Prompt 工程'] },
  { group: '工具链', items: ['Vite', 'esbuild', 'Git', 'Docker'] },
];