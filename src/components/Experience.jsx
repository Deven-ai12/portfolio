
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "../data/resumeData";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    const ctx = gsap.context(() => {
      // =====================================================
      // SECTION INDEX
      // =====================================================

      gsap.from(".experience-index", {
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

      gsap.from(".experience-title-line", {
        yPercent: 110,
        opacity: 0,
        rotate: 2,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".experience-title",
          start: "top 82%",
        },
      });

      // =====================================================
      // INTRO COPY
      // =====================================================

      gsap.from(".experience-intro", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".experience-intro",
          start: "top 85%",
        },
      });

      // =====================================================
      // EXPERIENCE CARDS
      // =====================================================

      gsap.from(".experience-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".experience-list",
          start: "top 78%",
        },
      });

      // =====================================================
      // CARD CONTENT
      // =====================================================

      gsap.from(".experience-card-number", {
        x: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".experience-list",
          start: "top 75%",
        },
      });

      // =====================================================
      // BACKGROUND WORD
      // =====================================================

      gsap.to(".experience-bg-text", {
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
        ".experience-scan",
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
            start: "top 72%",
          },
        }
      );

      // =====================================================
      // META
      // =====================================================

      gsap.from(".experience-meta-item", {
        y: 15,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".experience-meta",
          start: "top 90%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  // =========================================================
  // MAGNETIC CARD INTERACTION
  // =========================================================

  const handleMouseMove = (event, element) => {
    if (!element) return;

    const rect = element.getBoundingClientRect();

    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);

    gsap.to(element, {
      x: Math.max(-5, Math.min(5, x * 0.015)),
      y: Math.max(-5, Math.min(5, y * 0.015)),
      duration: 0.45,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const handleMouseLeave = (element) => {
    if (!element) return;

    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <section
      id="experience"
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
          experience-bg-text
          pointer-events-none
          absolute
          -left-[10vw]
          top-20
          select-none
          font-display
          text-[27vw]
          font-semibold
          leading-none
          tracking-[-0.08em]
          text-white/[0.025]
          md:text-[21vw]
        "
      >
        WORK
      </div>

      {/* Glow */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-180px]
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
            experience-index
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
              03
            </span>

            <span>
              Experience / Work
            </span>
          </div>

          <span className="hidden md:block">
            Engineering / Development
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
              LEFT TITLE
          =============================================== */}

          <div className="lg:col-span-3">
            <div className="sticky top-32">

              <div
                className="
                  experience-title
                  overflow-hidden
                  font-display
                  text-5xl
                  font-semibold
                  tracking-[-0.06em]
                  text-white
                  md:text-6xl
                "
              >
                <span className="experience-title-line block">
                  Selected
                </span>

                <span className="experience-title-line block text-lime">
                  experience.
                </span>
              </div>

              <div
                className="
                  experience-intro
                  mt-8
                  hidden
                  max-w-[190px]
                  font-mono
                  text-[10px]
                  uppercase
                  leading-5
                  tracking-[0.18em]
                  text-white/30
                  lg:block
                "
              >
                A record of the
                systems, products
                and technologies
                I've worked with.
              </div>

              {/* Vertical indicator */}

              <div className="mt-12 hidden items-center gap-3 lg:flex">
                <span className="h-12 w-px bg-white/10" />

                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/25">
                  Career
                </span>
              </div>
            </div>
          </div>

          {/* ===============================================
              RIGHT CONTENT
          =============================================== */}

          <div className="lg:col-span-9">

            {/* Intro statement */}

            <div
              className="
                max-w-4xl
                font-display
                text-[clamp(2rem,4vw,4.2rem)]
                font-medium
                leading-[1.05]
                tracking-[-0.055em]
                text-white
              "
            >
              Building software from
              <span className="text-lime">
                {" "}backend systems
              </span>{" "}
              to
              <span className="text-white/45">
                {" "}user-facing interfaces.
              </span>
            </div>

            {/* Scan line */}

            <div className="mt-14 overflow-hidden">
              <div
                className="
                  experience-scan
                  h-px
                  w-full
                  bg-lime/60
                "
              />
            </div>

            {/* =================================================
                EXPERIENCE LIST
            ================================================= */}

            <div className="experience-list mt-16 space-y-4">

              {experience.map((job, index) => (
                <div
                  key={`${job.role}-${index}`}
                  className="
                    experience-card
                    group
                    relative
                    overflow-hidden
                    border
                    border-white/10
                    bg-[#090a0b]
                    transition-colors
                    duration-500
                    hover:border-lime/30
                  "
                  onMouseMove={(event) =>
                    handleMouseMove(
                      event,
                      event.currentTarget
                    )
                  }
                  onMouseLeave={(event) =>
                    handleMouseLeave(
                      event.currentTarget
                    )
                  }
                  style={{
                    willChange: "transform",
                  }}
                >

                  {/* Hover glow */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-lime/[0.025]
                      opacity-0
                      transition-opacity
                      duration-500
                      group-hover:opacity-100
                    "
                  />

                  {/* Top line */}

                  <div
                    className="
                      absolute
                      left-0
                      top-0
                      h-px
                      w-0
                      bg-lime
                      transition-all
                      duration-700
                      group-hover:w-full
                    "
                  />

                  <div
                    className="
                      relative
                      grid
                      gap-10
                      p-7
                      md:grid-cols-12
                      md:p-10
                    "
                  >

                    {/* =====================================
                        NUMBER + DATE
                    ===================================== */}

                    <div className="md:col-span-3">

                      <div className="flex items-center gap-4">
                        <span
                          className="
                            experience-card-number
                            font-mono
                            text-[10px]
                            text-lime
                          "
                        >
                          0{index + 1}
                        </span>

                        <span className="h-px w-8 bg-white/10" />
                      </div>

                      <div className="mt-8">

                        <p
                          className="
                            font-mono
                            text-[10px]
                            uppercase
                            tracking-[0.16em]
                            text-white/55
                          "
                        >
                          {job.period}
                        </p>

                        <p
                          className="
                            mt-2
                            text-sm
                            text-white/30
                          "
                        >
                          {job.duration}
                        </p>
                      </div>
                    </div>

                    {/* =====================================
                        ROLE + COMPANY
                    ===================================== */}

                    <div className="md:col-span-9">

                      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">

                        <div>

                          <h3
                            className="
                              font-display
                              text-2xl
                              font-medium
                              tracking-[-0.04em]
                              text-white
                              transition-colors
                              duration-300
                              group-hover:text-lime
                              md:text-3xl
                            "
                          >
                            {job.role}
                          </h3>

                          <p
                            className="
                              mt-2
                              text-sm
                              text-white/40
                            "
                          >
                            {job.org}
                          </p>

                        </div>

                        <span
                          className="
                            mt-2
                            hidden
                            font-mono
                            text-[9px]
                            uppercase
                            tracking-[0.18em]
                            text-white/20
                            transition-colors
                            duration-300
                            group-hover:text-lime/60
                            md:block
                          "
                        >
                          View role →
                        </span>
                      </div>

                      {/* Points */}

                      <ul className="mt-8 space-y-4">

                        {job.points.map(
                          (point, pointIndex) => (
                            <li
                              key={point}
                              className="
                                flex
                                gap-4
                                text-sm
                                leading-7
                                text-white/50
                                md:text-[15px]
                              "
                            >

                              <span
                                className="
                                  mt-[10px]
                                  h-1
                                  w-1
                                  flex-none
                                  rounded-full
                                  bg-lime/60
                                "
                              />

                              <span>
                                {point}
                              </span>
                            </li>
                          )
                        )}

                      </ul>

                    </div>
                  </div>
                </div>
              ))}

            </div>

            {/* =================================================
                BOTTOM META
            ================================================= */}

            <div
              className="
                experience-meta
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

              <div className="experience-meta-item">
                <span className="block text-white/15">
                  Focus
                </span>

                <span className="mt-2 block text-white/40">
                  Full-stack
                </span>
              </div>

              <div className="experience-meta-item">
                <span className="block text-white/15">
                  Backend
                </span>

                <span className="mt-2 block text-white/40">
                  Java / Spring
                </span>
              </div>

              <div className="experience-meta-item">
                <span className="block text-white/15">
                  Frontend
                </span>

                <span className="mt-2 block text-white/40">
                  React
                </span>
              </div>

              <div className="experience-meta-item">
                <span className="block text-white/15">
                  Data
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

