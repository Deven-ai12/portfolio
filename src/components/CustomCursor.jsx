import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const TRAIL_COUNT = 8;
const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, textarea";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRefs = useRef([]);
  const [enabled, setEnabled] = useState(false);

  // -------------------------------------------------------
  // DEVICE CHECK
  // -------------------------------------------------------

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    const update = () => {
      setEnabled(mediaQuery.matches);
    };

    update();

    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  // -------------------------------------------------------
  // CURSOR ANIMATION
  // -------------------------------------------------------

  useEffect(() => {
    if (!enabled) return;

    const cursor = cursorRef.current;
    const dots = dotRefs.current;

    if (!cursor || dots.length !== TRAIL_COUNT) return;

    document.body.classList.add("custom-cursor-active");

    // -----------------------------------------------------
    // INITIAL POSITIONS
    // -----------------------------------------------------

    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const positions = Array.from(
      { length: TRAIL_COUNT },
      () => ({
        x: mouse.x,
        y: mouse.y,
      })
    );

    // Center each dot around its coordinate.
    gsap.set([cursor, ...dots], {
      xPercent: -50,
      yPercent: -50,
    });

    // -----------------------------------------------------
    // MOUSE
    // -----------------------------------------------------

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    // -----------------------------------------------------
    // RAF LOOP
    // -----------------------------------------------------

    let animationFrame;

    const animate = () => {
      // Main cursor follows the real mouse.
      positions[0].x +=
        (mouse.x - positions[0].x) * 0.45;

      positions[0].y +=
        (mouse.y - positions[0].y) * 0.45;

      gsap.set(cursor, {
        x: positions[0].x,
        y: positions[0].y,
      });

      // ---------------------------------------------------
      // EACH DOT FOLLOWS THE PREVIOUS DOT
      // ---------------------------------------------------

      for (let i = 1; i < TRAIL_COUNT; i++) {
        const previous = positions[i - 1];
        const current = positions[i];

        // Progressively slower.
        const followSpeed =
          0.34 - i * 0.025;

        current.x +=
          (previous.x - current.x) *
          followSpeed;

        current.y +=
          (previous.y - current.y) *
          followSpeed;

        gsap.set(dots[i], {
          x: current.x,
          y: current.y,
        });
      }

      animationFrame =
        requestAnimationFrame(animate);
    };

    animationFrame =
      requestAnimationFrame(animate);

    // -----------------------------------------------------
    // INTERACTIVE ELEMENTS
    // -----------------------------------------------------

    const handleMouseOver = (event) => {
      const target =
        event.target.closest?.(
          INTERACTIVE_SELECTOR
        );

      if (!target) return;

      gsap.to(cursor, {
        scale: 2.8,
        duration: 0.35,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(dots, {
        scale: 0.7,
        duration: 0.35,
        stagger: 0.025,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const handleMouseOut = (event) => {
      const target =
        event.target.closest?.(
          INTERACTIVE_SELECTOR
        );

      if (!target) return;

      gsap.to(cursor, {
        scale: 1,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)",
        overwrite: true,
      });

      gsap.to(dots, {
        scale: 1,
        duration: 0.4,
        stagger: 0.025,
        ease: "power3.out",
        overwrite: true,
      });
    };

    document.addEventListener(
      "mouseover",
      handleMouseOver
    );

    document.addEventListener(
      "mouseout",
      handleMouseOut
    );

    // -----------------------------------------------------
    // CLEANUP
    // -----------------------------------------------------

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      document.removeEventListener(
        "mouseover",
        handleMouseOver
      );

      document.removeEventListener(
        "mouseout",
        handleMouseOut
      );

      document.body.classList.remove(
        "custom-cursor-active"
      );

      gsap.killTweensOf([
        cursor,
        ...dots,
      ]);
    };
  }, [enabled]);

  // -------------------------------------------------------
  // DON'T RENDER ON TOUCH DEVICES
  // -------------------------------------------------------

  if (!enabled) return null;

  return (
    <>
      {/* =================================================
          TRAIL
      ================================================= */}

      {Array.from({
        length: TRAIL_COUNT,
      }).map((_, index) => {
        const progress =
          index / (TRAIL_COUNT - 1);

        // Front = larger
        // Back = smaller
        const size =
          7.5 - progress * 4.5;

        // Front = brighter
        // Back = softer
        const opacity =
          0.65 - progress * 0.48;

        return (
          <div
            key={index}
            ref={(element) => {
              dotRefs.current[index] =
                element;
            }}
            aria-hidden="true"
            className="
              pointer-events-none
              fixed
              left-0
              top-0
              z-[99998]
              rounded-full
              bg-signal
              will-change-transform
            "
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity,
            }}
          />
        );
      })}

      {/* =================================================
          MAIN CURSOR
      ================================================= */}

      <div
        ref={cursorRef}
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[99999]
          h-2.5
          w-2.5
          rounded-full
          bg-signal
          mix-blend-difference
          will-change-transform
        "
      />
    </>
  );
}