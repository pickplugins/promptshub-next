// lib/fpixel.js
export const FB_PIXEL_ID = "1384855716349155";

// Track a page view
export const pageview = () => {
  if (typeof window.fbq !== "undefined") {
    window.fbq("track", "PageView");
  }
};

// Track specific events
export const event = (name, options = {}) => {
  if (typeof window.fbq !== "undefined") {
    window.fbq("track", name, options);
  }
};
