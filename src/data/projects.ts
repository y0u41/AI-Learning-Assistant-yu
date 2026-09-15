import type { Project } from '../types';

/**
 * 作品数据（PRD §8 / Tech_Design §5）—— ★ 唯一需要经常修改的文件。
 *
 * ⚠️ 当前状态（M5）：以下 5 条为**示例条目**，用于演示 5 种作品类型、筛选 Tab 计数
 * 与卡片各交互（含 install 复制胶囊），作品本身并非真实成果。所有链接统一指向
 * 本人 GitHub 主页，避免出现指向他人账号的外链或失效地址（AGENTS §6 硬约束：links ≥ 1）。
 * TODO(M5)：替换为真实作品——封面放 public/projects/<id>/ → 本文件按 SOP 逐条改写/追加。
 *
 * 新增作品流程（AGENTS §11.1）：素材放 public/projects/<id>/ → 本文件追加一条 Project 记录
 * → dev 验证 → 独立提交 `feat: 收录 <作品名>`。禁止为单个项目写硬编码 JSX。
 * 硬约束（AGENTS §6）：id 唯一、links ≥ 1、tagline ≤ 60 字、pinned ≤ 3、封面必须带 width/height。
 */
/** 示例条目统一外链目标：本人 GitHub 主页（真实可达） */
const PROFILE_URL = 'https://github.com/y0u41';

export const projects: Project[] = [
  {
    id: 'resume-agent',
    name: '简历评估 Agent',
    type: 'agent',
    tagline: '多智能体协作的简历诊断与改写助手',
    techStack: ['LangGraph', 'GLM', 'FastAPI'],
    links: [
      { kind: 'demo', url: PROFILE_URL },
      { kind: 'repo', url: PROFILE_URL },
      { kind: 'article', url: PROFILE_URL },
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
      { kind: 'demo', url: PROFILE_URL },
      { kind: 'repo', url: PROFILE_URL },
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
      { kind: 'install', url: PROFILE_URL, command: 'npm i -g @y0u41/pack' },
      { kind: 'repo', url: PROFILE_URL },
    ],
    date: '2026-06',
  },
  {
    id: 'yu-editor',
    name: 'yu Editor',
    type: 'editor',
    tagline: '内置 AI 助手、补全与重构建议的轻量代码编辑器',
    techStack: ['Electron', 'TypeScript', 'Monaco'],
    links: [
      { kind: 'repo', url: PROFILE_URL },
      { kind: 'download', url: PROFILE_URL },
    ],
    date: '2026-03',
  },
  {
    id: 'yu-dotfiles',
    name: 'yu dotfiles',
    type: 'other',
    tagline: '个人开发环境配置与自动化脚本合集',
    techStack: ['Shell', 'Neovim'],
    links: [{ kind: 'repo', url: PROFILE_URL }],
    date: '2026-01',
  },
];