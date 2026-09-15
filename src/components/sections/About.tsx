import SectionHeading from '../ui/SectionHeading';
import Chip from '../ui/Chip';
import { profile } from '../../data/profile';
import { skills } from '../../data/skills';

/**
 * 关于我（M1）：介绍段落 + 技能分组 chips，内容全部来自 data 文件（PRD F3）。
 */
export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20">
      <div className="mx-auto max-w-content px-6 py-16 md:py-24">
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
      </div>
    </section>
  );
}