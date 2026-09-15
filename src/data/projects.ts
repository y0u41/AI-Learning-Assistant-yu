import type { Project } from '../types';

/**
 * 作品数据（PRD §8 / Tech_Design §5）—— ★ 唯一需要经常修改的文件。
 *
 * ⚠️ 当前状态（M5 收尾 / Build.md §2.6）：**作品尚未完成**，以下 5 条为**预留示例条目**，
 * 用于演示 5 种作品类型、筛选 Tab 计数与卡片各交互（含 install 复制胶囊）。
 * 所有外链统一指向 `RESERVED_ENTRY`（本设备预留接入端口），既不会指向他人账号，
 * 也不存在失效地址（AGENTS §6 硬约束：links ≥ 1）。
 *
 * 作品落地流程（AGENTS §11.1）：素材放 public/projects/<id>/ → 本文件改写或追加一条
 * Project 记录（links 换成该作品真实地址）→ dev 验证 → 独立提交 `feat: 收录 <作品名>`。
 * 禁止为单个项目写硬编码 JSX。
 * 硬约束（AGENTS §6）：id 唯一、links ≥ 1、tagline ≤ 60 字、pinned ≤ 3、封面必须带 width/height。
 */

/**
 * 本设备预留接入端口（Build.md §2.6：「作品未完成，预留接入端口，接入端口设置为本设备」）。
 *
 * 作品落地前，各预留条目的外链统一指向本机（本开发/验收设备）的预留接入位；
 * 端口取自本机预览服务器 `npm run preview`（Vite 会把 http://localhost:4173/ 自动
 * 重定向到 base 子路径，已实测 200）。
 * 作品上线后：把该条目的 links 换成真实业务地址，本常量即可整段删除，其余代码无需改动。
 */
const RESERVED_ENTRY = 'http://localhost:4173/';

export const projects: Project[] = [
  {
    id: 'resume-agent',
    name: '简历评估 Agent',
    type: 'agent',
    tagline: '多智能体协作的简历诊断与改写助手',
    techStack: ['LangGraph', 'GLM', 'FastAPI'],
    links: [
      { kind: 'demo', url: RESERVED_ENTRY },
      { kind: 'repo', url: RESERVED_ENTRY },
      { kind: 'article', url: RESERVED_ENTRY },
    ],
    cover: {
      type: 'image',
      // 相对资源名；展示层用 import.meta.env.BASE_URL 拼接（兼容 Pages 子路径部署）
      src: 'projects/resume-agent.svg',
      alt: '简历评估 Agent 对话界面截图（M1 占位）',
      width: 800,
      height: 500,
    },
    date: '2026-08',
    pinned: true,
  },
  {
    id: 'flow-lowcode',
    name: 'Flow 零代码平台',
    type: 'lowcode',
    tagline: '拖拽式流程编排的企业级零代码应用搭建平台',
    techStack: ['React', 'NestJS', 'PostgreSQL'],
    links: [
      { kind: 'demo', url: RESERVED_ENTRY },
      { kind: 'repo', url: RESERVED_ENTRY },
    ],
    date: '2026-05',
    pinned: true,
  },
  {
    id: 'pack-cli',
    name: 'pack',
    type: 'cli',
    tagline: '一键打包并发布多平台产物的命令行工具',
    techStack: ['Node.js', 'TypeScript', 'esbuild'],
    links: [
      { kind: 'install', url: RESERVED_ENTRY, command: 'npm i -g @y0u41/pack' },
      { kind: 'repo', url: RESERVED_ENTRY },
    ],
    date: '2026-06',
  },
  {
    id: 'y0u41-editor',
    name: 'y0u41 Editor',
    type: 'editor',
    tagline: '内置 AI 助手、补全与重构建议的轻量代码编辑器',
    techStack: ['Electron', 'TypeScript', 'Monaco'],
    links: [
      { kind: 'repo', url: RESERVED_ENTRY },
      { kind: 'download', url: RESERVED_ENTRY },
    ],
    date: '2026-03',
  },
  {
    id: 'y0u41-dotfiles',
    name: 'y0u41 dotfiles',
    type: 'other',
    tagline: '个人开发环境配置与自动化脚本合集',
    techStack: ['Shell', 'Neovim'],
    links: [{ kind: 'repo', url: RESERVED_ENTRY }],
    date: '2026-01',
  },
];