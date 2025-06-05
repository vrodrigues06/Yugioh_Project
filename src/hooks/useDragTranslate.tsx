import { useRef, useState, useCallback } from "react";

export default function useDragTranslate() {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState({ x: 0, y: 0 });

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      if (ref.current) {
        const nextX = currentTranslate.x + deltaX;
        const nextY = currentTranslate.y + deltaY;

        ref.current.style.transform = `translate(${nextX}px, ${nextY}px)`;
      }
    },
    [isDragging, startX, startY, currentTranslate],
  );

  const onMouseUp = useCallback(() => {
    if (!isDragging) return;

    const transform = ref.current?.style.transform || "translate(0px, 0px)";
    const match = transform.match(/-?\d+/g);

    const finalX = match && match[0] ? parseInt(match[0], 10) : 0;
    const finalY = match && match[1] ? parseInt(match[1], 10) : 0;

    setCurrentTranslate({ x: finalX, y: finalY });
    setIsDragging(false);
  }, [isDragging]);

  const onMouseLeave = useCallback(() => {
    if (isDragging) onMouseUp();
  }, [isDragging, onMouseUp]);

  return {
    ref,
    events: {
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave,
    },
    isDragging,
    translate: currentTranslate,
  };
}
