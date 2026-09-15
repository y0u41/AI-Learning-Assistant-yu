import type { Profile } from '../types';

/**
 * 个人信息数据（PRD §8 / Tech_Design §5 Profile）。
 * 维护方式：只改本文件即全站生效，禁止在组件中硬编码（AGENTS §7）。
 * TODO(M5): 头像仍为「宇」字标占位，替换真实照片时把图片放入 public/ 并改 avatar 字段即可；
 *           其余平台社交链接（掘金 / X / B 站等）待本人补充后追加到 socials 数组。
 */
export const profile: Profile = {
  name: '宇',
  tagline: '爱折腾的开发者：把想法快速做成能用的 Agent、低代码平台与 AI 工具',
  roles: ['Agent 开发', '低代码', '工具控'],
  avatar: 'avatar.svg', // 相对资源名；展示层用 import.meta.env.BASE_URL 拼接（兼容 Pages 子路径部署）
  aboutParagraphs: [
    '我是宇，一个爱折腾的人：喜欢把「重复劳动」变成「一键完成」。从 Agent 智能体、零代码平台，到 AI 代码编辑器和命令行工具，做的东西都围绕同一个目标——让好的想法更快落地。',
    '日常在 TypeScript 与 Python 之间切换，用 LangGraph 编排多智能体，用 React 与 Node.js 搭建产品原型；比起堆功能，我更在意交互是否顺手、维护是否省心。',
    '工作之外是重度工具控：终端、编辑器、快捷键、自动化脚本都有自己的一套。这里收录了我的代表性作品，欢迎按类型浏览，也欢迎通过邮件或 GitHub 联系我。',
  ],
  email: 'tmy040211@outlook.com',
  socials: [
    { platform: 'GitHub', url: 'https://github.com/y0u41', icon: 'github' },
  ],
};