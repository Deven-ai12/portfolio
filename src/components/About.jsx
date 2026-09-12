import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education } from "../data/resumeData";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_TEXT =
  "I work across the stack — building Spring Boot services and secured REST APIs on the backend, React interfaces on the front, and data models designed for reliability.";

const HIGHLIGHTS = [
  "Spring Boot",
  "REST APIs",
  "React",
  "reliability",
];

export default function About() {
  const rootRef = useRef(null);
  const statementRef = useRef(null);
  const magneticRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const statement = statementRef.current;
    const magnetic = magneticRef.current;

    if (!root || !statement) return;

    const ctx = gsap.context(() => {
      // =====================================================
      // INITIAL SECTION REVEAL
      // =====================================================

      gsap.from(".about-index", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
        },
      });

      // =====================================================
      // TITLE REVEAL
      // =====================================================

      gsap.from(".about-title-line", {
        yPercent: 110,
        opacity: 0,
        rotate: 2,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".about-title",
          start: "top 82%",
        },
      });

      // =====================================================
      // WORD REVEAL
      // =====================================================

      gsap.fromTo(
        ".about-word",
        {
          opacity: 0.12,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.025,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statement,
            start: "top 78%",
            end: "bottom 48%",
            scrub: 0.7,
          },
        }
      );

      // =====================================================
      // HIGHLIGHT WORDS
      // =====================================================

      gsap.fromTo(
        ".about-highlight",
        {
          opacity: 0.2,
          filter: "blur(4px)",
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.5,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statement,
            start: "top 70%",
          },
        }
      );

      // =====================================================
      // DETAILS
      // =====================================================

      gsap.from(".about-card", {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-cards",
          start: "top 82%",
        },
      });

      // =====================================================
      // LARGE BACKGROUND WORD
      // =====================================================

      gsap.to(".about-bg-text", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // =====================================================
      // SCAN LINE
      // =====================================================

      gsap.fromTo(
        ".about-scan",
        {
          scaleX: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
          },
        }
      );

      // =====================================================
      // TECHNICAL METADATA
      // =====================================================

      gsap.from(".about-meta-item", {
        y: 15,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-meta",
          start: "top 90%",
        },
      });
    }, root);

    // =======================================================
    // MAGNETIC ABOUT TITLE
    // =======================================================

    const handleMouseMove = (event) => {
      if (!magnetic) return;

      const rect = magnetic.getBoundingClientRect();

      const x =
        event.clientX -
        (rect.left + rect.width / 2);

      const y =
        event.clientY -
        (rect.top + rect.height / 2);

      gsap.to(magnetic, {
        x: Math.max(-12, Math.min(12, x * 0.08)),
        y: Math.max(-8, Math.min(8, y * 0.08)),
        rotateY: Math.max(-4, Math.min(4, x * 0.025)),
        rotateX: Math.max(-3, Math.min(3, -y * 0.025)),
        duration: 0.45,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const handleMouseLeave = () => {
      if (!magnetic) return;

      gsap.to(magnetic, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)",
      });
    };

    if (magnetic) {
      magnetic.addEventListener(
        "mousemove",
        handleMouseMove
      );

      magnetic.addEventListener(
        "mouseleave",
        handleMouseLeave
      );
    }

    return () => {
      magnetic?.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      magnetic?.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      ctx.revert();
    };
  }, []);

  // =========================================================
  // SPLIT TEXT
  // =========================================================

  const words = ABOUT_TEXT.split(" ");

  return (
    <section
      id="about"
      ref={rootRef}
      className="
        relative
        z-10
        overflow-hidden
        border-t
        border-white/10
        bg-[#090a0b]
        px-5
        py-32
        md:px-10
        md:py-44
      "
    >
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div
        aria-hidden="true"
        className="
          about-bg-text
          pointer-events-none
          absolute
          -right-[8vw]
          top-20
          select-none
          font-display
          text-[28vw]
          font-semibold
          leading-none
          tracking-[-0.08em]
          text-white/[0.025]
          md:text-[22vw]
        "
      >
        ABOUT
      </div>

      {/* Background glow */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-180px]
          top-[30%]
          h-[450px]
          w-[450px]
          rounded-full
          bg-lime/[0.045]
          blur-[140px]
        "
      />

      {/* ===================================================
          CONTAINER
      =================================================== */}

      <div className="relative mx-auto max-w-[1400px]">

        {/* =================================================
            TOP META
        ================================================= */}

        <div
          className="
            about-index
            mb-20
            flex
            items-center
            justify-between
            border-b
            border-white/10
            pb-5
            font-mono
            text-[9px]
            uppercase
            tracking-[0.25em]
            text-white/35
            md:mb-28
          "
        >
          <div className="flex items-center gap-4">
            <span className="text-lime">
              02
            </span>

            <span>
              About / Profile
            </span>
          </div>

          <span className="hidden md:block">
            Full-stack / Java / React
          </span>

          <span>
            2026
          </span>
        </div>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">

          {/* ===============================================
              LEFT LABEL
          =============================================== */}

          <div className="lg:col-span-3">

            <div className="sticky top-32">

              <div
                ref={magneticRef}
                className="
                  inline-block
                  transform-gpu
                  cursor-default
                "
                style={{
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
              >
                <div
                  className="
                    about-title
                    overflow-hidden
                    font-display
                    text-5xl
                    font-semibold
                    tracking-[-0.06em]
                    text-white
                    md:text-6xl
                  "
                >
                  <span className="about-title-line block">
                    About
                  </span>
                  <span className="about-title-line block text-lime">
                    me.
                  </span>
                </div>
              </div>

              <div
                className="
                  mt-8
                  hidden
                  max-w-[180px]
                  font-mono
                  text-[10px]
                  uppercase
                  leading-5
                  tracking-[0.18em]
                  text-white/30
                  lg:block
                "
              >
                Building software with
                equal attention to
                architecture and
                interface.
              </div>

              {/* Vertical indicator */}

              <div className="mt-12 hidden items-center gap-3 lg:flex">
                <span className="h-12 w-px bg-white/10" />

                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/25">
                  Profile
                </span>
              </div>
            </div>
          </div>

          {/* ===============================================
              RIGHT CONTENT
          =============================================== */}

          <div className="lg:col-span-9">

            {/* =============================================
                BIG STATEMENT
            ============================================= */}

            <div
              ref={statementRef}
              className="
                max-w-5xl
                font-display
                text-[clamp(2rem,4.3vw,4.5rem)]
                font-medium
                leading-[1.05]
                tracking-[-0.055em]
                text-white
              "
            >
              {words.map((word, index) => {
                const cleanWord = word.replace(
                  /[.,—]/g,
                  ""
                );

                const isHighlight =
                  HIGHLIGHTS.includes(cleanWord);

                return (
                  <span
                    key={`${word}-${index}`}
                    className={
                      isHighlight
                        ? "about-word about-highlight mr-[0.28em] inline-block text-lime"
                        : "about-word mr-[0.28em] inline-block"
                    }
                  >
                    {word}
                  </span>
                );
              })}
            </div>

            {/* =============================================
                SCAN LINE
            ============================================= */}

            <div className="mt-14 overflow-hidden">
              <div
                className="
                  about-scan
                  h-px
                  w-full
                  bg-lime/60
                "
              />
            </div>

            {/* =============================================
                SECONDARY COPY
            ============================================= */}

            <div
              className="
                mt-8
                grid
                gap-8
                md:grid-cols-2
              "
            >
              <p
                className="
                  max-w-md
                  text-sm
                  leading-7
                  text-white/40
                  md:text-base
                "
              >
                I care about the part users
                don't see — authentication,
                data flow, API design,
                database structure and the
                decisions that keep software
                maintainable.
              </p>

              <p
                className="
                  max-w-md
                  text-sm
                  leading-7
                  text-white/40
                  md:text-base
                "
              >
                My goal is simple: build
                products that feel clean on
                the surface and remain solid
                underneath.
              </p>
            </div>

            {/* =============================================
                DETAILS
            ============================================= */}

            <div
              className="
                about-cards
                mt-20
                grid
                gap-px
                overflow-hidden
                border
                border-white/10
                bg-white/10
                sm:grid-cols-2
              "
            >

              {/* EDUCATION */}

              <div
                className="
                  about-card
                  bg-[#090a0b]
                  p-7
                  md:p-9
                "
              >
                <div className="mb-10 flex items-center justify-between">
                  <span
                    className="
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.2em]
                      text-white/30
                    "
                  >
                    Education
                  </span>

                  <span
                    className="
                      font-mono
                      text-[9px]
                      text-lime
                    "
                  >
                    01
                  </span>
                </div>

                <h3
                  className="
                    max-w-md
                    text-lg
                    font-medium
                    leading-snug
                    text-white
                  "
                >
                  {education.degree}
                </h3>

                <p
                  className="
                    mt-3
                    text-sm
                    text-white/40
                  "
                >
                  {education.school}
                </p>

                <div
                  className="
                    mt-8
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.18em]
                    text-white/25
                  "
                >
                  {education.period}
                </div>
              </div>

              {/* COURSEWORK */}

              <div
                className="
                  about-card
                  bg-[#090a0b]
                  p-7
                  md:p-9
                "
              >
                <div className="mb-10 flex items-center justify-between">
                  <span
                    className="
                      font-mono
                      text-[9px]
                      uppercase
                      tracking-[0.2em]
                      text-white/30
                    "
                  >
                    Coursework
                  </span>

                  <span
                    className="
                      font-mono
                      text-[9px]
                      text-lime
                    "
                  >
                    02
                  </span>
                </div>

                <ul className="space-y-3">
                  {education.coursework.map(
                    (course, index) => (
                      <li
                        key={course}
                        className="
                          flex
                          items-center
                          gap-4
                          border-b
                          border-white/[0.06]
                          pb-3
                          text-sm
                          text-white/65
                        "
                      >
                        <span className="font-mono text-[9px] text-lime">
                          0{index + 1}
                        </span>

                        <span>
                          {course}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* =============================================
                TECH META
            ============================================= */}

            <div
              className="
                about-meta
                mt-10
                grid
                grid-cols-2
                gap-6
                border-t
                border-white/10
                pt-6
                font-mono
                text-[9px]
                uppercase
                tracking-[0.18em]
                text-white/25
                sm:grid-cols-4
              "
            >
              <div className="about-meta-item">
                <span className="block text-white/15">
                  Stack
                </span>
                <span className="mt-2 block text-white/40">
                  Java
                </span>
              </div>

              <div className="about-meta-item">
                <span className="block text-white/15">
                  Backend
                </span>
                <span className="mt-2 block text-white/40">
                  Spring Boot
                </span>
              </div>

              <div className="about-meta-item">
                <span className="block text-white/15">
                  Frontend
                </span>
                <span className="mt-2 block text-white/40">
                  React
                </span>
              </div>

              <div className="about-meta-item">
                <span className="block text-white/15">
                  Database
                </span>
                <span className="mt-2 block text-white/40">
                  MySQL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}