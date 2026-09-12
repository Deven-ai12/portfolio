
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { scrollToId } from "../lib/scrollTo";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#about");

  const headerRef = useRef(null);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const logoGlowRef = useRef(null);
  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);
  const glowTween = useRef(null);

  /* --------------------------------
     NAVBAR ENTRANCE
  -------------------------------- */

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        {
          y: -30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.25,
          ease: "power4.out",
        }
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  /* --------------------------------
     SCROLL STATE
  -------------------------------- */

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;

      const scrolled = window.scrollY > 40;

      gsap.to(navRef.current, {
        backgroundColor: scrolled
          ? "rgba(9, 10, 11, 0.72)"
          : "rgba(9, 10, 11, 0)",
        backdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
        borderColor: scrolled
          ? "rgba(255,255,255,0.08)"
          : "rgba(255,255,255,0)",
        boxShadow: scrolled
          ? "0 10px 40px rgba(0,0,0,0.18)"
          : "0 0 0 rgba(0,0,0,0)",
        duration: 0.35,
        ease: "power2.out",
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* --------------------------------
     ACTIVE SECTION
  -------------------------------- */

  useEffect(() => {
    const sections = LINKS.map((link) =>
      document.querySelector(link.href)
    ).filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visible[0]) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  /* --------------------------------
     LOGO CURSOR PROXIMITY
  -------------------------------- */

  useEffect(() => {
    const logo = logoRef.current;
    const glow = logoGlowRef.current;

    if (!logo || !glow) return;

    const handleMove = (e) => {
      const rect = logo.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      const distance = Math.sqrt(dx * dx + dy * dy);

      const radius = 130;

      if (distance < radius) {
        const strength = 1 - distance / radius;

        const moveX =
          (e.clientX - centerX) * 0.12 * strength;

        const moveY =
          (e.clientY - centerY) * 0.12 * strength;

        gsap.to(logo, {
          x: moveX,
          y: moveY,
          scale: 1 + strength * 0.08,
          duration: 0.35,
          ease: "power3.out",
          overwrite: true,
        });

        gsap.to(glow, {
          opacity: 0.15 + strength * 0.8,
          scale: 0.8 + strength * 0.7,
          duration: 0.35,
          ease: "power3.out",
          overwrite: true,
        });
      } else {
        gsap.to(logo, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
          overwrite: true,
        });

        gsap.to(glow, {
          opacity: 0,
          scale: 0.7,
          duration: 0.45,
          ease: "power3.out",
          overwrite: true,
        });
      }
    };

    window.addEventListener("mousemove", handleMove);

    return () =>
      window.removeEventListener("mousemove", handleMove);
  }, []);

  /* --------------------------------
     LOGO HOVER
  -------------------------------- */

  const handleLogoEnter = () => {
    glowTween.current?.kill();

    gsap.to(logoRef.current, {
      scale: 1.12,
      rotate: -2,
      duration: 0.45,
      ease: "power3.out",
    });

    glowTween.current = gsap.to(logoGlowRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleLogoLeave = () => {
    gsap.to(logoRef.current, {
      scale: 1,
      rotate: 0,
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });

    gsap.to(logoGlowRef.current, {
      opacity: 0,
      scale: 0.7,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  /* --------------------------------
     MOBILE MENU
  -------------------------------- */

  useEffect(() => {
    if (!menuRef.current) return;

    if (open) {
      gsap.set(menuRef.current, {
        display: "block",
      });

      gsap.fromTo(
        menuRef.current,
        {
          height: 0,
          opacity: 0,
        },
        {
          height: "auto",
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        menuItemsRef.current,
        {
          y: 18,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.06,
          delay: 0.1,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(menuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(menuRef.current, {
            display: "none",
          });
        },
      });
    }
  }, [open]);

  /* --------------------------------
     NAV CLICK
  -------------------------------- */

  const go = (e, href) => {
    e.preventDefault();

    scrollToId(href);
    setActive(href);
    setOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-4 md:pt-5"
    >
      <nav
        ref={navRef}
        className="
          relative
          mx-auto
          max-w-6xl
          rounded-2xl
          border
          border-transparent
          px-4
          md:px-5
          py-3
          flex
          items-center
          justify-between
          transition-colors
        "
      >
        {/* --------------------------------
            LOGO
        -------------------------------- */}

        <a
          ref={logoRef}
          href="#top"
          onClick={(e) => go(e, "#top")}
          onMouseEnter={handleLogoEnter}
          onMouseLeave={handleLogoLeave}
          className="
            relative
            z-10
            flex
            items-center
            font-display
            text-lg
            tracking-tightest
            text-paper
            select-none
          "
        >
          {/* Glow */}
          <span
            ref={logoGlowRef}
            className="
              pointer-events-none
              absolute
              inset-[-14px]
              rounded-full
              bg-signal
              blur-2xl
              opacity-0
              scale-75
            "
          />

          {/* Logo */}
          <span className="relative">
            DM
            <span className="text-signal">.</span>
          </span>
        </a>

        {/* --------------------------------
            DESKTOP LINKS
        -------------------------------- */}

        <ul className="hidden md:flex items-center gap-1 rounded-xl border border-line/70 bg-ink/30 p-1">
          {LINKS.map((link) => {
            const isActive = active === link.href;

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => go(e, link.href)}
                  className="
                    group
                    relative
                    block
                    overflow-hidden
                    rounded-lg
                    px-4
                    py-2
                    font-mono
                    text-[12px]
                    transition-colors
                  "
                >
                  {/* Active background */}
                  <span
                    className={`
                      absolute
                      inset-0
                      rounded-lg
                      bg-panel
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
                      }
                    `}
                  />

                  {/* Bottom signal */}
                  <span
                    className={`
                      absolute
                      bottom-0
                      left-1/2
                      h-px
                      -translate-x-1/2
                      bg-signal
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "w-5"
                          : "w-0 group-hover:w-5"
                      }
                    `}
                  />

                  <span
                    className={`
                      relative z-10
                      transition-colors duration-300
                      ${
                        isActive
                          ? "text-paper"
                          : "text-fog group-hover:text-paper"
                      }
                    `}
                  >
                    {link.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* --------------------------------
            SAY HELLO
        -------------------------------- */}

        <a
          href="mailto:mankardevendra33@gmail.com"
          className="
            hidden
            md:inline-flex
            group
            relative
            overflow-hidden
            items-center
            gap-2
            rounded-lg
            border
            border-line
            px-4
            py-2
            text-sm
            text-paper
            transition-all
            duration-300
            hover:border-signal
          "
        >
          <span
            className="
              absolute
              inset-0
              -translate-x-full
              bg-signal/10
              transition-transform
              duration-500
              group-hover:translate-x-0
            "
          />

          <span className="relative z-10">
            Say hello
          </span>

          <span className="relative z-10 text-signal transition-transform duration-300 group-hover:translate-x-1">
            ↗
          </span>
        </a>

        {/* --------------------------------
            MOBILE BUTTON
        -------------------------------- */}

        <button
          onClick={() => setOpen((value) => !value)}
          className="
            md:hidden
            relative
            z-20
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            border
            border-line
            text-paper
          "
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`
                absolute
                left-0
                top-1
                h-px
                w-5
                bg-paper
                transition-all
                duration-300
                ${
                  open
                    ? "translate-y-[5px] rotate-45"
                    : ""
                }
              `}
            />

            <span
              className={`
                absolute
                left-0
                top-3
                h-px
                w-5
                bg-paper
                transition-all
                duration-300
                ${
                  open
                    ? "-translate-y-[3px] -rotate-45"
                    : ""
                }
              `}
            />
          </span>
        </button>
      </nav>

      {/* --------------------------------
          MOBILE MENU
      -------------------------------- */}

      <div
        ref={menuRef}
        className="
          mx-auto
          mt-2
          hidden
          max-w-6xl
          overflow-hidden
          rounded-2xl
          border
          border-line
          bg-ink/95
          backdrop-blur-xl
        "
      >
        <ul className="flex flex-col px-5 py-4">
          {LINKS.map((link, index) => {
            const isActive = active === link.href;

            return (
              <li
                key={link.href}
                ref={(element) => {
                  menuItemsRef.current[index] = element;
                }}
              >
                <a
                  href={link.href}
                  onClick={(e) => go(e, link.href)}
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    border-b
                    border-line/70
                    py-4
                    font-mono
                    text-sm
                  "
                >
                  <span
                    className={
                      isActive
                        ? "text-paper"
                        : "text-fog group-hover:text-paper"
                    }
                  >
                    {link.label}
                  </span>

                  <span className="text-signal opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    ↗
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}

