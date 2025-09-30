import type {
  CustomEventType,
  CustomEventMap,
  ThemeChangedDetail,
} from "../types";

/**
 * Dispatch a custom event
 */
export function dispatchCustomEvent<T extends CustomEventType>(
  eventType: T,
  detail?: T extends "themeChanged" ? ThemeChangedDetail : void
): void {
  const event = new CustomEvent(eventType, { detail });
  document.dispatchEvent(event);
}

/**
 * Listen to a custom event
 */
export function onCustomEvent<T extends CustomEventType>(
  eventType: T,
  handler: (event: CustomEventMap[T]) => void
): () => void {
  const listener = handler as EventListener;
  document.addEventListener(eventType, listener);

  // Return cleanup function
  return () => {
    document.removeEventListener(eventType, listener);
  };
}

/**
 * Event handlers for common actions
 */
export const eventHandlers = {
  toggleTheme: () => dispatchCustomEvent("toggleTheme"),
  themeChanged: (isDark: boolean) =>
    dispatchCustomEvent("themeChanged", { isDark }),
};

/**
 * Setup event listener with automatic cleanup on component unmount
 */
export function setupEventListener<T extends CustomEventType>(
  eventType: T,
  handler: (event: CustomEventMap[T]) => void
): void {
  const cleanup = onCustomEvent(eventType, handler);

  // Cleanup on page unload
  window.addEventListener("beforeunload", cleanup);
}
