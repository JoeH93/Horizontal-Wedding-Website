"use client"
import { useEffect, useRef, ReactNode, Children } from "react";

const NAV_RESERVED_HEIGHT = 80;

export default function HorizontalScrollContainer({
  children,
}: {
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el!.scrollLeft += e.deltaY;
      }
    }

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div
      ref={containerRef}
      className="no-scrollbar flex h-screen w-screen overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth"
    >
      {Children.map(children, (child) => (
        <div
          className="w-screen h-full shrink-0 snap-start overflow-hidden"
          style={{ paddingTop: NAV_RESERVED_HEIGHT }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}