
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "../data/resumeData";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const rootRef = useRef(null);
  const cardsRef = useRef([]);

  cardsRef.current = [];

  const setCardRef = (el, index) => {
    if (el) cardsRef.current[index] = el;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* --------------------------------
         HEADER ANIMATION
      -------------------------------- */
      gsap.from(".contact-index", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 82%",
        },
      });

      /* --------------------------------
         TITLE REVEAL
      -------------------------------- */
      gsap.from(".contact-title-line", {
        opacity: 0,
        y: 45,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
        },
      });

      /* --------------------------------
         DESCRIPTION
      -------------------------------- */
      gsap.from(".contact-description", {
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-description",
          start: "top 88%",
        },
      });

      /* --------------------------------
         CONTACT CARDS
      -------------------------------- */
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 45,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-grid",
          start: "top 88%",
        },
      });

      /* --------------------------------
         SCAN LINE
      -------------------------------- */
      gsap.fromTo(
        ".contact-scan-line",
        {
          scaleX: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-scan-line",
            start: "top 90%",
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  /* --------------------------------
     CARD HOVER
  -------------------------------- */
  useEffect(() => {
    const cleanups = [];

    cardsRef.current.forEach((card) => {
      if (!card) return;

      const glow = card.querySelector(".contact-card-glow");
      const arrow = card.querySelector(".contact-arrow");

      const onMove = (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (glow) {
          glow.style.left = `${x}px`;
          glow.style.top = `${y}px`;
          glow.style.opacity = "1";
        }
      };

      const onEnter = () => {
        gsap.to(card, {
          y: -5,
          duration: 0.35,
          ease: "power3.out",
        });

        if (arrow) {
          gsap.to(arrow, {
            x: 4,
            y: -4,
            duration: 0.3,
            ease: "power3.out",
          });
        }
      };

      const onLeave = () => {
        gsap.to(card, {
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        });

        if (glow) {
          gsap.to(glow, {
            opacity: 0,
            duration: 0.3,
          });
        }

        if (arrow) {
          gsap.to(arrow, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "power3.out",
          });
        }
      };

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);

      cleanups.push(() => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <section
      id="contact"
      ref={rootRef}
      className="relative z-10 border-t border-line bg-ink px-6 py-28 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* --------------------------------
            HEADER
        -------------------------------- */}
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">

          {/* LEFT */}
          <div className="md:col-span-5">

            <div className="contact-index mb-8 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
              <span className="text-signal">05</span>
              <span>/</span>
              <span>Contact</span>
              <span>/</span>
              <span>Let's talk</span>
            </div>

            <h2 className="font-display text-5xl leading-[0.9] tracking-tightest text-paper md:text-7xl">
              <span className="contact-title-line block">
                Start
              </span>

              <span className="contact-title-line block text-fog">
                a conversation.
              </span>
            </h2>

            {/* STATUS */}
            <div className="mt-10 flex items-center gap-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>

              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
                Available for opportunities
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="md:col-span-7 md:pt-12">

            <h3 className="max-w-3xl font-display text-3xl leading-[1.1] tracking-tight text-paper md:text-5xl">
              <span className="contact-title-line block">
                Let's build something
              </span>

              <span className="contact-title-line block text-signal">
                that holds up under
              </span>

              <span className="contact-title-line block">
                real traffic.
              </span>
            </h3>

            <p className="contact-description mt-7 max-w-xl text-sm leading-relaxed text-fog md:text-base">
              Open to full-stack Java roles and freelance builds.
              If you have a product, technical challenge, or idea
              worth building, let's talk.
            </p>
          </div>
        </div>

        {/* --------------------------------
            DIVIDER
        -------------------------------- */}
        <div className="relative mt-20 h-px bg-line">
          <div className="contact-scan-line absolute left-0 top-0 h-px w-32 bg-signal shadow-[0_0_18px_rgba(215,255,63,0.65)]" />
        </div>

        {/* --------------------------------
            PRIMARY EMAIL CTA
        -------------------------------- */}
        <a
          href={`mailto:${profile.email}`}
          className="group relative mt-10 block overflow-hidden border border-line bg-panel p-7 transition-all duration-500 hover:border-signal/50 md:p-10"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-signal/[0.045] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <div>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
                Start here
              </p>

              <p className="font-display text-2xl tracking-tight text-paper md:text-4xl">
                Send me an email.
              </p>

              <p className="mt-3 break-all text-sm text-fog">
                {profile.email}
              </p>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-line transition-all duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-ink">
              <span className="contact-arrow text-lg">
                ↗
              </span>
            </div>
          </div>

          {/* Bottom animation */}
          <div className="absolute bottom-0 left-0 h-px w-0 bg-signal transition-all duration-700 ease-out group-hover:w-full" />
        </a>

        {/* --------------------------------
            OTHER CONTACT OPTIONS
        -------------------------------- */}
        <div className="contact-grid mt-3 grid gap-px bg-line md:grid-cols-3">

          {/* PHONE */}
          <a
            ref={(el) => setCardRef(el, 0)}
            href={`tel:${profile.phone}`}
            className="group relative overflow-hidden bg-ink p-7 transition-colors duration-500 hover:bg-panel md:p-8"
          >
            <div className="contact-card-glow pointer-events-none absolute h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(215,255,63,0.10),transparent_70%)] opacity-0 blur-xl" />

            <div className="relative z-10">

              <div className="mb-12 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
                  Phone
                </span>

                <span className="contact-arrow text-fog transition-colors group-hover:text-signal">
                  ↗
                </span>
              </div>

              <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.15em] text-fog">
                Direct line
              </p>

              <p className="text-sm text-paper md:text-base">
                {profile.phone}
              </p>
            </div>

            <div className="absolute bottom-0 left-0 h-px w-0 bg-signal transition-all duration-500 group-hover:w-full" />
          </a>

          {/* LINKEDIN */}
          <a
            ref={(el) => setCardRef(el, 1)}
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden bg-ink p-7 transition-colors duration-500 hover:bg-panel md:p-8"
          >
            <div className="contact-card-glow pointer-events-none absolute h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(215,255,63,0.10),transparent_70%)] opacity-0 blur-xl" />

            <div className="relative z-10">

              <div className="mb-12 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
                  LinkedIn
                </span>

                <span className="contact-arrow text-fog transition-colors group-hover:text-signal">
                  ↗
                </span>
              </div>

              <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.15em] text-fog">
                Professional
              </p>

              <p className="text-sm text-paper md:text-base">
                Devendra Mankar
              </p>
            </div>

            <div className="absolute bottom-0 left-0 h-px w-0 bg-signal transition-all duration-500 group-hover:w-full" />
          </a>

          {/* GITHUB */}
          <a
            ref={(el) => setCardRef(el, 2)}
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden bg-ink p-7 transition-colors duration-500 hover:bg-panel md:p-8"
          >
            <div className="contact-card-glow pointer-events-none absolute h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(215,255,63,0.10),transparent_70%)] opacity-0 blur-xl" />

            <div className="relative z-10">

              <div className="mb-12 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
                  GitHub
                </span>

                <span className="contact-arrow text-fog transition-colors group-hover:text-signal">
                  ↗
                </span>
              </div>

              <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.15em] text-fog">
                Source code
              </p>

              <p className="text-sm text-paper md:text-base">
                github.com/Deven-ai12
              </p>
            </div>

            <div className="absolute bottom-0 left-0 h-px w-0 bg-signal transition-all duration-500 group-hover:w-full" />
          </a>
        </div>

        {/* --------------------------------
            FOOTER META
        -------------------------------- */}
        <div className="mt-12 grid gap-6 border-t border-line pt-6 font-mono text-[9px] uppercase tracking-[0.18em] text-fog sm:grid-cols-3">

          <div>
            <span className="text-signal">Location</span>
            <br />
            {profile.location}
          </div>

          <div>
            <span className="text-signal">Focus</span>
            <br />
            Java / Spring / React
          </div>

          <div className="sm:text-right">
            <span className="text-signal">Status</span>
            <br />
            Open to opportunities
          </div>

        </div>
      </div>
    </section>
  );
}

