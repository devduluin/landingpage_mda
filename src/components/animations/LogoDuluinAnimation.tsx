import React, { useEffect, useRef } from "react";

interface LogoDuluinProps {
  width?: number;
  height?: number;
  autoRestart?: boolean;
  restartInterval?: number;
  className?: string;
}

const LogoDuluinAnimation: React.FC<LogoDuluinProps> = ({
  width = 400,
  height = 80,
  autoRestart = true,
  restartInterval = 15000, // Total cycle time (animation + wait)
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (autoRestart) {
      intervalRef.current = setInterval(() => {
        restartAnimation();
      }, restartInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoRestart, restartInterval]);

  const restartAnimation = () => {
    if (!containerRef.current) return;

    const logoSvg = containerRef.current.querySelector(
      ".logo-svg"
    ) as HTMLElement;
    const shapes = containerRef.current.querySelectorAll(
      ".shape-1, .shape-2, .shape-3, .shape-4"
    ) as NodeListOf<HTMLElement>;
    const letters = containerRef.current.querySelectorAll(
      ".letter"
    ) as NodeListOf<HTMLElement>;
    const dot = containerRef.current.querySelector(".dot") as HTMLElement;

    // Reset logo
    if (logoSvg) {
      logoSvg.style.animation = "none";
      logoSvg.offsetHeight; // Trigger reflow
      logoSvg.style.animation = "";
    }

    // Reset shapes
    shapes.forEach((shape) => {
      shape.style.animation = "none";
      shape.offsetHeight;
      shape.style.animation = "";
    });

    // Reset letters
    letters.forEach((letter) => {
      letter.style.animation = "none";
      letter.offsetHeight;
      letter.style.animation = "";
    });

    // Reset dot
    if (dot) {
      dot.style.animation = "none";
      dot.offsetHeight;
      dot.style.animation = "";
    }
  };

  return (
    <div
      ref={containerRef}
      className={`logo-duluin-container ${className}`}
      style={{
        position: "relative",
        width: width,
        height: height,
        display: "inline-block",
      }}
    >
      <style jsx>{`
        .logo-duluin-container {
          position: relative;
        }

        .logo-svg {
          width: 100%;
          height: auto;
        }

        /* Geometric shapes animation - no opacity/scale */
        .shape-1 {
          animation: slideInLeft 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          transform: translateX(-100px);
        }

        .shape-2 {
          animation: slideInLeft 1.2s cubic-bezier(0.23, 1, 0.32, 1) 0.2s
            forwards;
          transform: translateX(-100px);
        }

        .shape-3 {
          animation: slideInRight 1.2s cubic-bezier(0.23, 1, 0.32, 1) 0.4s
            forwards;
          transform: translateX(100px);
        }

        .shape-4 {
          animation: slideInRight 1.2s cubic-bezier(0.23, 1, 0.32, 1) 0.6s
            forwards;
          transform: translateX(100px);
        }

        /* Text letters animation - no opacity/scale */
        .letter {
          animation: fadeInUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          transform: translateY(30px);
        }

        .letter-d {
          animation-delay: 0.8s;
        }
        .letter-u1 {
          animation-delay: 0.9s;
        }
        .letter-l {
          animation-delay: 1s;
        }
        .letter-u2 {
          animation-delay: 1.1s;
        }
        .letter-i1 {
          animation-delay: 1.2s;
        }
        .letter-n {
          animation-delay: 1.3s;
        }
        .letter-i2 {
          animation-delay: 1.4s;
        }

        /* Dot animation - no scale */
        .dot {
          animation: dotAppear 0.6s cubic-bezier(0.23, 1, 0.32, 1) 1.5s forwards;
          transform: translateY(30px);
        }

        /* Glow effect after complete */
        .logo-glow {
          animation: addGlow 0.5s ease-out 2s forwards;
        }

        @keyframes slideInLeft {
          0% {
            transform: translateX(-100px) rotate(-180deg);
          }
          60% {
            transform: translateX(5px) rotate(-10deg);
          }
          100% {
            transform: translateX(0) rotate(0deg);
          }
        }

        @keyframes slideInRight {
          0% {
            transform: translateX(100px) rotate(180deg);
          }
          60% {
            transform: translateX(-5px) rotate(10deg);
          }
          100% {
            transform: translateX(0) rotate(0deg);
          }
        }

        @keyframes fadeInUp {
          0% {
            transform: translateY(30px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes dotAppear {
          0% {
            transform: translateY(30px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes addGlow {
          0% {
          }
          100% {
            // filter: drop-shadow(0 0 30px rgba(26, 153, 136, 0.6))
            //   drop-shadow(0 0 60px rgba(250, 93, 72, 0.4));
          }
        }

        /* Particle effects - no opacity */
        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(26, 153, 136, 0.8);
          border-radius: 50%;
          animation: particleFloat 3s ease-in-out infinite;
        }

        .particle:nth-child(1) {
          left: 10%;
          animation-delay: 2.2s;
        }
        .particle:nth-child(2) {
          left: 20%;
          animation-delay: 2.4s;
        }
        .particle:nth-child(3) {
          left: 30%;
          animation-delay: 2.6s;
        }
        .particle:nth-child(4) {
          left: 70%;
          animation-delay: 2.8s;
        }
        .particle:nth-child(5) {
          left: 80%;
          animation-delay: 3s;
        }
        .particle:nth-child(6) {
          left: 90%;
          animation-delay: 3.2s;
        }

        @keyframes particleFloat {
          0%,
          100% {
            transform: translateY(100px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .logo-svg {
            filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.2));
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .shape-1,
          .shape-2,
          .shape-3,
          .shape-4,
          .letter,
          .dot,
          .logo-glow,
          .logo-complete,
          .particle {
            animation-duration: 0.1s !important;
            animation-delay: 0s !important;
          }
        }
      `}</style>

      {/* Particles */}
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <svg
        className="logo-svg logo-glow"
        width={width}
        height={height}
        viewBox="0 0 110 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Geometric shapes (left side) */}
        <path
          className="shape-1"
          d="M0 8.13721H13.5192L8.71404 13.0481H0V8.13721Z"
          fill="#1A9988"
        />
        <path
          className="shape-2"
          d="M8.71094 13.0481L13.5161 8.13721V21.8406H8.71094V13.0481Z"
          fill="#FA5D48"
        />
        <path
          className="shape-3"
          d="M6.03125 1.85693H19.5504L14.7571 6.76783H6.03125V1.85693Z"
          fill="#1A9988"
        />
        <path
          className="shape-4"
          d="M14.7578 6.76783L19.5615 1.85693V15.5603H14.7578V6.76783Z"
          fill="#FA5D48"
        />

        {/* Text letters */}
        <path
          className="letter letter-d"
          d="M21.8438 21.6846V1.71274H30.0232C31.37 1.69553 32.7072 1.94737 33.9597 2.4541C35.1163 2.90612 36.1645 3.60683 37.0332 4.5088C37.9113 5.40959 38.5951 6.48831 39.0405 7.67553C39.5187 8.95984 39.7563 10.3246 39.7409 11.6987C39.7546 13.0819 39.5172 14.4558 39.0405 15.7506C38.5951 16.9378 37.9113 18.0165 37.0332 18.9173C36.1545 19.8067 35.1091 20.5056 33.9597 20.972C32.7029 21.4599 31.3674 21.7016 30.0232 21.6846H21.8438ZM26.5901 18.3741L25.9491 17.4154H29.8856C30.6021 17.4277 31.3136 17.2919 31.9773 17.016C32.5742 16.7447 33.1072 16.3459 33.5407 15.8464C34.0021 15.3251 34.3543 14.7129 34.5756 14.0473C34.8251 13.2942 34.9477 12.5033 34.9383 11.7083C34.9477 10.9132 34.8251 10.1223 34.5756 9.36916C34.3543 8.70362 34.0021 8.09138 33.5407 7.57009C33.1101 7.07452 32.5758 6.68457 31.9773 6.4293C31.3183 6.13452 30.6049 5.98846 29.8856 6.00109H25.8647L26.5901 5.09038V18.3741Z"
          fill="#1A9988"
        />

        <path
          className="letter letter-u1"
          d="M47.9954 21.9979C47.0114 22.0266 46.0384 21.7803 45.1814 21.2853C44.4004 20.77 43.7798 20.0371 43.393 19.1731C42.9558 18.1391 42.7425 17.0207 42.7676 15.8945V6.53491H47.2607V15.265C47.2473 15.8022 47.3431 16.3365 47.5421 16.834C47.7143 17.255 48.0062 17.6134 48.38 17.8629C48.7872 18.0996 49.25 18.2178 49.7182 18.2049C50.0811 18.2103 50.4414 18.1418 50.7782 18.0035C51.092 17.8866 51.3777 17.7025 51.6161 17.4635C51.8516 17.2257 52.0414 16.945 52.1758 16.6359C52.3083 16.2999 52.3742 15.9404 52.3697 15.5782V6.53491H56.8658V21.6848H52.6479L52.451 18.5755L53.2889 18.2336C53.0652 18.9582 52.6836 19.6214 52.1727 20.1733C51.6335 20.7349 50.9975 21.1899 50.2967 21.5154C49.5703 21.8366 48.7869 22.0009 47.9954 21.9979Z"
          fill="#1A9988"
        />

        <path
          className="letter letter-l"
          d="M60.875 21.6844V0.571777H65.343V21.6844H60.875Z"
          fill="#1A9988"
        />

        <path
          className="letter letter-u2"
          d="M74.2407 21.9979C73.2567 22.0268 72.2837 21.7804 71.4267 21.2853C70.646 20.7757 70.0243 20.0483 69.6351 19.1891C69.198 18.155 68.9847 17.0366 69.0098 15.9105V6.53491H73.5029V15.265C73.4901 15.8019 73.5848 16.3358 73.7811 16.834C73.9545 17.2543 74.2461 17.6124 74.6191 17.8629C75.0273 18.0998 75.4912 18.2181 75.9604 18.2049C76.3233 18.2103 76.6836 18.1418 77.0204 18.0035C77.3338 17.8859 77.6193 17.7018 77.8583 17.4635C78.0928 17.2249 78.2825 16.9444 78.418 16.6359C78.5491 16.2995 78.6149 15.9402 78.6119 15.5782V6.53491H83.108V21.6848H78.9026L78.7088 18.5755L79.5467 18.2304C79.3202 18.9537 78.9389 19.6163 78.4305 20.1701C77.8913 20.7317 77.2553 21.1867 76.5545 21.5122C75.8245 21.8363 75.0366 22.0017 74.2407 21.9979Z"
          fill="#1A9988"
        />

        <path
          className="letter letter-i1"
          d="M87.3516 21.6848V6.53491H91.8196V21.6848H87.3516Z"
          fill="#FA5D48"
        />

        <path
          className="letter letter-n"
          d="M96.0156 21.6845V6.53469H100.259L100.399 9.61514L99.505 9.95706C99.7193 9.26009 100.092 8.62494 100.593 8.10367C101.144 7.52677 101.798 7.06259 102.519 6.73601C103.255 6.39374 104.055 6.21822 104.864 6.22152C105.849 6.18798 106.823 6.4347 107.678 6.93413C108.463 7.41615 109.072 8.14806 109.41 9.01758C109.829 10.0864 110.028 11.2317 109.995 12.3824V21.6845H105.508V12.7531C105.524 12.237 105.438 11.7229 105.255 11.2417C105.105 10.8615 104.828 10.5479 104.473 10.3565C104.093 10.1378 103.658 10.0388 103.223 10.0721C102.85 10.0685 102.48 10.1368 102.131 10.2734C101.806 10.3807 101.51 10.5659 101.268 10.8134C101.027 11.0413 100.828 11.3119 100.681 11.6123C100.548 11.9283 100.482 12.269 100.487 12.6125V21.6845H96.0156Z"
          fill="#FA5D48"
        />

        <path
          className="letter letter-i2"
          d="M87.3516 21.6848V6.53491H91.8196V21.6848H87.3516Z"
          fill="#FA5D48"
        />

        {/* Dot - appears last */}
        <path
          className="dot"
          d="M89.6231 4.56317C90.856 4.56317 91.8555 3.54167 91.8555 2.28158C91.8555 1.0215 90.856 0 89.6231 0C88.3901 0 87.3906 1.0215 87.3906 2.28158C87.3906 3.54167 88.3901 4.56317 89.6231 4.56317Z"
          fill="#FA5D48"
        />
      </svg>
    </div>
  );
};

export default LogoDuluinAnimation;
