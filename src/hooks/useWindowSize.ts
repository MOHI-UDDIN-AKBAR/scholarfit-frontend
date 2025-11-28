import { useState } from 'react';
import { useEventListener } from './useEventListener';

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<null | number>(null);
  useEventListener('resize', () => setWindowSize(window.innerWidth), window);

  return windowSize;
};
