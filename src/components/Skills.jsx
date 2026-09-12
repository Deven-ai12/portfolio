
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillGroups } from "../data/resumeData";

gsap.registerPlugin(ScrollTrigger);

const allSkills = skillGroups.flatMap((group) => group.items);

export default function Skills() {
  const sectionRef = useRef(null);
  const progressRef = useRef(null);
  const countRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* --------------------------------
         SECTION INTRO
      -------------------------------- */

      gsap.fromTo(
        ".skills-eyebrow",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".skills-title-line",
        {
          yPercent: 110,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".skills-description",
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            toggleActions: "play none none none",
          },
        }
      );

      /* --------------------------------
         PROGRESS LINE
      -------------------------------- */

      gsap.fromTo(
        progressRef.current,
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".skills-system",
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );

      /* --------------------------------
         SKILL GROUPS
      -------------------------------- */

      const groups = gsap.utils.toArray(".skill-group");

      groups.forEach((group, index) => {
        const number = group.querySelector(".skill-number");
        const title = group.querySelector(".skill-group-title");
        const line = group.querySelector(".skill-group-line");
        const items = group.querySelectorAll(".skill-item");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: group,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });

        tl.fromTo(
          group,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          }
        )
          .fromTo(
            number,
            {
              opacity: 0,
              x: -20,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.45"
          )
          .fromTo(
            title,
            {
              opacity: 0,
              x: -25,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power3.out",
            },
            "-=0.35"
          )
          .fromTo(
            line,
            {
              scaleX: 0,
            },
            {
              scaleX: 1,
              transformOrigin: "left center",
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.4"
          )
          .fromTo(
            items,
            {
              opacity: 0,
              y: 15,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.045,
              ease: "power2.out",
            },
            "-=0.3"
          );
      });

      /* --------------------------------
         COUNTER
      -------------------------------- */

      const counter = { value: 0 };

      gsap.to(counter, {
        value: allSkills.length,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".skills-system",
          start: "top 78%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.textContent = Math.round(counter.value);
          }
        },
      });

      /* --------------------------------
         SUBTLE PARALLAX
      -------------------------------- */

      gsap.to(".skills-side-label", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative z-10 overflow-hidden py-32 md:py-44"
    >
      {/* --------------------------------
          TOP CONTENT
      -------------------------------- */}

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          {/* Left */}
          <div className="md:col-span-7">
            <p className="skills-eyebrow mb-6 font-mono text-[11px] uppercase tracking-[0.25em] text-signal">
              03 / Capabilities
            </p>

            <div className="overflow-hidden">
              <h2 className="font-display text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.88] tracking-[-0.06em] text-paper">
                <span className="skills-title-line block">
                  WHAT I
                </span>

                <span className="skills-title-line block text-fog">
                  WORK WITH.
                </span>
              </h2>
            </div>
          </div>

          {/* Right */}
          <div className="md:col-span-5 flex flex-col justify-end">
            <p className="skills-description max-w-md text-[15px] md:text-base leading-7 text-fog">
              A practical stack built around Java backend development,
              modern frontend engineering, databases, APIs, security,
              and the tools required to turn an idea into a working product.
            </p>

            <div className="mt-10 flex items-end justify-between border-b border-line pb-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
                Current stack
              </span>

              <span className="font-mono text-3xl leading-none text-signal">
                <span ref={countRef}>0</span>
                <span className="ml-1 text-xs text-fog">
                  tools
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-16 h-px w-full bg-line overflow-hidden">
          <div
            ref={progressRef}
            className="h-full w-full origin-left bg-signal"
          />
        </div>
      </div>

      {/* --------------------------------
          MOVING TICKER
      -------------------------------- */}

      <div className="relative my-16 overflow-hidden border-y border-line py-5">
        <div className="skills-marquee flex w-max gap-12 whitespace-nowrap font-mono text-xs uppercase tracking-[0.18em] text-fog">
          {[...allSkills, ...allSkills].map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="flex items-center gap-12"
            >
              {skill}

              <span className="text-signal">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* --------------------------------
          SKILL SYSTEM
      -------------------------------- */}

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="skills-system relative">
          {/* Vertical label */}
          <div className="skills-side-label pointer-events-none absolute right-0 top-0 hidden lg:block">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-fog [writing-mode:vertical-rl]">
              Engineering stack / 2026
            </span>
          </div>

          <div className="max-w-5xl">
            {skillGroups.map((group, groupIndex) => (
              <div
                key={group.label}
                className="skill-group relative grid grid-cols-12 gap-5 border-b border-line py-12 md:py-16"
              >
                {/* Number */}
                <div className="col-span-2 md:col-span-1">
                  <span className="skill-number font-mono text-[10px] text-signal">
                    0{groupIndex + 1}
                  </span>
                </div>

                {/* Main */}
                <div className="col-span-10 md:col-span-11">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
                    <div>
                      <h3 className="skill-group-title font-display text-3xl md:text-5xl tracking-[-0.04em] text-paper">
                        {group.label}
                      </h3>
                    </div>

                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
                      {String(group.items.length).padStart(2, "0")} skills
                    </span>
                  </div>

                  {/* Line */}
                  <div className="skill-group-line mt-6 h-px w-full bg-line origin-left" />

                  {/* Skills */}
                  <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="skill-item group/item relative cursor-default"
                      >
                        <span className="relative inline-block font-mono text-sm text-fog transition-colors duration-300 group-hover/item:text-paper">
                          {item}

                          <span className="absolute -bottom-1 left-0 h-px w-0 bg-signal transition-all duration-300 group-hover/item:w-full" />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --------------------------------
          BOTTOM STATEMENT
      -------------------------------- */}

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mt-20 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="max-w-xl text-sm leading-6 text-fog">
            I focus on technologies I can actually build with —
            not a list of tools added just to make the stack look bigger.
          </p>

          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            Open to building
          </div>
        </div>
      </div>
    </section>
  );
}
