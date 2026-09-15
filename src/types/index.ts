/**
 * 全站类型定义（Tech_Design §5）—— 数据层契约。M1 落地。
 *
 * TODO(M1): 定义 ProjectType / LinkKind / ProjectLink / ProjectMedia / Project /
 * SkillGroup / SocialLink / Profile，并集中导出 PROJECT_TYPE_LABEL 中文映射
 * （新增作品类型时枚举与映射必须同步改，AGENTS §6.3）。
 * 数据约束（AGENTS §6）：id 唯一、links ≥ 1、tagline ≤ 60 字、pinned ≤ 3。
 * 注意：每个接口与字段必须有中文注释说明用途（AGENTS §4.3）。
 */
export {};