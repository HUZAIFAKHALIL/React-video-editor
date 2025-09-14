import { interpolate } from "remotion";

export type AnimationTemplate = {
  name: string;
  preview: string;
  isPro?: boolean;
  enter: (
    frame: number,
    durationInFrames: number
  ) => {
    transform?: string;
    opacity?: number;
  };
  exit: (
    frame: number,
    durationInFrames: number
  ) => {
    transform?: string;
    opacity?: number;
  };
};

export const animationTemplates: Record<string, AnimationTemplate> = {
  fade: {
    name: "Fade",
    preview: "Simple fade in/out",
    enter: (frame) => ({
      opacity: interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      opacity: interpolate(frame, [duration - 15, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  slideRight: {
    name: "Slide",
    preview: "Slide in from left",
    isPro: true,
    enter: (frame) => ({
      transform: `translateX(${interpolate(frame, [0, 15], [-100, 0], {
        extrapolateRight: "clamp",
      })}%)`,
      opacity: interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `translateX(${interpolate(frame, [duration - 15, duration], [0, 100], {
        extrapolateLeft: "clamp",
      })}%)`,
      opacity: interpolate(frame, [duration - 15, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  scale: {
    name: "Scale",
    preview: "Scale in/out",
    enter: (frame) => ({
      transform: `scale(${interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      })})`,
      opacity: interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `scale(${interpolate(frame, [duration - 15, duration], [1, 0], { extrapolateLeft: "clamp" })})`,
      opacity: interpolate(frame, [duration - 15, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  bounce: {
    name: "Bounce",
    preview: "Elastic bounce entrance",
    isPro: true,
    enter: (frame) => ({
      transform: `translateY(${interpolate(frame, [0, 10, 13, 15], [100, -10, 5, 0], {
        extrapolateRight: "clamp",
      })}px)`,
      opacity: interpolate(frame, [0, 10], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `translateY(${interpolate(
        frame,
        [duration - 15, duration - 13, duration - 10, duration],
        [0, 5, -10, 100],
        { extrapolateLeft: "clamp" },
      )}px)`,
      opacity: interpolate(frame, [duration - 10, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  flipX: {
    name: "Flip",
    preview: "3D flip around X axis",
    isPro: true,
    enter: (frame) => ({
      transform: `perspective(400px) rotateX(${interpolate(frame, [0, 15], [90, 0], {
        extrapolateRight: "clamp",
      })}deg)`,
      opacity: interpolate(frame, [0, 5, 15], [0, 0.7, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `perspective(400px) rotateX(${interpolate(frame, [duration - 15, duration], [0, -90], {
        extrapolateLeft: "clamp",
      })}deg)`,
      opacity: interpolate(frame, [duration - 15, duration - 5, duration], [1, 0.7, 0], { extrapolateLeft: "clamp" }),
    }),
  },
  zoomBlur: {
    name: "Zoom",
    preview: "Zoom with blur effect",
    isPro: true,
    enter: (frame) => ({
      transform: `scale(${interpolate(frame, [0, 15], [1.5, 1], {
        extrapolateRight: "clamp",
      })})`,
      opacity: interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      }),
      filter: `blur(${interpolate(frame, [0, 15], [10, 0], {
        extrapolateRight: "clamp",
      })}px)`,
    }),
    exit: (frame, duration) => ({
      transform: `scale(${interpolate(frame, [duration - 15, duration], [1, 1.5], { extrapolateLeft: "clamp" })})`,
      opacity: interpolate(frame, [duration - 15, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
      filter: `blur(${interpolate(frame, [duration - 15, duration], [0, 10], {
        extrapolateLeft: "clamp",
      })}px)`,
    }),
  },
  slideUp: {
    name: "Slide",
    preview: "Modern slide from bottom",
    enter: (frame) => ({
      transform: `translateY(${interpolate(frame, [0, 15], [30, 0], {
        extrapolateRight: "clamp",
      })}px)`,
      opacity: interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `translateY(${interpolate(frame, [duration - 15, duration], [0, -30], {
        extrapolateLeft: "clamp",
      })}px)`,
      opacity: interpolate(frame, [duration - 15, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  snapRotate: {
    name: "Snap",
    preview: "Quick rotate with snap",
    isPro: true,
    enter: (frame) => ({
      transform: `rotate(${interpolate(frame, [0, 8, 12, 15], [-10, 5, -2, 0], {
        extrapolateRight: "clamp",
      })}deg) scale(${interpolate(frame, [0, 15], [0.8, 1], {
        extrapolateRight: "clamp",
      })})`,
      opacity: interpolate(frame, [0, 10], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `rotate(${interpolate(frame, [duration - 15, duration - 12, duration - 8, duration], [0, -2, 5, -10], {
        extrapolateLeft: "clamp",
      })}deg) scale(${interpolate(frame, [duration - 15, duration], [1, 0.8], {
        extrapolateLeft: "clamp",
      })})`,
      opacity: interpolate(frame, [duration - 10, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  glitch: {
    name: "Glitch",
    preview: "Digital glitch effect",
    isPro: true,
    enter: (frame) => {
      const progress = interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      })
      // Create glitchy movements at specific keyframes
      const xOffset = frame % 3 === 0 ? (Math.random() * 10 - 5) * (1 - progress) : 0
      const yOffset = frame % 4 === 0 ? (Math.random() * 8 - 4) * (1 - progress) : 0

      return {
        transform: `translate(${xOffset}px, ${yOffset}px) scale(${interpolate(
          frame,
          [0, 3, 6, 10, 15],
          [0.9, 1.05, 0.95, 1.02, 1],
          { extrapolateRight: "clamp" },
        )})`,
        opacity: interpolate(frame, [0, 3, 5, 15], [0, 0.7, 0.8, 1], {
          extrapolateRight: "clamp",
        }),
      }
    },
    exit: (frame, duration) => {
      const progress = interpolate(frame, [duration - 15, duration], [0, 1], {
        extrapolateLeft: "clamp",
      })
      // Create glitchy movements at specific keyframes
      const xOffset = (duration - frame) % 3 === 0 ? (Math.random() * 10 - 5) * progress : 0
      const yOffset = (duration - frame) % 4 === 0 ? (Math.random() * 8 - 4) * progress : 0

      return {
        transform: `translate(${xOffset}px, ${yOffset}px) scale(${interpolate(
          frame,
          [duration - 15, duration - 10, duration - 6, duration - 3, duration],
          [1, 1.02, 0.95, 1.05, 0.9],
          { extrapolateLeft: "clamp" },
        )})`,
        opacity: interpolate(frame, [duration - 15, duration - 5, duration - 3, duration], [1, 0.8, 0.7, 0], {
          extrapolateLeft: "clamp",
        }),
      }
    },
  },
  swipeReveal: {
    name: "Swipe",
    preview: "Reveals content with a swipe",
    isPro: true,
    enter: (frame) => ({
      transform: `translateX(${interpolate(frame, [0, 15], [0, 0], {
        extrapolateRight: "clamp",
      })}px)`,
      opacity: 1,
      clipPath: `inset(0 ${interpolate(frame, [0, 15], [100, 0], {
        extrapolateRight: "clamp",
      })}% 0 0)`,
    }),
    exit: (frame, duration) => ({
      transform: `translateX(${interpolate(frame, [duration - 15, duration], [0, 0], { extrapolateLeft: "clamp" })}px)`,
      opacity: 1,
      clipPath: `inset(0 0 0 ${interpolate(frame, [duration - 15, duration], [0, 100], {
        extrapolateLeft: "clamp",
      })}%)`,
    }),
  },
  floatIn: {
    name: "Float",
    preview: "Smooth floating entrance",
    enter: (frame) => ({
      transform: `translate(${interpolate(frame, [0, 15], [10, 0], {
        extrapolateRight: "clamp",
      })}px, ${interpolate(frame, [0, 15], [-20, 0], {
        extrapolateRight: "clamp",
      })}px)`,
      opacity: interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `translate(${interpolate(frame, [duration - 15, duration], [0, -10], {
        extrapolateLeft: "clamp",
      })}px, ${interpolate(frame, [duration - 15, duration], [0, -20], {
        extrapolateLeft: "clamp",
      })}px)`,
      opacity: interpolate(frame, [duration - 15, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  slideLeft: {
    name: "Slide Left",
    preview: "Slide in from right",
    enter: (frame) => ({
      transform: `translateX(${interpolate(frame, [0, 15], [100, 0], {
        extrapolateRight: "clamp",
      })}%)`,
      opacity: interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `translateX(${interpolate(frame, [duration - 15, duration], [0, -100], {
        extrapolateLeft: "clamp",
      })}%)`,
      opacity: interpolate(frame, [duration - 15, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  slideDown: {
    name: "Slide Down",
    preview: "Slide in from top",
    enter: (frame) => ({
      transform: `translateY(${interpolate(frame, [0, 15], [-100, 0], {
        extrapolateRight: "clamp",
      })}%)`,
      opacity: interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `translateY(${interpolate(frame, [duration - 15, duration], [0, 100], {
        extrapolateLeft: "clamp",
      })}%)`,
      opacity: interpolate(frame, [duration - 15, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  rotateIn: {
    name: "Rotate In",
    preview: "Rotate entrance",
    isPro: true,
    enter: (frame) => ({
      transform: `rotate(${interpolate(frame, [0, 15], [180, 0], {
        extrapolateRight: "clamp",
      })}deg)`,
      opacity: interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `rotate(${interpolate(frame, [duration - 15, duration], [0, -180], { extrapolateLeft: "clamp" })}deg)`,
      opacity: interpolate(frame, [duration - 15, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  spinScale: {
    name: "Spin Scale",
    preview: "Spinning with scale",
    isPro: true,
    enter: (frame) => ({
      transform: `rotate(${interpolate(frame, [0, 15], [0, 360], {
        extrapolateRight: "clamp",
      })}deg) scale(${interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      })})`,
      opacity: interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `rotate(${interpolate(frame, [duration - 15, duration], [0, 360], {
        extrapolateLeft: "clamp",
      })}deg) scale(${interpolate(frame, [duration - 15, duration], [1, 0], {
        extrapolateLeft: "clamp",
      })})`,
      opacity: interpolate(frame, [duration - 15, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  flipY: {
    name: "Flip Y",
    preview: "3D flip around Y axis",
    isPro: true,
    enter: (frame) => ({
      transform: `perspective(400px) rotateY(${interpolate(frame, [0, 15], [90, 0], {
        extrapolateRight: "clamp",
      })}deg)`,
      opacity: interpolate(frame, [0, 5, 15], [0, 0.7, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `perspective(400px) rotateY(${interpolate(frame, [duration - 15, duration], [0, -90], {
        extrapolateLeft: "clamp",
      })}deg)`,
      opacity: interpolate(frame, [duration - 15, duration - 5, duration], [1, 0.7, 0], { extrapolateLeft: "clamp" }),
    }),
  },
  elasticScale: {
    name: "Elastic Scale",
    preview: "Elastic scaling effect",
    isPro: true,
    enter: (frame) => ({
      transform: `scale(${interpolate(frame, [0, 8, 12, 15], [0, 1.2, 0.9, 1], { extrapolateRight: "clamp" })})`,
      opacity: interpolate(frame, [0, 8], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `scale(${interpolate(frame, [duration - 15, duration - 12, duration - 8, duration], [1, 0.9, 1.2, 0], {
        extrapolateLeft: "clamp",
      })})`,
      opacity: interpolate(frame, [duration - 8, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  rubberBand: {
    name: "Rubber Band",
    preview: "Rubber band stretch",
    isPro: true,
    enter: (frame) => ({
      transform: `scaleX(${interpolate(frame, [0, 5, 8, 12, 15], [1, 1.25, 0.75, 1.15, 1], {
        extrapolateRight: "clamp",
      })}) scaleY(${interpolate(frame, [0, 5, 8, 12, 15], [1, 0.75, 1.25, 0.85, 1], { extrapolateRight: "clamp" })})`,
      opacity: interpolate(frame, [0, 5], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `scaleX(${interpolate(
        frame,
        [duration - 15, duration - 12, duration - 8, duration - 5, duration],
        [1, 0.85, 1.25, 0.75, 1.25],
        { extrapolateLeft: "clamp" },
      )}) scaleY(${interpolate(
        frame,
        [duration - 15, duration - 12, duration - 8, duration - 5, duration],
        [1, 1.15, 0.75, 1.25, 0.75],
        { extrapolateLeft: "clamp" },
      )})`,
      opacity: interpolate(frame, [duration - 5, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  blurIn: {
    name: "Blur In",
    preview: "Blur to focus transition",
    enter: (frame) => ({
      opacity: interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      }),
      filter: `blur(${interpolate(frame, [0, 15], [20, 0], {
        extrapolateRight: "clamp",
      })}px)`,
    }),
    exit: (frame, duration) => ({
      opacity: interpolate(frame, [duration - 15, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
      filter: `blur(${interpolate(frame, [duration - 15, duration], [0, 20], {
        extrapolateLeft: "clamp",
      })}px)`,
    }),
  },
  typewriter: {
    name: "Typewriter",
    preview: "Typewriter reveal effect",
    isPro: true,
    enter: (frame) => ({
      opacity: 1,
      clipPath: `inset(0 ${interpolate(frame, [0, 20], [100, 0], {
        extrapolateRight: "clamp",
      })}% 0 0)`,
    }),
    exit: (frame, duration) => ({
      opacity: 1,
      clipPath: `inset(0 0 0 ${interpolate(frame, [duration - 20, duration], [0, 100], {
        extrapolateLeft: "clamp",
      })}%)`,
    }),
  },
  zoomIn: {
    name: "Zoom In",
    preview: "Simple zoom in",
    enter: (frame) => ({
      transform: `scale(${interpolate(frame, [0, 15], [0.5, 1], {
        extrapolateRight: "clamp",
      })})`,
      opacity: interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `scale(${interpolate(frame, [duration - 15, duration], [1, 0.5], { extrapolateLeft: "clamp" })})`,
      opacity: interpolate(frame, [duration - 15, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  zoomOut: {
    name: "Zoom Out",
    preview: "Zoom out entrance",
    enter: (frame) => ({
      transform: `scale(${interpolate(frame, [0, 15], [2, 1], {
        extrapolateRight: "clamp",
      })})`,
      opacity: interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `scale(${interpolate(frame, [duration - 15, duration], [1, 2], { extrapolateLeft: "clamp" })})`,
      opacity: interpolate(frame, [duration - 15, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  shake: {
    name: "Shake",
    preview: "Horizontal shake",
    isPro: true,
    enter: (frame) => ({
      transform: `translateX(${
        frame < 15
          ? interpolate(frame % 4, [0, 1, 2, 3], [0, -5, 5, 0], { extrapolateRight: "clamp" }) *
            (1 - interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }))
          : 0
      }px)`,
      opacity: interpolate(frame, [0, 5], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `translateX(${
        frame > duration - 15
          ? interpolate((duration - frame) % 4, [0, 1, 2, 3], [0, -5, 5, 0], { extrapolateRight: "clamp" }) *
            interpolate(frame, [duration - 15, duration], [0, 1], {
              extrapolateLeft: "clamp",
            })
          : 0
      }px)`,
      opacity: interpolate(frame, [duration - 5, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  pulse: {
    name: "Pulse",
    preview: "Pulsing scale effect",
    enter: (frame) => ({
      transform: `scale(${interpolate(frame, [0, 8, 15], [0.8, 1.1, 1], { extrapolateRight: "clamp" })})`,
      opacity: interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `scale(${interpolate(frame, [duration - 15, duration - 8, duration], [1, 1.1, 0.8], {
        extrapolateLeft: "clamp",
      })})`,
      opacity: interpolate(frame, [duration - 15, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  slideDiagonal: {
    name: "Slide Diagonal",
    preview: "Diagonal slide entrance",
    isPro: true,
    enter: (frame) => ({
      transform: `translate(${interpolate(frame, [0, 15], [-50, 0], {
        extrapolateRight: "clamp",
      })}px, ${interpolate(frame, [0, 15], [-50, 0], {
        extrapolateRight: "clamp",
      })}px)`,
      opacity: interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `translate(${interpolate(frame, [duration - 15, duration], [0, 50], {
        extrapolateLeft: "clamp",
      })}px, ${interpolate(frame, [duration - 15, duration], [0, 50], {
        extrapolateLeft: "clamp",
      })}px)`,
      opacity: interpolate(frame, [duration - 15, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  skewIn: {
    name: "Skew In",
    preview: "Skew transformation",
    isPro: true,
    enter: (frame) => ({
      transform: `skewX(${interpolate(frame, [0, 15], [20, 0], {
        extrapolateRight: "clamp",
      })}deg) translateX(${interpolate(frame, [0, 15], [-30, 0], {
        extrapolateRight: "clamp",
      })}px)`,
      opacity: interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `skewX(${interpolate(frame, [duration - 15, duration], [0, -20], {
        extrapolateLeft: "clamp",
      })}deg) translateX(${interpolate(frame, [duration - 15, duration], [0, 30], {
        extrapolateLeft: "clamp",
      })}px)`,
      opacity: interpolate(frame, [duration - 15, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  wipeRight: {
    name: "Wipe Right",
    preview: "Right wipe reveal",
    enter: (frame) => ({
      opacity: 1,
      clipPath: `polygon(0 0, ${interpolate(frame, [0, 15], [0, 100], {
        extrapolateRight: "clamp",
      })}% 0, ${interpolate(frame, [0, 15], [0, 100], {
        extrapolateRight: "clamp",
      })}% 100%, 0 100%)`,
    }),
    exit: (frame, duration) => ({
      opacity: 1,
      clipPath: `polygon(${interpolate(frame, [duration - 15, duration], [0, 100], {
        extrapolateLeft: "clamp",
      })}% 0, 100% 0, 100% 100%, ${interpolate(frame, [duration - 15, duration], [0, 100], {
        extrapolateLeft: "clamp",
      })}% 100%)`,
    }),
  },
  wipeUp: {
    name: "Wipe Up",
    preview: "Upward wipe reveal",
    enter: (frame) => ({
      opacity: 1,
      clipPath: `polygon(0 100%, 100% 100%, 100% ${interpolate(frame, [0, 15], [100, 0], {
        extrapolateRight: "clamp",
      })}%, 0 ${interpolate(frame, [0, 15], [100, 0], {
        extrapolateRight: "clamp",
      })}%)`,
    }),
    exit: (frame, duration) => ({
      opacity: 1,
      clipPath: `polygon(0 ${interpolate(frame, [duration - 15, duration], [0, 100], {
        extrapolateLeft: "clamp",
      })}%, 100% ${interpolate(frame, [duration - 15, duration], [0, 100], {
        extrapolateLeft: "clamp",
      })}%, 100% 100%, 0 100%)`,
    }),
  },
  morphScale: {
    name: "Morph Scale",
    preview: "Morphing scale effect",
    isPro: true,
    enter: (frame) => ({
      transform: `scaleX(${interpolate(frame, [0, 5, 10, 15], [0, 2, 0.5, 1], {
        extrapolateRight: "clamp",
      })}) scaleY(${interpolate(frame, [0, 5, 10, 15], [0, 0.5, 2, 1], { extrapolateRight: "clamp" })})`,
      opacity: interpolate(frame, [0, 5], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `scaleX(${interpolate(frame, [duration - 15, duration - 10, duration - 5, duration], [1, 0.5, 2, 0], {
        extrapolateLeft: "clamp",
      })}) scaleY(${interpolate(frame, [duration - 15, duration - 10, duration - 5, duration], [1, 2, 0.5, 0], {
        extrapolateLeft: "clamp",
      })})`,
      opacity: interpolate(frame, [duration - 5, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  spiral: {
    name: "Spiral",
    preview: "Spiral entrance",
    isPro: true,
    enter: (frame) => ({
      transform: `rotate(${interpolate(frame, [0, 15], [0, 720], {
        extrapolateRight: "clamp",
      })}deg) scale(${interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      })})`,
      opacity: interpolate(frame, [0, 8], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `rotate(${interpolate(frame, [duration - 15, duration], [0, 720], {
        extrapolateLeft: "clamp",
      })}deg) scale(${interpolate(frame, [duration - 15, duration], [1, 0], {
        extrapolateLeft: "clamp",
      })})`,
      opacity: interpolate(frame, [duration - 8, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  accordion: {
    name: "Accordion",
    preview: "Accordion expand/collapse",
    enter: (frame) => ({
      transform: `scaleY(${interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      })})`,
      opacity: interpolate(frame, [0, 8], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `scaleY(${interpolate(frame, [duration - 15, duration], [1, 0], { extrapolateLeft: "clamp" })})`,
      opacity: interpolate(frame, [duration - 8, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  wobble: {
    name: "Wobble",
    preview: "Wobbling entrance",
    isPro: true,
    enter: (frame) => ({
      transform: `translateX(${interpolate(frame, [0, 3, 6, 9, 12, 15], [0, -25, 20, -15, 10, 0], {
        extrapolateRight: "clamp",
      })}px) rotate(${interpolate(frame, [0, 3, 6, 9, 12, 15], [0, -5, 3, -3, 1, 0], {
        extrapolateRight: "clamp",
      })}deg)`,
      opacity: interpolate(frame, [0, 3], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `translateX(${interpolate(
        frame,
        [duration - 15, duration - 12, duration - 9, duration - 6, duration - 3, duration],
        [0, 10, -15, 20, -25, 0],
        { extrapolateLeft: "clamp" },
      )}px) rotate(${interpolate(
        frame,
        [duration - 15, duration - 12, duration - 9, duration - 6, duration - 3, duration],
        [0, 1, -3, 3, -5, 0],
        { extrapolateLeft: "clamp" },
      )}deg)`,
      opacity: interpolate(frame, [duration - 3, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  jello: {
    name: "Jello",
    preview: "Jello wobble effect",
    isPro: true,
    enter: (frame) => ({
      transform: `skewX(${interpolate(frame, [0, 3, 6, 9, 12, 15], [0, -12.5, 6.25, -3.125, 1.5625, 0], {
        extrapolateRight: "clamp",
      })}deg) skewY(${interpolate(frame, [0, 3, 6, 9, 12, 15], [0, -12.5, 6.25, -3.125, 1.5625, 0], {
        extrapolateRight: "clamp",
      })}deg)`,
      opacity: interpolate(frame, [0, 3], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `skewX(${interpolate(
        frame,
        [duration - 15, duration - 12, duration - 9, duration - 6, duration - 3, duration],
        [0, 1.5625, -3.125, 6.25, -12.5, 0],
        { extrapolateLeft: "clamp" },
      )}deg) skewY(${interpolate(
        frame,
        [duration - 15, duration - 12, duration - 9, duration - 6, duration - 3, duration],
        [0, 1.5625, -3.125, 6.25, -12.5, 0],
        { extrapolateLeft: "clamp" },
      )}deg)`,
      opacity: interpolate(frame, [duration - 3, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  heartbeat: {
    name: "Heartbeat",
    preview: "Heartbeat pulse",
    enter: (frame) => ({
      transform: `scale(${interpolate(frame, [0, 4, 8, 12, 15], [0.8, 1.3, 1, 1.3, 1], {
        extrapolateRight: "clamp",
      })})`,
      opacity: interpolate(frame, [0, 4], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `scale(${interpolate(
        frame,
        [duration - 15, duration - 12, duration - 8, duration - 4, duration],
        [1, 1.3, 1, 1.3, 0.8],
        { extrapolateLeft: "clamp" },
      )})`,
      opacity: interpolate(frame, [duration - 4, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  hinge: {
    name: "Hinge",
    preview: "Hinge door effect",
    isPro: true,
    enter: (frame) => ({
      transform: `perspective(400px) rotateY(${interpolate(frame, [0, 15], [-90, 0], {
        extrapolateRight: "clamp",
      })}deg)`,
      transformOrigin: "left center",
      opacity: interpolate(frame, [0, 8], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `perspective(400px) rotateY(${interpolate(frame, [duration - 15, duration], [0, 90], {
        extrapolateLeft: "clamp",
      })}deg)`,
      transformOrigin: "left center",
      opacity: interpolate(frame, [duration - 8, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  rollIn: {
    name: "Roll In",
    preview: "Rolling entrance",
    isPro: true,
    enter: (frame) => ({
      transform: `translateX(${interpolate(frame, [0, 15], [-100, 0], {
        extrapolateRight: "clamp",
      })}px) rotate(${interpolate(frame, [0, 15], [-120, 0], {
        extrapolateRight: "clamp",
      })}deg)`,
      opacity: interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `translateX(${interpolate(frame, [duration - 15, duration], [0, 100], {
        extrapolateLeft: "clamp",
      })}px) rotate(${interpolate(frame, [duration - 15, duration], [0, 120], {
        extrapolateLeft: "clamp",
      })}deg)`,
      opacity: interpolate(frame, [duration - 15, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  zoomRotate: {
    name: "Zoom Rotate",
    preview: "Zoom with rotation",
    isPro: true,
    enter: (frame) => ({
      transform: `scale(${interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      })}) rotate(${interpolate(frame, [0, 15], [180, 0], {
        extrapolateRight: "clamp",
      })}deg)`,
      opacity: interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `scale(${interpolate(frame, [duration - 15, duration], [1, 0], {
        extrapolateLeft: "clamp",
      })}) rotate(${interpolate(frame, [duration - 15, duration], [0, -180], {
        extrapolateLeft: "clamp",
      })}deg)`,
      opacity: interpolate(frame, [duration - 15, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  bounceInDown: {
    name: "Bounce Down",
    preview: "Bounce from top",
    isPro: true,
    enter: (frame) => ({
      transform: `translateY(${interpolate(frame, [0, 6, 10, 13, 15], [-100, 25, -10, 5, 0], {
        extrapolateRight: "clamp",
      })}px)`,
      opacity: interpolate(frame, [0, 6], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `translateY(${interpolate(
        frame,
        [duration - 15, duration - 13, duration - 10, duration - 6, duration],
        [0, 5, -10, 25, -100],
        { extrapolateLeft: "clamp" },
      )}px)`,
      opacity: interpolate(frame, [duration - 6, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
  lightSpeed: {
    name: "Light Speed",
    preview: "Light speed entrance",
    isPro: true,
    enter: (frame) => ({
      transform: `translateX(${interpolate(frame, [0, 15], [100, 0], {
        extrapolateRight: "clamp",
      })}%) skewX(${interpolate(frame, [0, 15], [-30, 0], {
        extrapolateRight: "clamp",
      })}deg)`,
      opacity: interpolate(frame, [0, 15], [0, 1], {
        extrapolateRight: "clamp",
      }),
    }),
    exit: (frame, duration) => ({
      transform: `translateX(${interpolate(frame, [duration - 15, duration], [0, -100], {
        extrapolateLeft: "clamp",
      })}%) skewX(${interpolate(frame, [duration - 15, duration], [0, 30], {
        extrapolateLeft: "clamp",
      })}deg)`,
      opacity: interpolate(frame, [duration - 15, duration], [1, 0], {
        extrapolateLeft: "clamp",
      }),
    }),
  },
}
