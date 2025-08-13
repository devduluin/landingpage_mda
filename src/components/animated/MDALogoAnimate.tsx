"use client";

import React, { useState, useEffect } from "react";

interface MDALogoProps {
  width?: number;
  height?: number;
  className?: string;
  autoAnimate?: boolean;
  animateOnClick?: boolean;
}

const MDALogo: React.FC<MDALogoProps> = ({
  width = 150,
  height = 30,
  className = "",
  autoAnimate = true,
  animateOnClick = true,
}) => {
  const [isActive, setIsActive] = useState(false);

  // Auto animate dengan looping smooth
  useEffect(() => {
    if (autoAnimate) {
      // Mulai animasi pertama setelah mount
      const initialTimer = setTimeout(() => {
        setIsActive(true);
      }, 500);

      // Setup interval untuk looping yang smooth
      const loopInterval = setInterval(() => {
        setIsActive(false); // Reset ke transparent

        // Tunggu fade out, lalu mulai animasi lagi
        setTimeout(() => {
          setIsActive(true);
        }, 800);
      }, 20000); // Loop setiap 6 detik (4s animasi + 2s pause)

      return () => {
        clearTimeout(initialTimer);
        clearInterval(loopInterval);
      };
    }
  }, [autoAnimate]);

  const handleClick = () => {
    if (animateOnClick) {
      // Reset dan mulai animasi baru
      setIsActive(false);
      setTimeout(() => {
        setIsActive(true);
      }, 100);
    }
  };

  // Calculate proper dimensions maintaining aspect ratio
  const aspectRatio = 320.22 / 1032.12;
  const svgHeight = width * aspectRatio;

  return (
    <div
      style={{ width, height: Math.min(svgHeight, height) }}
      className={className}
      onClick={handleClick}
    >
      <style jsx>{`
        /* Reset dan base styles */
        svg path,
        svg polygon {
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        /* Animasi untuk bagian M (merah) */
        svg .svg-elem-1 {
          fill: transparent;
          stroke: transparent;
          stroke-dasharray: 500;
          stroke-dashoffset: 500;
          -webkit-transition: stroke 0.1s ease-in-out 0s,
            stroke-dashoffset 1.2s ease-in-out 0s,
            fill 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1.2s;
          transition: stroke 0.1s ease-in-out 0s,
            stroke-dashoffset 1.2s ease-in-out 0s,
            fill 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1.2s;
        }
        svg.active .svg-elem-1 {
          stroke: #f04e23;
          stroke-dashoffset: 0;
          fill: #f04e23;
        }

        svg .svg-elem-2 {
          fill: transparent;
          stroke: transparent;
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          -webkit-transition: stroke 0.1s ease-in-out 0.2s,
            stroke-dashoffset 1s ease-in-out 0.2s,
            fill 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1.2s;
          transition: stroke 0.1s ease-in-out 0.2s,
            stroke-dashoffset 1s ease-in-out 0.2s,
            fill 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1.2s;
        }
        svg.active .svg-elem-2 {
          stroke: #f04e23;
          stroke-dashoffset: 0;
          fill: #f04e23;
        }

        /* Animasi untuk bagian D (orange) */
        svg .svg-elem-3 {
          fill: transparent;
          stroke: transparent;
          stroke-dasharray: 500;
          stroke-dashoffset: 500;
          -webkit-transition: stroke 0.1s ease-in-out 0.4s,
            stroke-dashoffset 1.3s ease-in-out 0.4s,
            fill 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1.7s;
          transition: stroke 0.1s ease-in-out 0.4s,
            stroke-dashoffset 1.3s ease-in-out 0.4s,
            fill 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1.7s;
        }
        svg.active .svg-elem-3 {
          stroke: #f57f20;
          stroke-dashoffset: 0;
          fill: #f57f20;
        }

        /* Animasi untuk huruf M di MDA */
        svg .svg-elem-4 {
          fill: transparent;
          stroke: transparent;
          stroke-dasharray: 800;
          stroke-dashoffset: 800;
          -webkit-transition: stroke 0.1s ease-in-out 0.8s,
            stroke-dashoffset 1.5s ease-in-out 0.8s,
            fill 0.6s cubic-bezier(0.4, 0, 0.2, 1) 2.3s;
          transition: stroke 0.1s ease-in-out 0.8s,
            stroke-dashoffset 1.5s ease-in-out 0.8s,
            fill 0.6s cubic-bezier(0.4, 0, 0.2, 1) 2.3s;
        }
        svg.active .svg-elem-4 {
          stroke: #010101;
          stroke-dashoffset: 0;
          fill: #010101;
        }

        /* Animasi untuk huruf D di MDA */
        svg .svg-elem-5 {
          fill: transparent;
          stroke: transparent;
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          -webkit-transition: stroke 0.1s ease-in-out 1.1s,
            stroke-dashoffset 1.3s ease-in-out 1.1s,
            fill 0.6s cubic-bezier(0.4, 0, 0.2, 1) 2.4s;
          transition: stroke 0.1s ease-in-out 1.1s,
            stroke-dashoffset 1.3s ease-in-out 1.1s,
            fill 0.6s cubic-bezier(0.4, 0, 0.2, 1) 2.4s;
        }
        svg.active .svg-elem-5 {
          stroke: #010101;
          stroke-dashoffset: 0;
          fill: #010101;
        }

        /* Animasi untuk huruf A di MDA */
        svg .svg-elem-6 {
          fill: transparent;
          stroke: transparent;
          stroke-dasharray: 500;
          stroke-dashoffset: 500;
          -webkit-transition: stroke 0.1s ease-in-out 1.4s,
            stroke-dashoffset 1.2s ease-in-out 1.4s,
            fill 0.6s cubic-bezier(0.4, 0, 0.2, 1) 2.6s;
          transition: stroke 0.1s ease-in-out 1.4s,
            stroke-dashoffset 1.2s ease-in-out 1.4s,
            fill 0.6s cubic-bezier(0.4, 0, 0.2, 1) 2.6s;
        }
        svg.active .svg-elem-6 {
          stroke: #010101;
          stroke-dashoffset: 0;
          fill: #010101;
        }

        /* Animasi untuk PARTNER - huruf P */
        svg .svg-elem-7 {
          fill: transparent;
          stroke: transparent;
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          -webkit-transition: stroke 0.1s ease-in-out 1.8s,
            stroke-dashoffset 0.8s ease-in-out 1.8s,
            fill 0.5s cubic-bezier(0.4, 0, 0.2, 1) 2.6s;
          transition: stroke 0.1s ease-in-out 1.8s,
            stroke-dashoffset 0.8s ease-in-out 1.8s,
            fill 0.5s cubic-bezier(0.4, 0, 0.2, 1) 2.6s;
        }
        svg.active .svg-elem-7 {
          stroke: #010101;
          stroke-dashoffset: 0;
          fill: #010101;
        }

        /* PARTNER - huruf A */
        svg .svg-elem-8 {
          fill: transparent;
          stroke: transparent;
          stroke-dasharray: 350;
          stroke-dashoffset: 350;
          -webkit-transition: stroke 0.1s ease-in-out 1.9s,
            stroke-dashoffset 0.8s ease-in-out 1.9s,
            fill 0.5s cubic-bezier(0.4, 0, 0.2, 1) 2.7s;
          transition: stroke 0.1s ease-in-out 1.9s,
            stroke-dashoffset 0.8s ease-in-out 1.9s,
            fill 0.5s cubic-bezier(0.4, 0, 0.2, 1) 2.7s;
        }
        svg.active .svg-elem-8 {
          stroke: #010101;
          stroke-dashoffset: 0;
          fill: #010101;
        }

        /* PARTNER - huruf R */
        svg .svg-elem-9 {
          fill: transparent;
          stroke: transparent;
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          -webkit-transition: stroke 0.1s ease-in-out 2s,
            stroke-dashoffset 0.9s ease-in-out 2s,
            fill 0.5s cubic-bezier(0.4, 0, 0.2, 1) 2.9s;
          transition: stroke 0.1s ease-in-out 2s,
            stroke-dashoffset 0.9s ease-in-out 2s,
            fill 0.5s cubic-bezier(0.4, 0, 0.2, 1) 2.9s;
        }
        svg.active .svg-elem-9 {
          stroke: #010101;
          stroke-dashoffset: 0;
          fill: #010101;
        }

        /* PARTNER - huruf T */
        svg .svg-elem-10 {
          fill: transparent;
          stroke: transparent;
          stroke-dasharray: 250;
          stroke-dashoffset: 250;
          -webkit-transition: stroke 0.1s ease-in-out 2.1s,
            stroke-dashoffset 0.7s ease-in-out 2.1s,
            fill 0.5s cubic-bezier(0.4, 0, 0.2, 1) 2.8s;
          transition: stroke 0.1s ease-in-out 2.1s,
            stroke-dashoffset 0.7s ease-in-out 2.1s,
            fill 0.5s cubic-bezier(0.4, 0, 0.2, 1) 2.8s;
        }
        svg.active .svg-elem-10 {
          stroke: #010101;
          stroke-dashoffset: 0;
          fill: #010101;
        }

        /* PARTNER - huruf N */
        svg .svg-elem-11 {
          fill: transparent;
          stroke: transparent;
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          -webkit-transition: stroke 0.1s ease-in-out 2.2s,
            stroke-dashoffset 0.8s ease-in-out 2.2s,
            fill 0.5s cubic-bezier(0.4, 0, 0.2, 1) 3s;
          transition: stroke 0.1s ease-in-out 2.2s,
            stroke-dashoffset 0.8s ease-in-out 2.2s,
            fill 0.5s cubic-bezier(0.4, 0, 0.2, 1) 3s;
        }
        svg.active .svg-elem-11 {
          stroke: #010101;
          stroke-dashoffset: 0;
          fill: #010101;
        }

        /* PARTNER - huruf E */
        svg .svg-elem-12 {
          fill: transparent;
          stroke: transparent;
          stroke-dasharray: 350;
          stroke-dashoffset: 350;
          -webkit-transition: stroke 0.1s ease-in-out 2.3s,
            stroke-dashoffset 0.8s ease-in-out 2.3s,
            fill 0.5s cubic-bezier(0.4, 0, 0.2, 1) 3.1s;
          transition: stroke 0.1s ease-in-out 2.3s,
            stroke-dashoffset 0.8s ease-in-out 2.3s,
            fill 0.5s cubic-bezier(0.4, 0, 0.2, 1) 3.1s;
        }
        svg.active .svg-elem-12 {
          stroke: #010101;
          stroke-dashoffset: 0;
          fill: #010101;
        }

        /* PARTNER - huruf R terakhir */
        svg .svg-elem-13 {
          fill: transparent;
          stroke: transparent;
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          -webkit-transition: stroke 0.1s ease-in-out 2.4s,
            stroke-dashoffset 0.9s ease-in-out 2.4s,
            fill 0.5s cubic-bezier(0.4, 0, 0.2, 1) 3.3s;
          transition: stroke 0.1s ease-in-out 2.4s,
            stroke-dashoffset 0.9s ease-in-out 2.4s,
            fill 0.5s cubic-bezier(0.4, 0, 0.2, 1) 3.3s;
        }
        svg.active .svg-elem-13 {
          stroke: #010101;
          stroke-dashoffset: 0;
          fill: #010101;
        }

        /* Fade out smooth untuk reset */
        svg:not(.active) path,
        svg:not(.active) polygon {
          -webkit-transition: fill 0.5s ease-in-out 0s,
            stroke 0.5s ease-in-out 0s;
          transition: fill 0.5s ease-in-out 0s, stroke 0.5s ease-in-out 0s;
        }

        /* Hover effect tambahan */
        svg:hover {
          transform: scale(1.02);
          -webkit-transition: transform 0.3s ease-in-out;
          transition: transform 0.3s ease-in-out;
        }
      `}</style>

      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1032.12 320.22"
        width="100%"
        height="100%"
        className={isActive ? "active" : ""}
      >
        <path
          className="svg-elem-1"
          d="m47.73,32.17L0,211.45h77.83L134.11,0h-42.37c-21.62,0-38.79,12.55-44.02,32.17Z"
        />
        <polygon
          className="svg-elem-2"
          points="155.94 0 127.8 105.73 177.48 211.45 233.77 0 155.94 0"
        />
        <path
          className="svg-elem-3"
          d="m256.18,0l-56.29,211.45h42.37c21.62,0,38.79-12.55,44.02-32.17l36.13-135.72c5.41-20.33-14.01-43.57-36.41-43.57h-29.81Z"
        />
        <g>
          <path
            className="svg-elem-4"
            d="m356.58,211.45L401.42,0h61.84l21.83,143.31h1.03L566.7,0h66.96l-44.98,211.44h-47.92l30.19-140.52h-1.61l-80.44,140.23h-32.53l-21.1-140.23h-1.17l-29.75,140.52h-47.77Z"
          />
          <path
            className="svg-elem-5"
            d="m749.14,0c50.7,0,85.43,30.33,85.43,82.06,0,75.61-44.98,129.39-112.1,129.39h-99.93L667.52,0h81.62Zm-63.15,168.36h29.16c37.51,0,64.18-30.77,64.18-79.57,0-28.28-15.24-45.72-42.49-45.72h-24.32l-26.52,125.28Z"
          />
          <path
            className="svg-elem-6"
            d="m965.13,165h-69.02l-23.88,46.45h-56.85L933.19,0h65.79l24.32,211.44h-54.66l-3.52-46.45Zm-49.53-38.68h47.33l-5.86-79.13h-1.17l-40.3,79.13Z"
          />
        </g>
        <g>
          <path
            className="svg-elem-7"
            d="m537.52,241h33.76c17.68,0,26.83,11.09,23.37,28.05l-.02.11c-3.46,16.96-17.1,27.83-34.78,27.83h-13.62l-4.74,23.22h-20.15l16.18-79.22Zm17,15.43l-5.19,25.42h8.78c8.51,0,14.47-4.45,16.15-12.68l.02-.11c1.68-8.23-2.47-12.63-10.98-12.63h-8.78Z"
          />
          <path
            className="svg-elem-8"
            d="m623.49,241h24.65l10.5,79.22h-21.14l-1.39-17.4h-25.86l-8.5,17.4h-21.14l42.86-79.22Zm-6.1,47.32h17.51l-2.42-30.08h-.38l-14.71,30.08Z"
          />
          <path
            className="svg-elem-9"
            d="m682.39,241h34.31c19.16,0,28.04,9.5,24.61,26.3l-.02.11c-2.07,10.16-9.14,18.94-18.1,22.51l9.68,30.3h-22.62l-8.04-27.28h-10.27l-5.57,27.28h-20.15l16.18-79.22Zm24.44,37.33c7.14,0,12.57-4.28,13.94-10.98l.02-.11c1.36-6.64-2.47-11.03-9.55-11.03h-11.8l-4.52,22.12h11.91Z"
          />
          <path
            className="svg-elem-10"
            d="m771.86,257.2h-21.85l3.31-16.2h63.79l-3.31,16.2h-21.85l-12.87,63.02h-20.09l12.87-63.02Z"
          />
          <path
            className="svg-elem-11"
            d="m825.62,241h17.07l22.34,45.73h.38l9.34-45.73h20.09l-16.18,79.22h-16.91l-22.4-46.22h-.38l-9.44,46.22h-20.09l16.18-79.22Z"
          />
          <path
            className="svg-elem-12"
            d="m906.82,241h54.3l-3.31,16.2h-34.15l-3.2,15.64h32.12l-3.1,15.15h-32.12l-3.27,16.03h34.15l-3.31,16.2h-54.3l16.18-79.22Z"
          />
          <path
            className="svg-elem-13"
            d="m972.48,241h34.31c19.16,0,28.04,9.5,24.61,26.3l-.02.11c-2.07,10.16-9.14,18.94-18.1,22.51l9.68,30.3h-22.62l-8.04-27.28h-10.27l-5.57,27.28h-20.15l16.18-79.22Zm24.44,37.33c7.14,0,12.57-4.28,13.94-10.98l.02-.11c1.36-6.64-2.47-11.03-9.55-11.03h-11.8l-4.52,22.12h11.91Z"
          />
        </g>
      </svg>
    </div>
  );
};

export default MDALogo;
