import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

const offsets = {
  up: (d) => [{ translateY: d }],
  down: (d) => [{ translateY: -d }],
  left: (d) => [{ translateX: -d }],
  right: (d) => [{ translateX: d }],
  scale: () => [{ scale: 0.94 }],
};

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

// Anima a sus hijos cuando entran en el viewport (una sola vez)
export default function Reveal({ children, from = "up", delay = 0, duration = 700, distance = 24, style, ...props }) {
  const ref = useRef(null);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const node = ref.current;
    if (!(node instanceof Element) || typeof IntersectionObserver === "undefined" || prefersReducedMotion()) {
      progress.setValue(1);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        Animated.timing(progress, {
          toValue: 1,
          duration,
          delay,
          easing: Easing.bezier(0.22, 1, 0.36, 1),
          useNativeDriver: false,
        }).start();
        io.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [progress, delay, duration]);

  const start = offsets[from](distance);
  const transform = start.map((t) => {
    const [key, value] = Object.entries(t)[0];
    const end = key === "scale" ? 1 : 0;
    return { [key]: progress.interpolate({ inputRange: [0, 1], outputRange: [value, end] }) };
  });

  return (
    <Animated.View ref={ref} {...props} style={[style, { opacity: progress, transform }]}>
      {children}
    </Animated.View>
  );
}
