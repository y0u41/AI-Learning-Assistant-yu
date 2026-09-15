import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import Chip from '../ui/Chip';
import { profile } from '../../data/profile';
import { skills } from '../../data/skills';
import { sectionReveal } from '../../lib/motion';

/**
 * 关于我：介绍段落 + 技能分组 chips，内容全部来自 data 文件（PRD F3）。
 * 分区 reveal：whileInView 一次性（reduced 时禁用，AGENTS §5.4）。
 */
export default function About() {
  const reduced = useReducedMotion();

  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20">
      <motion.div
        className="mx-auto max-w-content px-6 py-16 md:py-24"
        initial={reduced ? false : 'hidden'}
        whileInView={reduced ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionReveal}
      >
        <SectionHeading index="01" title="关于我" id="about-title" />
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="space-y-4">
            {profile.aboutParagraphs.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-ink-secondary">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="space-y-6">
            {skills.map((group) => (
              <div key={group.group}>
                <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-tertiary">
                  {group.group}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Chip label={item} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}