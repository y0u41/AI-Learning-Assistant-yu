/**
 * M0 占位页：仅验证 design tokens 生效（Build.md §2.1 验收：空白黑底 #0A0A0A）。
 * TODO(M1): 在此组装 Header / Hero / About / Projects / Contact / Footer 六个分区，
 * 并以 <main> 作为语义容器（Tech_Design §6）。
 */
export default function App() {
  return (
    <div className="min-h-screen bg-ink-bg font-display text-ink-primary">
      {/* M1 起填充分区内容 */}
    </div>
  );
}
