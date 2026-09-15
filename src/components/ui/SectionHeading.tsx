/**
 * 分区标题：等宽编号（01.）+ 标题 + 分隔线（Tech_Design §6）。
 * id 挂在 <h2> 上，供所属分区 aria-labelledby 关联（PRD §7 可访问性）。
 */
interface SectionHeadingProps {
  /** 等宽编号，如 '01' */
  index: string;
  /** 分区标题文案 */
  title: string;
  /** 标题元素 id（分区 aria-labelledby 引用） */
  id: string;
}

export default function SectionHeading({ index, title, id }: SectionHeadingProps) {
  return (
    <div className="mb-10 flex items-center gap-4 md:mb-12">
      <span aria-hidden="true" className="font-mono text-sm text-ink-tertiary">
        {index}.
      </span>
      <h2 id={id} className="text-2xl font-semibold text-ink-primary md:text-3xl">
        {title}
      </h2>
      <span aria-hidden="true" className="h-px flex-1 bg-ink-border" />
    </div>
  );
}