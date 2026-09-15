/**
 * 作品数据（PRD §8 / Tech_Design §5）—— ★ 唯一需要经常修改的文件。M1 填充（每种类型 ≥ 1 条样例）。
 *
 * 新增作品流程（AGENTS §11.1）：素材放 public/projects/<id>/（转 WebP/AVIF）
 * → 本文件追加一条 Project 记录 → dev 验证 → 独立提交 `feat: 收录 <作品名>`。
 * 硬约束（AGENTS §6）：id 唯一、links ≥ 1、tagline ≤ 60 字、pinned ≤ 3、
 * 封面记录必须带 width/height（防 CLS）；禁止为单个项目写硬编码 JSX。
 */
export {};