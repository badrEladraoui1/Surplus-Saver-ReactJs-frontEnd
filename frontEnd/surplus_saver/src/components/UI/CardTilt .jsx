/* eslint-disable react/prop-types */
import { useState, useCallback } from "react";

function throttle(func, delay) {
  let lastCall = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

const CardTilt = ({ content }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onMouseMove = useCallback(
    throttle((e) => {
      const card = e.currentTarget;
      const box = card.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const centerX = box.width / 2;
      const centerY = box.height / 2;
      const rotateX = (y - centerY) / 4;
      const rotateY = (centerX - x) / 4;

      setRotate({ x: rotateX, y: rotateY });
    }, 100),
    []
  );

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <>
      <div
        className="card relative h-52 w-52 transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
          transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
        }}
      >
        <div className="group relative flex h-full w-full select-none items-center justify-center rounded-lg border border-gray-900 bg-gradient-to-tr from-gray-950 to-gray-900 text-sm font-light text-gray-300">
          <span className="text-md bg-gradient-to-t from-gray-400 to-white bg-clip-text font-bold text-transparent">
            {content}
          </span>
        </div>
      </div>
    </>
  );
};

export default CardTilt;
