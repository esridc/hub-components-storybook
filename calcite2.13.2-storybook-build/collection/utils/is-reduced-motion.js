/**
 * Helper function to determine if the user has requested reduced motion
 * @returns
 */
export function isReducedMotion() {
  return window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
}
