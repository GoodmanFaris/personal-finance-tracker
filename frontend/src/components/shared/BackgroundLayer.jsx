"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export default function BackgroundLayer() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  // Dok nije mounted, stavi light (da ne bude hydration mismatch / flicker)
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <>
      {/* Background image */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${isDark ? "/background_dark.jpg" : "/background_light.jpg"}')`,
        }}
      />

      {/* Overlay */}
      <div
        className="fixed inset-0 -z-10 backdrop-blur-[2px]"
        style={{
          backgroundColor: isDark
            ? "rgba(0,0,0,0.60)"
            : "rgba(255,255,255,0.55)",
        }}
      />
    </>
  );
}
