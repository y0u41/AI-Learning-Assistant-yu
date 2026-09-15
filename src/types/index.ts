/**
 * 全站类型定义（Tech_Design §5）—— 数据层契约。
 * 数据硬约束（AGENTS §6）：id 唯一、links ≥ 1、tagline ≤ 60 字、pinned ≤ 3。
 */

/** 项目类型：对应项目区筛选 Tab。新增类型时必须同步更新 PROJECT_TYPE_LABEL（AGENTS §6.3） */
export type ProjectType = 'agent' | 'lowcode' | 'editor' | 'cli' | 'other';

/** 链接类型：决定卡片链接组中每个链接的图标与交互 */
export type LinkKind = 'repo' | 'demo' | 'article' | 'download' | 'install';

/** 项目链接：卡片链接组的最小单元 */
export interface ProjectLink {
  kind: LinkKind;
  /** 显示名，缺省按 kind 从 LINK_KIND_LABEL 推导（如「仓库」「在线体验」） */
  label?: string;
  /** 跳转地址；kind === 'install' 时指向安装/使用文档 */
  url: string;
  /** 待复制命令，仅 kind === 'install' 时使用（如 npm i -g @y0u41/pack） */
  command?: string;
}

/** 项目多媒体：封面用 image（必带尺寸防 CLS），附加演示用 gif/video/asciinema */
export type ProjectMedia =
  | { type: 'image'; src: string; alt: string; width: number; height: number }
  | { type: 'gif' | 'video' | 'asciinema'; src: string; poster?: string; alt?: string };

/** 作品单元：新增作品 = 向 src/data/projects.ts 追加一条合法记录（AGENTS §6/§11.1） */
export interface Project {
  /** 稳定唯一标识，用作 React key（禁止数组下标，AGENTS §4.5） */
  id: string;
  /** 作品名称（必填） */
  name: string;
  /** 作品类型（必填），决定筛选 Tab 与卡片徽标文案 */
  type: ProjectType;
  /** 一句话简介（≤ 60 字），卡片展示 */
  tagline: string;
  /** 补充亮点，V2 详情弹层使用，V1 可选 */
  highlights?: string[];
  /** 技术栈，卡片 chips 展示（最多 4 个 + N） */
  techStack: string[];
  /** 链接组，≥ 1 个；第一个为主链接（整卡点击目标） */
  links: ProjectLink[];
  /** 封面（16:10 优先）；缺省渲染类型专属玻璃占位图形 */
  cover?: ProjectMedia;
  /** 附加多媒体（懒加载，按需展示，禁止自动拉取大文件） */
  media?: ProjectMedia[];
  /** 发布年月 'YYYY-MM'，用于列表排序 */
  date?: string;
  /** 置顶代表作（全站 ≤ 3 个） */
  pinned?: boolean;
}

/** 技能分组：About 区按组渲染 chips */
export interface SkillGroup {
  /** 分组名，如「语言」「AI 与 Agent」「工具链」 */
  group: string;
  /** 组内技能项 */
  items: string[];
}

/** 社交链接：Contact 区渲染 */
export interface SocialLink {
  /** 平台名，用于 aria-label 与缺省按钮文案 */
  platform: string;
  /** 主页地址（外链必须新标签打开 + noopener noreferrer，AGENTS §4.6） */
  url: string;
  /** lucide 图标名；缺省渲染通用外链图标 */
  icon: string;
}

/** 个人信息：Hero / About / Contact 的唯一内容来源 */
export interface Profile {
  /** 姓名 / 品牌名 */
  name: string;
  /** 首屏一句话简介（≤ 40 字） */
  tagline: string;
  /** 身份标签 chips */
  roles: string[];
  /** 头像图片地址（方形裁切为圆形展示） */
  avatar: string;
  /** 关于我的介绍段落（2–4 段） */
  aboutParagraphs: string[];
  /** 联系邮箱（一键复制 + mailto 兜底） */
  email: string;
  /** 社交链接列表 */
  socials: SocialLink[];
}

/** 类型中文名映射（UI 展示用，集中定义避免散落硬编码；与 ProjectType 必须同步维护） */
export const PROJECT_TYPE_LABEL: Record<ProjectType, string> = {
  agent: '智能体',
  lowcode: '零代码平台',
  editor: 'AI 代码编辑器',
  cli: '命令行工具',
  other: '其他',
};

/** 链接类型默认显示名（链接 label 缺省时按 kind 推导） */
export const LINK_KIND_LABEL: Record<LinkKind, string> = {
  repo: '仓库',
  demo: '在线体验',
  article: '文章',
  download: '下载',
  install: '安装命令',
};