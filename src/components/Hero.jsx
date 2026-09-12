
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { profile } from "../data/resumeData";
import { scrollToId } from "../lib/scrollTo";

export default function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      // Initial state
      gsap.set(".hero-word-inner", {
        yPercent: 120,
        rotateX: 25,
        opacity: 0,
      });

      gsap.set(".hero-eyebrow", {
        y: 20,
        opacity: 0,
      });

      gsap.set(".hero-subtitle", {
        y: 25,
        opacity: 0,
      });

      gsap.set(".hero-description", {
        y: 25,
        opacity: 0,
      });

      gsap.set(".hero-cta", {
        y: 20,
        opacity: 0,
      });

      gsap.set(".hero-scroll-cue", {
        opacity: 0,
      });

      gsap.set(".hero-orb", {
        scale: 0,
        opacity: 0,
      });

      // Main entrance
      tl.to(".hero-orb", {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
      })
        .to(
          ".hero-eyebrow",
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
          },
          "-=1"
        )
        .to(
          ".hero-word-inner",
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.12,
          },
          "-=0.35"
        )
        .to(
          ".hero-subtitle",
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
          },
          "-=0.55"
        )
        .to(
          ".hero-description",
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
          },
          "-=0.45"
        )
        .to(
          ".hero-cta",
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.4"
        )
        .to(
          ".hero-scroll-cue",
          {
            opacity: 1,
            duration: 0.8,
          },
          "-=0.2"
        );

      // Floating orb animation
      gsap.to(".hero-orb", {
        x: 30,
        y: -25,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Scroll cue animation
      gsap.to(".scroll-line", {
        scaleX: 0.35,
        transformOrigin: "left center",
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });

      // Mouse parallax
      const handleMouseMove = (e) => {
        const { innerWidth, innerHeight } = window;

        const x = (e.clientX / innerWidth - 0.5) * 2;
        const y = (e.clientY / innerHeight - 0.5) * 2;

        gsap.to(".hero-orb", {
          x: x * 45,
          y: y * 30,
          duration: 1.2,
          ease: "power3.out",
        });

        gsap.to(".hero-content", {
          x: x * 5,
          y: y * 3,
          duration: 1.4,
          ease: "power3.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative z-10 min-h-[100svh] overflow-hidden flex items-center px-6 md:px-10"
    >
      {/* Background glow */}
      <div
        className="
          hero-orb
          pointer-events-none
          absolute
          right-[5%]
          top-[15%]
          w-[320px]
          h-[320px]
          md:w-[520px]
          md:h-[520px]
          rounded-full
          bg-signal/10
          blur-[100px]
        "
      />

      {/* Secondary glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-[-10%]
          bottom-[-20%]
          w-[350px]
          h-[350px]
          rounded-full
          bg-signal/5
          blur-[100px]
        "
      />

      {/* Subtle grid */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
          bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
          bg-[size:80px_80px]
        "
      />

      <div className="hero-content relative mx-auto max-w-7xl w-full">

        {/* Eyebrow */}
        <div className="hero-eyebrow flex items-center gap-3 mb-8">
          <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />

          <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.22em] text-fog">
            {profile.location}
          </p>

          <span className="w-12 h-px bg-line" />

          <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.18em] text-signal">
            Available for opportunities
          </p>
        </div>

        {/* Main heading */}
        <h1
          className="
            font-display
            font-medium
            tracking-[-0.07em]
            text-paper
            leading-[0.82]
            text-[17vw]
            sm:text-[15vw]
            md:text-[10vw]
            lg:text-[9.5rem]
            xl:text-[10.5rem]
            max-w-[1200px]
          "
          style={{ perspective: "1000px" }}
        >
          <span className="block overflow-hidden">
            <span className="hero-word-inner block origin-bottom">
              Devendra
            </span>
          </span>

          <span className="block overflow-hidden">
            <span className="hero-word-inner block origin-bottom text-fog">
              Mankar<span className="text-signal">.</span>
            </span>
          </span>
        </h1>

        {/* Role */}
        <div className="hero-subtitle mt-8 flex items-center gap-4">
          <span className="font-mono text-signal text-sm md:text-base">
            01
          </span>

          <span className="h-px w-8 bg-signal/40" />

          <p className="font-mono text-signal text-base md:text-xl">
            {profile.role}
          </p>
        </div>

        {/* Description */}
        <p
          className="
            hero-description
            text-fog
            max-w-xl
            mt-5
            text-sm
            md:text-base
            leading-relaxed
          "
        >
          {profile.summary}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 mt-9">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("#projects");
            }}
            className="
              hero-cta
              group
              relative
              overflow-hidden
              bg-signal
              text-ink
              px-7
              py-3.5
              text-sm
              font-medium
              transition-transform
              duration-300
              hover:-translate-y-1
            "
          >
            <span className="relative z-10">View work</span>

            <span
              className="
                absolute
                inset-0
                translate-y-full
                bg-white
                transition-transform
                duration-300
                group-hover:translate-y-0
              "
            />
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("#contact");
            }}
            className="
              hero-cta
              group
              flex
              items-center
              gap-3
              border
              border-line
              px-7
              py-3.5
              text-sm
              text-paper
              transition-all
              duration-300
              hover:border-signal
              hover:text-signal
              hover:-translate-y-1
            "
          >
            Get in touch

            <span
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              →
            </span>
          </a>
        </div>

        {/* Bottom metadata */}
        <div className="mt-16 md:mt-20 flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
            Java · Spring Boot · React · SQL
          </div>

          <div className="hidden md:block h-px w-16 bg-line" />

          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
            Pune, India
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="
          hero-scroll-cue
          absolute
          bottom-8
          left-6
          md:left-10
          flex
          items-center
          gap-3
          font-mono
          text-[10px]
          uppercase
          tracking-[0.2em]
          text-fog
        "
      >
        <span className="scroll-line block w-10 h-px bg-line" />
        Scroll
      </div>

      {/* Page index */}
      <div
        className="
          absolute
          right-6
          md:right-10
          bottom-8
          font-mono
          text-[10px]
          tracking-[0.2em]
          text-fog
        "
      >
        001 / 006
      </div>
    </section>
  );
}

