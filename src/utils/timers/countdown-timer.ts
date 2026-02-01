export type CountdownCallbacks = {
  onTick?: (secondsLeft: number) => void;
  onComplete?: () => void;
};

export class CountdownTimer {
  private duration: number;
  private remaining: number;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private startTimestamp: number | null = null;

  private onTick?: (secondsLeft: number) => void;
  private onComplete?: () => void;

  constructor(seconds: number, callbacks?: CountdownCallbacks) {
    this.duration = seconds;
    this.remaining = seconds;

    this.onTick = callbacks?.onTick;
    this.onComplete = callbacks?.onComplete;
  }

  start() {
    if (this.intervalId) return;

    this.startTimestamp = Date.now();

    this.intervalId = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.startTimestamp!) / 1000);
      const secondsLeft = this.duration - elapsed;

      this.remaining = Math.max(secondsLeft, 0);

      this.onTick?.(this.remaining);

      if (this.remaining <= 0) {
        this.stop();
        this.onComplete?.();
      }
    }, 250);
  }

  pause() {
    if (!this.intervalId) return;

    clearInterval(this.intervalId);
    this.intervalId = null;

    const elapsed = Math.floor((Date.now() - (this.startTimestamp ?? 0)) / 1000);
    this.remaining = Math.max(this.duration - elapsed, 0);
  }

  resume() {
    if (this.intervalId) return;

    this.duration = this.remaining;
    this.startTimestamp = Date.now();
    this.start();
  }

  stop() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = null;
  }

  reset(seconds: number) {
    this.stop();
    this.duration = seconds;
    this.remaining = seconds;
  }

  get timeLeft() {
    return this.remaining;
  }
}

export type Timer = InstanceType<typeof CountdownTimer>;
