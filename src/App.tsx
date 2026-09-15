import Header from './components/sections/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

/**
 * 组装全部分区；<main> 为全局语义容器（Tech_Design §6）。
 * TODO(M2): 分区 reveal 动效经 src/lib/motion.ts 统一 variants 接入。
 */
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
