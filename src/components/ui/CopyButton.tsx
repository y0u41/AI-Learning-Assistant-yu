import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CopyButtonProps {
  /** 待复制文本（邮箱 / 安装命令） */
  text: string;
  /** 无障碍名称（图标按钮必须带 aria-label，AGENTS §4.7） */
  label: string;
}

/** 「已复制」反馈时长（Tech_Design §6：1.5s） */
const FEEDBACK_MS = 1500;

/**
 * 一键复制按钮（邮箱 / 安装命令，PRD US3/US4）：成功反馈「已复制」1.5s。
 * 剪贴板 API 不可用（非安全上下文）时静默降级，由 mailto / 手动复制兜底。
 */
export default function CopyButton({ text, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), FEEDBACK_MS);
    } catch {
      // 静默失败：非 https / localhost 环境无 clipboard API
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? '已复制' : label}
      title={copied ? '已复制' : label}
      className="inline-flex shrink-0 items-center gap-1 rounded-full border border-ink-border bg-white/5 px-3 py-1.5 font-mono text-xs text-ink-secondary transition-colors hover:text-ink-primary"
    >
      {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
      <span aria-live="polite">{copied ? '已复制' : ''}</span>
    </button>
  );
}