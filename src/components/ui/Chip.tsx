/**
 * 胶囊标签：技能 / 技术栈 / 身份标签 chips，等宽字体点缀（PRD F1/F3/F4）。
 * 样式只用 ink tokens 透明度层级，禁止引入彩色（AGENTS §5.1）。
 */
interface ChipProps {
  /** 标签文案 */
  label: string;
}

export default function Chip({ label }: ChipProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-ink-border bg-white/5 px-3 py-1 font-mono text-xs text-ink-secondary">
      {label}
    </span>
  );
}