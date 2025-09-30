export interface CarouselOptions {
  autoPlayInterval?: number;
  pauseOnHover?: boolean;
}

export class Carousel<T> {
  private items: T[];
  private currentIndex: number = 0;
  private intervalId: number | null = null;
  private options: Required<CarouselOptions>;
  private updateCallback: (item: T, index: number) => void;
  private indicatorCallback?: (index: number) => void;

  constructor(
    items: T[],
    updateCallback: (item: T, index: number) => void,
    options: CarouselOptions = {}
  ) {
    this.items = items;
    this.updateCallback = updateCallback;
    this.options = {
      autoPlayInterval: options.autoPlayInterval ?? 4000,
      pauseOnHover: options.pauseOnHover ?? true,
    };
  }

  /**
   * Set callback for indicator updates
   */
  setIndicatorCallback(callback: (index: number) => void): void {
    this.indicatorCallback = callback;
  }

  /**
   * Get current item
   */
  getCurrentItem(): T {
    return this.items[this.currentIndex];
  }

  /**
   * Get current index
   */
  getCurrentIndex(): number {
    return this.currentIndex;
  }

  /**
   * Get total items count
   */
  getItemsCount(): number {
    return this.items.length;
  }

  /**
   * Go to next item
   */
  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.update();
  }

  /**
   * Go to previous item
   */
  previous(): void {
    this.currentIndex =
      this.currentIndex === 0 ? this.items.length - 1 : this.currentIndex - 1;
    this.update();
  }

  /**
   * Go to specific index
   */
  goTo(index: number): void {
    if (index >= 0 && index < this.items.length) {
      this.currentIndex = index;
      this.update();
    }
  }

  /**
   * Update current item and indicators
   */
  private update(): void {
    this.updateCallback(this.getCurrentItem(), this.currentIndex);
    this.indicatorCallback?.(this.currentIndex);
  }

  /**
   * Start auto-play
   */
  start(): void {
    this.stop(); // Clear any existing interval
    this.update(); // Initial update

    if (this.options.autoPlayInterval > 0) {
      this.intervalId = window.setInterval(() => {
        this.next();
      }, this.options.autoPlayInterval);
    }
  }

  /**
   * Stop auto-play
   */
  stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Restart auto-play (useful after manual navigation)
   */
  restart(): void {
    this.stop();
    this.start();
  }

  /**
   * Setup hover pause functionality
   */
  setupHoverPause(element: HTMLElement): void {
    if (!this.options.pauseOnHover) return;

    element.addEventListener("mouseenter", () => this.stop());
    element.addEventListener("mouseleave", () => this.start());
  }

  /**
   * Destroy carousel and cleanup
   */
  destroy(): void {
    this.stop();
  }
}

/**
 * Create carousel indicators HTML
 */
export function createCarouselIndicators(
  count: number,
  currentIndex: number,
  onClickCallback: (index: number) => void
): string {
  return Array.from({ length: count })
    .map(
      (_, i) => `
      <button 
        class="carousel-indicator w-2 h-2 rounded-full transition-all duration-200 ${
          i === currentIndex ? "bg-accent" : "bg-muted-foreground/30"
        }" 
        data-index="${i}"
        aria-label="Go to item ${i + 1}"
      ></button>
    `
    )
    .join("");
}

/**
 * Setup carousel indicator click handlers
 */
export function setupIndicatorClickHandlers(
  container: HTMLElement,
  onClickCallback: (index: number) => void
): void {
  const indicators = container.querySelectorAll(".carousel-indicator");
  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      const index = parseInt(indicator.getAttribute("data-index") || "0");
      onClickCallback(index);
    });
  });
}
