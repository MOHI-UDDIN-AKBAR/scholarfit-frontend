import { useEffect, forwardRef, useImperativeHandle, useMemo } from 'react';
import type { ConfettiOptions } from '../../../hooks/useConfetti';
import useConfetti from '../../../hooks/useConfetti';

interface ConfettiProps {
  autoTrigger?: boolean;
  effect?: 'burst' | 'schoolPride' | 'realistic' | 'fireworks' | 'sideCannons' | 'celebration';
  options?: ConfettiOptions;
  duration?: number;
  debug?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
}

export interface ConfettiRef {
  trigger: (customEffect?: keyof EffectMap) => void;
  clear: () => void;
}

type EffectMap = {
  burst: ReturnType<typeof useConfetti>['burst'];
  schoolPride: ReturnType<typeof useConfetti>['schoolPride'];
  realistic: ReturnType<typeof useConfetti>['realistic'];
  fireworks: ReturnType<typeof useConfetti>['fireworks'];
  sideCannons: ReturnType<typeof useConfetti>['sideCannons'];
  celebration: ReturnType<typeof useConfetti>['celebration'];
};

const Confetti = forwardRef<ConfettiRef, ConfettiProps>(
  (
    {
      autoTrigger = false,
      effect = 'celebration',
      options = {},
      duration = 3000,
      debug = false,
      onStart,
      onEnd,
    },
    ref
  ) => {
    const { canvasRef, burst, schoolPride, realistic, fireworks, sideCannons, celebration, clear } =
      useConfetti();

    const effectMap = useMemo<EffectMap>(
      () => ({
        burst,
        schoolPride,
        realistic,
        fireworks,
        sideCannons,
        celebration,
      }),
      [burst, schoolPride, realistic, fireworks, sideCannons, celebration]
    );

    useEffect(() => {
      if (autoTrigger) {
        onStart?.();

        if (effect === 'fireworks') {
          fireworks({ ...options });
          setTimeout(() => onEnd?.(), duration);
        } else if (effect === 'celebration') {
          celebration();
          setTimeout(() => onEnd?.(), 1000);
        } else {
          const confettiFunc = effectMap[effect];
          confettiFunc(options);
          setTimeout(() => onEnd?.(), 1000);
        }
      }

      return () => {
        clear();
      };
    }, [autoTrigger, effect, options, duration, onStart, onEnd, fireworks, celebration, effectMap]);

    const trigger = (customEffect?: keyof EffectMap) => {
      onStart?.();

      if (customEffect || effect) {
        const confettiFunc = effectMap[customEffect || effect];
        confettiFunc(options);
      }

      if (effect !== 'fireworks') {
        setTimeout(() => onEnd?.(), 1000);
      }
    };

    useImperativeHandle(ref, () => ({
      trigger,
      clear,
    }));

    return (
      <div className="fixed inset-0 z-50 pointer-events-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{
            opacity: debug ? 1 : 1,
            pointerEvents: 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 9999,
          }}
        />
      </div>
    );
  }
);

Confetti.displayName = 'Confetti';

export default Confetti;
