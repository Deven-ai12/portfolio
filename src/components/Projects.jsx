import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/resumeData";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);

  const cardRefs = useRef([]);
  const wrapperRefs = useRef([]);
  const tiltRefs = useRef([]);
  const glowRefs = useRef([]);
  const numberRefs = useRef([]);

  /* --------------------------------
     REF SETTERS
  -------------------------------- */

  const setCardRef = (el, i) => {
    if (el) cardRefs.current[i] = el;
  };

  const setWrapperRef = (el, i) => {
    if (el) wrapperRefs.current[i] = el;
  };

  const setTiltRef = (el, i) => {
    if (el) tiltRefs.current[i] = el;
  };

  const setGlowRef = (el, i) => {
    if (el) glowRefs.current[i] = el;
  };

  const setNumberRef = (el, i) => {
    if (el) numberRefs.current[i] = el;
  };

  /* --------------------------------
     PROJECT SCROLL ANIMATION

     Each project has its own animation.

     Scroll down:
     Project 01 appears
     ↓
     Project 02 appears
     ↓
     Project 03 appears
     ↓
     Project 04 appears
  -------------------------------- */

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        const wrapper = wrapperRefs.current[i];

        if (!card || !wrapper) return;

        /* --------------------------------
           MAIN CARD ENTRANCE
        -------------------------------- */

        gsap.fromTo(
          card,
          {
            y: 90,
            opacity: 0,
            scale: 0.96,
            filter: "blur(8px)",
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );

        /* --------------------------------
           CONTENT REVEAL
        -------------------------------- */

        const content = card.querySelectorAll(".project-reveal");

        if (content.length) {
          gsap.fromTo(
            content,
            {
              y: 25,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: wrapper,
                start: "top 76%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        /* --------------------------------
           PROJECT NUMBER REVEAL
        -------------------------------- */

        const number = numberRefs.current[i];

        if (number) {
          gsap.fromTo(
            number,
            {
              opacity: 0,
              x: 40,
              scale: 0.9,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: wrapper,
                start: "top 78%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      /* --------------------------------
         REFRESH SCROLLTRIGGER

         Makes sure positions are correct
         after all projects are rendered.
      -------------------------------- */

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  /* --------------------------------
     PREMIUM HOVER INTERACTION

     - 3D tilt
     - Cursor spotlight
     - Project number movement
     - Subtle scale
  -------------------------------- */

  useEffect(() => {
    const cleanups = [];

    tiltRefs.current.forEach((el, i) => {
      if (!el) return;

      const glow = glowRefs.current[i];
      const number = numberRefs.current[i];

      gsap.set(el, {
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      });

      const rotateX = gsap.quickTo(el, "rotationX", {
        duration: 0.45,
        ease: "power3.out",
      });

      const rotateY = gsap.quickTo(el, "rotationY", {
        duration: 0.45,
        ease: "power3.out",
      });

      const scale = gsap.quickTo(el, "scale", {
        duration: 0.45,
        ease: "power3.out",
      });

      const moveGlowX = glow
        ? gsap.quickTo(glow, "x", {
            duration: 0.35,
            ease: "power3.out",
          })
        : null;

      const moveGlowY = glow
        ? gsap.quickTo(glow, "y", {
            duration: 0.35,
            ease: "power3.out",
          })
        : null;

      /* --------------------------------
         MOUSE MOVE
      -------------------------------- */

      const onMove = (e) => {
        const rect = el.getBoundingClientRect();

        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;

        const rotateAmount = 5;

        /* 3D rotation */

        rotateX((0.5 - py) * rotateAmount);
        rotateY((px - 0.5) * rotateAmount);

        scale(1.018);

        /* Cursor spotlight */

        if (glow) {
          const x = px * rect.width - rect.width / 2;
          const y = py * rect.height - rect.height / 2;

          moveGlowX?.(x);
          moveGlowY?.(y);

          glow.style.opacity = "1";
        }

        /* Project number movement */

        if (number) {
          gsap.to(number, {
            x: (px - 0.5) * 18,
            y: (py - 0.5) * 18,
            duration: 0.5,
            ease: "power3.out",
            overwrite: true,
          });
        }
      };

      /* --------------------------------
         MOUSE ENTER
      -------------------------------- */

      const onEnter = () => {
        if (glow) {
          gsap.to(glow, {
            opacity: 1,
            scale: 1.15,
            duration: 0.5,
            ease: "power3.out",
          });
        }

        if (number) {
          gsap.to(number, {
            color: "#d7ff3f",
            scale: 1.08,
            duration: 0.4,
            ease: "power3.out",
          });
        }
      };

      /* --------------------------------
         MOUSE LEAVE
      -------------------------------- */

      const onLeave = () => {
        rotateX(0);
        rotateY(0);
        scale(1);

        if (glow) {
          gsap.to(glow, {
            opacity: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
          });
        }

        if (number) {
          gsap.to(number, {
            x: 0,
            y: 0,
            color: "rgba(255,255,255,0.18)",
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
          });
        }
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);

      cleanups.push(() => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="
        relative
        z-10
        overflow-hidden
        border-t
        border-line
        bg-ink
        px-6
        py-28
        md:px-10
        md:py-36
      "
    >
      {/* --------------------------------
          BACKGROUND
      -------------------------------- */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            left-1/2
            top-[10%]
            -translate-x-1/2
            whitespace-nowrap
            font-display
            text-[22vw]
            font-bold
            tracking-[-0.08em]
            text-white/[0.025]
          "
        >
          WORK
        </div>

        <div
          className="
            absolute
            left-[20%]
            top-[20%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-signal/[0.035]
            blur-[140px]
          "
        />
      </div>

      <div className="relative mx-auto max-w-[1400px]">

        {/* --------------------------------
            HEADER
        -------------------------------- */}

        <div className="mb-20 grid gap-8 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">

            <div
              className="
                mb-7
                flex
                items-center
                gap-4
                font-mono
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-fog
              "
            >
              <span className="text-signal">
                04
              </span>

              <span>/</span>

              <span>Projects</span>

              <span>/</span>

              <span>Selected work</span>
            </div>

            <h2
              className="
                font-display
                text-5xl
                leading-[0.9]
                tracking-tightest
                text-paper
                md:text-7xl
              "
            >
              Selected
              <br />

              <span className="text-fog">
                work.
              </span>
            </h2>

            <div className="mt-10 flex items-center gap-4">
              <div className="h-16 w-px bg-line" />

              <div
                className="
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-[0.18em]
                  text-fog
                "
              >
                <span className="block text-signal">
                  Full-stack
                </span>

                <span className="mt-1 block">
                  Java / React
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-end md:col-span-7">

            <p
              className="
                max-w-2xl
                font-display
                text-3xl
                leading-[1.15]
                tracking-tight
                text-paper
                md:text-5xl
              "
            >
              Software built to be{" "}
              <span className="text-signal">
                useful, secure
              </span>{" "}
              and scalable.
            </p>

            <p
              className="
                mt-7
                max-w-xl
                text-sm
                leading-relaxed
                text-fog
                md:text-base
              "
            >
              A selection of applications and systems
              I've built across the stack — from secure
              Spring Boot APIs to modern React interfaces.
            </p>
          </div>
        </div>

        {/* --------------------------------
            SCAN LINE
        -------------------------------- */}

        <div
          className="
            relative
            mb-12
            h-px
            overflow-hidden
            bg-line
          "
        >
          <div
            className="
              absolute
              left-0
              top-0
              h-full
              w-32
              bg-signal
              shadow-[0_0_20px_rgba(215,255,63,0.6)]
            "
          />
        </div>

        {/* --------------------------------
            PROJECT LIST

            IMPORTANT:
            No listRef here.
        -------------------------------- */}

        <div className="relative">

          {projects.map((project, i) => {
            const isLast = i === projects.length - 1;

            return (
              <div
                key={project.id}
                ref={(el) => setWrapperRef(el, i)}
                className={`
                  relative
                  flex
                  items-center
                  ${
                    isLast
                      ? "min-h-[80vh]"
                      : "min-h-[100vh] md:min-h-[110vh]"
                  }
                `}
                style={{
                  zIndex: i + 1,
                }}
              >

                {/* --------------------------------
                    PROJECT CARD
                -------------------------------- */}

                <article
                  ref={(el) => setCardRef(el, i)}
                  className="
                    w-full
                    will-change-transform
                  "
                >

                  <div
                    ref={(el) => setTiltRef(el, i)}
                    className="
                      group
                      relative
                      overflow-hidden
                      border
                      border-line
                      bg-panel
                      p-7
                      shadow-[0_30px_100px_-40px_rgba(0,0,0,0.9)]
                      transition-[border-color,box-shadow]
                      duration-500
                      hover:border-signal/50
                      hover:shadow-[0_40px_120px_-45px_rgba(215,255,63,0.18)]
                      md:p-10
                      lg:p-12
                    "
                  >

                    {/* --------------------------------
                        SPOTLIGHT
                    -------------------------------- */}

                    <div
                      ref={(el) => setGlowRef(el, i)}
                      className="
                        pointer-events-none
                        absolute
                        left-0
                        top-0
                        h-[420px]
                        w-[420px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-[radial-gradient(circle,rgba(215,255,63,0.13)_0%,rgba(215,255,63,0.04)_35%,transparent_70%)]
                        opacity-0
                        blur-[2px]
                      "
                    />

                    {/* --------------------------------
                        TOP LINE
                    -------------------------------- */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        left-0
                        top-0
                        h-px
                        w-0
                        bg-signal
                        transition-all
                        duration-700
                        ease-out
                        group-hover:w-full
                      "
                    />

                    {/* --------------------------------
                        PROJECT NUMBER
                    -------------------------------- */}

                    <div
                      ref={(el) => setNumberRef(el, i)}
                      className="
                        absolute
                        right-7
                        top-5
                        font-display
                        text-[100px]
                        font-bold
                        leading-none
                        tracking-[-0.08em]
                        text-white/[0.055]
                        transition-colors
                        duration-500
                        md:right-10
                        md:top-7
                        md:text-[150px]
                      "
                    >
                      0{i + 1}
                    </div>

                    {/* --------------------------------
                        PROJECT CONTENT
                    -------------------------------- */}

                    <div
                      className="
                        relative
                        grid
                        gap-10
                        md:grid-cols-12
                        md:gap-12
                      "
                    >

                      {/* --------------------------------
                          LEFT CONTENT
                      -------------------------------- */}

                      <div className="md:col-span-5">

                        {/* TAGLINE */}

                        <div
                          className="
                            project-reveal
                            mb-5
                            flex
                            items-center
                            gap-3
                            font-mono
                            text-[10px]
                            uppercase
                            tracking-[0.18em]
                          "
                        >
                          <span className="text-signal">
                            {project.tagline}
                          </span>

                          <span className="h-px w-8 bg-line" />

                          <span className="text-fog">
                            Project / 0{i + 1}
                          </span>
                        </div>

                        {/* PROJECT NAME */}

                        <h3
                          className="
                            project-reveal
                            font-display
                            text-4xl
                            leading-[0.95]
                            tracking-tightest
                            text-paper
                            transition-transform
                            duration-500
                            ease-out
                            group-hover:-translate-y-1
                            md:text-5xl
                            lg:text-6xl
                          "
                        >
                          {project.name}
                        </h3>

                        {/* DESCRIPTION */}

                        <p
                          className="
                            project-reveal
                            mt-7
                            max-w-md
                            text-sm
                            leading-relaxed
                            text-fog
                            md:text-[15px]
                          "
                        >
                          {project.description}
                        </p>

                        {/* PROJECT LINK */}

                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="
                              project-reveal
                              group/link
                              mt-8
                              inline-flex
                              items-center
                              gap-3
                              border-b
                              border-line
                              pb-2
                              font-mono
                              text-[11px]
                              uppercase
                              tracking-[0.15em]
                              text-signal
                              transition-colors
                              hover:border-signal
                            "
                          >
                            <span>
                              {project.linkLabel}
                            </span>

                            <span
                              className="
                                inline-block
                                transition-transform
                                duration-300
                                group-hover/link:translate-x-1
                              "
                            >
                              ↗
                            </span>
                          </a>
                        )}

                      </div>

                      {/* --------------------------------
                          RIGHT CONTENT
                      -------------------------------- */}

                      <div
                        className="
                          relative
                          md:col-span-7
                          md:border-l
                          md:border-line
                          md:pl-10
                        "
                      >

                        {/* HIGHLIGHTS */}

                        <div className="project-reveal">

                          <p
                            className="
                              mb-5
                              font-mono
                              text-[10px]
                              uppercase
                              tracking-[0.2em]
                              text-fog
                            "
                          >
                            Highlights
                          </p>

                          <ul className="space-y-4">

                            {project.highlights.map((h) => (
                              <li
                                key={h}
                                className="
                                  group/item
                                  flex
                                  gap-4
                                  text-sm
                                  leading-relaxed
                                  text-paper/90
                                "
                              >

                                <span
                                  className="
                                    mt-[7px]
                                    h-1.5
                                    w-1.5
                                    shrink-0
                                    rounded-full
                                    bg-signal
                                    transition-transform
                                    duration-300
                                    group-hover/item:scale-150
                                  "
                                />

                                <span
                                  className="
                                    transition-transform
                                    duration-300
                                    group-hover/item:translate-x-1
                                  "
                                >
                                  {h}
                                </span>

                              </li>
                            ))}

                          </ul>
                        </div>

                        {/* --------------------------------
                            STACK
                        -------------------------------- */}

                        <div
                          className="
                            project-reveal
                            mt-10
                            border-t
                            border-line
                            pt-7
                          "
                        >

                          <p
                            className="
                              mb-4
                              font-mono
                              text-[10px]
                              uppercase
                              tracking-[0.2em]
                              text-fog
                            "
                          >
                            Stack
                          </p>

                          <div className="flex flex-wrap gap-2">

                            {project.stack.map((s) => (
                              <span
                                key={s}
                                className="
                                  border
                                  border-line
                                  px-3
                                  py-1.5
                                  font-mono
                                  text-[10px]
                                  text-fog
                                  transition-all
                                  duration-300
                                  hover:border-signal/50
                                  hover:bg-signal/[0.04]
                                  hover:text-signal
                                "
                              >
                                {s}
                              </span>
                            ))}

                          </div>
                        </div>

                      </div>
                    </div>

                    {/* --------------------------------
                        CARD FOOTER
                    -------------------------------- */}

                    <div
                      className="
                        project-reveal
                        relative
                        mt-10
                        flex
                        items-center
                        justify-between
                        border-t
                        border-line
                        pt-5
                        font-mono
                        text-[9px]
                        uppercase
                        tracking-[0.2em]
                        text-fog
                      "
                    >

                      <span>
                        Full-stack application
                      </span>

                      <span>
                        0{i + 1} /{" "}
                        {String(projects.length).padStart(2, "0")}
                      </span>

                    </div>

                  </div>
                </article>
              </div>
            );
          })}

        </div>

        {/* --------------------------------
            BOTTOM META
        -------------------------------- */}

        <div
          className="
            mt-10
            grid
            grid-cols-2
            border-t
            border-line
            pt-6
            font-mono
            text-[10px]
            uppercase
            tracking-[0.18em]
            text-fog
            md:grid-cols-4
          "
        >

          <div>
            <span className="block text-signal">
              Backend
            </span>
            Java / Spring
          </div>

          <div>
            <span className="block text-signal">
              Frontend
            </span>
            React / Tailwind
          </div>

          <div>
            <span className="block text-signal">
              Database
            </span>
            MySQL
          </div>

          <div>
            <span className="block text-signal">
              Focus
            </span>
            Production
          </div>

        </div>

      </div>
    </section>
  );
}