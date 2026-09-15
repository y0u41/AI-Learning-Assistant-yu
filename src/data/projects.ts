import type { Project } from '../types';

/**
 * 作品数据（PRD §8 / Tech_Design §5）—— ★ 唯一需要经常修改的文件。
 * 每种作品类型各 ≥ 1 条样例，兼作数据契约演示（M1 占位内容，M5 上线前替换真实素材）。
 *
 * 新增作品流程（AGENTS §11.1）：素材放 public/projects/<id>/ → 本文件追加一条 Project 记录
 * → dev 验证 → 独立提交 `feat: 收录 <作品名>`。禁止为单个项目写硬编码 JSX。
 * 硬约束（AGENTS §6）：id 唯一、links ≥ 1、tagline ≤ 60 字、pinned ≤ 3、封面必须带 width/height。
 */
export const projects: Project[] = [
  {
    id: 'resume-agent',
    name: '简历评估 Agent',
    type: 'agent',
    tagline: '多智能体协作的简历诊断与改写助手',
    techStack: ['LangGraph', 'GLM', 'FastAPI'],
    links: [
      { kind: 'demo', url: 'https://example.com/demo/resume-agent' },
      { kind: 'repo', url: 'https://github.com/yu/resume-agent' },
      { kind: 'article', url: 'https://example.com/post/resume-agent' },
    ],
    cover: {
      type: 'image',
      src: '/projects/resume-agent.svg',
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
      { kind: 'demo', url: 'https://example.com/demo/flow' },
      { kind: 'repo', url: 'https://github.com/yu/flow' },
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
      { kind: 'install', url: 'https://github.com/yu/pack#readme', command: 'npm i -g @yu/pack' },
      { kind: 'repo', url: 'https://github.com/yu/pack' },
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
      { kind: 'repo', url: 'https://github.com/yu/yu-editor' },
      { kind: 'download', url: 'https://example.com/download/yu-editor' },
    ],
    date: '2026-03',
  },
  {
    id: 'yu-dotfiles',
    name: 'yu dotfiles',
    type: 'other',
    tagline: '个人开发环境配置与自动化脚本合集',
    techStack: ['Shell', 'Neovim'],
    links: [{ kind: 'repo', url: 'https://github.com/yu/dotfiles' }],
    date: '2026-01',
  },
];