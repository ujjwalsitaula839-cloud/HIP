import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, StyleSheet, View } from "react-native";
import Logo from "./Logo.jsx";
import Icon from "../ui/Icon.jsx";
import { Button, Container, T } from "../ui/primitives.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import scrollTo from "../../utils/scrollTo.js";
import { colors } from "../../styles/theme.js";

const links = [
  { id: "problem", label: "Problem" },
  { id: "how-it-works", label: "How it works" },
  { id: "departments", label: "Departments" },
  { id: "impact", label: "Impact" },
  { id: "roles", label: "Teams" },
];

export default function Navbar() {
  const { isDesktop } = useBreakpoint();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const menu = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 24);
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
      // sección activa: la última cuyo inicio ya pasó bajo la barra
      let current = null;
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= 140) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    Animated.timing(menu, {
      toValue: open ? 1 : 0,
      duration: 260,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [open, menu]);

  useEffect(() => {
    if (isDesktop) setOpen(false);
  }, [isDesktop]);

  const light = scrolled || open;
  const go = (id) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <View style={[styles.bar, { paddingTop: scrolled ? 10 : 16 }]}>
      <Container>
        <View style={[styles.shell, light ? styles.shellLight : styles.shellDark]}>
          <View style={styles.row}>
            <Pressable onPress={() => window.scrollTo({ top: 0, behavior: "smooth" })} accessibilityLabel="HIP home">
              <Logo light={!light} compact />
            </Pressable>

            {isDesktop ? (
              <View style={styles.links}>
                {links.map((l) => {
                  const isActive = active === l.id;
                  return (
                    <Pressable key={l.id} onPress={() => go(l.id)}>
                      {({ hovered }) => (
                        <View style={styles.link}>
                          <T
                            style={[
                              styles.linkText,
                              { color: light ? colors.body : "rgba(255,255,255,0.75)" },
                              (isActive || hovered) && { color: light ? colors.ink : colors.white },
                            ]}
                          >
                            {l.label}
                          </T>
                          <View
                            style={[
                              styles.underline,
                              { width: isActive ? 18 : hovered ? 8 : 0, opacity: isActive || hovered ? 1 : 0 },
                            ]}
                          />
                        </View>
                      )}
                    </Pressable>
                  );
                })}
              </View>
            ) : null}

            {isDesktop ? (
              <Button
                label="Request a demo"
                icon="arrowRight"
                size="sm"
                variant={light ? "primary" : "white"}
                onPress={() => go("contact")}
              />
            ) : (
              <Pressable
                onPress={() => setOpen((o) => !o)}
                accessibilityLabel={open ? "Close menu" : "Open menu"}
                style={[styles.burger, light && { backgroundColor: colors.page, borderColor: colors.line }]}
              >
                <Icon name={open ? "close" : "menu"} size={20} color={light ? colors.ink : colors.white} />
              </Pressable>
            )}
          </View>

          {!isDesktop ? (
            <Animated.View
              pointerEvents={open ? "auto" : "none"}
              style={{
                overflow: "hidden",
                maxHeight: menu.interpolate({ inputRange: [0, 1], outputRange: [0, 420] }),
                opacity: menu,
              }}
            >
              <View style={styles.mobileMenu}>
                {links.map((l) => (
                  <Pressable key={l.id} onPress={() => go(l.id)} style={styles.mobileLink}>
                    <T style={[styles.mobileLinkText, active === l.id && { color: colors.primary }]}>{l.label}</T>
                    <Icon name="arrowRight" size={16} color={active === l.id ? colors.primary : colors.muted} />
                  </Pressable>
                ))}
                <Button label="Request a demo" icon="arrowRight" onPress={() => go("contact")} style={{ marginTop: 14 }} />
              </View>
            </Animated.View>
          ) : null}

          {/* progreso de lectura */}
          {scrolled ? (
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
          ) : null}
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    transitionDuration: "300ms",
    transitionProperty: "padding",
  },
  shell: {
    paddingVertical: 8,
    paddingLeft: 14,
    paddingRight: 8,
    borderRadius: 18,
    borderWidth: 1,
    overflow: "hidden",
    backdropFilter: "saturate(180%) blur(16px)",
    transitionDuration: "300ms",
    transitionProperty: "background-color, border-color, box-shadow",
  },
  shellDark: { backgroundColor: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.12)" },
  shellLight: {
    backgroundColor: "rgba(255,255,255,0.88)",
    borderColor: colors.line,
    boxShadow: "0 1px 2px rgba(6,13,28,0.04), 0 12px 32px rgba(6,13,28,0.08)",
  },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", minHeight: 44 },
  links: { flexDirection: "row", gap: 30 },
  link: { alignItems: "center", paddingVertical: 6 },
  linkText: { fontSize: 14, fontWeight: "600", transitionDuration: "200ms" },
  underline: {
    position: "absolute",
    bottom: -2,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.accent,
    transitionDuration: "250ms",
    transitionProperty: "width, opacity",
  },
  burger: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
  },
  mobileMenu: { paddingTop: 10, paddingBottom: 8, paddingRight: 6 },
  mobileLink: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  mobileLinkText: { fontSize: 15, fontWeight: "700", color: colors.ink },
  progressTrack: { position: "absolute", left: 0, right: 0, bottom: 0, height: 2 },
  progressFill: { height: 2, backgroundColor: colors.accent },
});
