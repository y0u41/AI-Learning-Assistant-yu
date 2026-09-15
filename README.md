# yu 的作品集（yu-portfolio）

单页滚动的个人作品集静态站点（React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion）。

规划文档（位于上级目录）：[PRD.md](../PRD.md)（做什么）→ [Tech_Design.md](../Tech_Design.md)（怎么做）→ [AGENTS.md](../AGENTS.md)（红线）→ [Build.md](../Build.md)（进度）。

## 常用命令

```bash
npm install        # 安装依赖
npm run dev        # 本地开发（Vite）
npm run build      # 生产构建（产物 dist/）
npm run preview    # 本地预览构建产物
npm run lint       # ESLint 检查
npm run typecheck  # 类型检查（tsc -b）
npm run format     # Prettier 格式化
```

## 约定速览（AGENTS.md）

- **内容只住在 `src/data/`，样式只认 design tokens，颜色只有黑白**
- 新增作品只改 `src/data/projects.ts`（+ `public/projects/` 素材），禁止改组件
- 提交前必须通过 `lint` / `typecheck` / `build`；提交信息遵循 Conventional Commits（`<type>: <中文摘要>`）