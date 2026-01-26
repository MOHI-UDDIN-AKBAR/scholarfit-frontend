import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export type ConfettiOptions = {
  particleCount?: number;
  angle?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  ticks?: number;
  origin?: { x?: number; y?: number };
  colors?: string[];
  shapes?: ('circle' | 'square')[];
  scalar?: number;
  zIndex?: number;
  disableForReducedMotion?: boolean;
};

export type ConfettiFunction = (options?: ConfettiOptions) => void;

const useConfetti = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiInstance = useRef<ReturnType<typeof confetti.create> | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      confettiInstance.current = confetti.create(canvasRef.current, {
        resize: true,
        useWorker: true,
      });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        confettiInstance.current?.reset();
      };
    }
  }, []);

  const burst: ConfettiFunction = (options = {}) => {
    if (!confettiInstance.current) return;

    const defaults: ConfettiOptions = {
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.6 },
      colors: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444'],
    };

    confettiInstance.current({
      ...defaults,
      ...options,
    });
  };

  const schoolPride: ConfettiFunction = (options = {}) => {
    if (!confettiInstance.current) return;

    const defaults: ConfettiOptions = {
      particleCount: 150,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.5 },
      colors: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444'],
    };

    const defaults2: ConfettiOptions = {
      ...defaults,
      angle: 120,
      origin: { x: 1, y: 0.5 },
    };

    confettiInstance.current({
      ...defaults,
      ...options,
    });

    confettiInstance.current({
      ...defaults2,
      ...options,
    });
  };

  const realistic: ConfettiFunction = (options = {}) => {
    if (!confettiInstance.current) return;

    const defaults: ConfettiOptions = {
      particleCount: 150,
      angle: 90,
      spread: 100,
      startVelocity: 45,
      decay: 0.9,
      gravity: 1,
      drift: 0,
      ticks: 200,
      origin: { x: 0.5, y: 0.35 },
      colors: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444'],
      shapes: ['circle', 'square'],
    };

    confettiInstance.current({
      ...defaults,
      ...options,
    });
  };

  const fireworks: ConfettiFunction = (options = {}) => {
    if (!confettiInstance.current) return;

    const end = Date.now() + 3 * 1000;
    const defaults: ConfettiOptions = {
      particleCount: 50,
      spread: 50,
      startVelocity: 30,
      decay: 0.85,
      gravity: 1,
      drift: 0,
      ticks: 200,
      origin: { x: 0.5, y: 0.35 },
      colors: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444'],
    };

    const frame = () => {
      confettiInstance.current?.({
        ...defaults,
        ...options,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.5,
        },
      });

      if (Date.now() < end) {
        animationFrameRef.current = requestAnimationFrame(frame);
      } else {
        animationFrameRef.current = null;
      }
    };

    frame();
  };

  const sideCannons: ConfettiFunction = (options = {}) => {
    if (!confettiInstance.current) return;

    const defaults: ConfettiOptions = {
      particleCount: 100,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.5 },
      colors: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444'],
    };

    const defaults2: ConfettiOptions = {
      ...defaults,
      angle: 120,
      origin: { x: 1, y: 0.5 },
    };

    confettiInstance.current({ ...defaults, ...options });
    confettiInstance.current({ ...defaults2, ...options });
  };

  const celebration = () => {
    burst();

    setTimeout(() => {
      schoolPride();
    }, 250);

    setTimeout(() => {
      realistic();
    }, 500);
  };

  const clear = () => {
    if (confettiInstance.current) {
      confettiInstance.current.reset();
    }
  };

  return {
    canvasRef,
    burst,
    schoolPride,
    realistic,
    fireworks,
    sideCannons,
    celebration,
    clear,
  };
};

export default useConfetti;
