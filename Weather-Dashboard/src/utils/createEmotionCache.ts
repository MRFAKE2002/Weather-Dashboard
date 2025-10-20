import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";

function createEmotionCache(direction: "ltr" | "rtl") {
  return createCache({
    key: direction === "rtl" ? "mui-rtl" : "mui",
    stylisPlugins: direction === "rtl" ? [rtlPlugin] : [],
    prepend: true,
  });
}

export default createEmotionCache;
