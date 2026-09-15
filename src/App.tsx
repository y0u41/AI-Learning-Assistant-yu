import Header from './components/sections/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

/**
 * 组装全部分区；<main> 为全局语义容器（Tech_Design §6）。
 * M3：首元素为「跳到主要内容」skip link（仅聚焦时可见），键盘路径起点（Build.md §2.4）。
 */
export default function App() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:border focus:border-ink-border focus:bg-black/80 focus:px-4 focus:py-2 focus:text-sm focus:text-ink-primary"
      >
        跳到主要内容
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
