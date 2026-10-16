import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "./Icon.jsx";
import Reveal from "./Reveal.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import { colors, font, maxWidth, radius } from "../../styles/theme.js";

export function T({ style, ...props }) {
  return <Text {...props} style={[styles.text, style]} />;
}

export function Container({ style, children, ...props }) {
  const { isMobile } = useBreakpoint();
  return (
    <View {...props} style={[styles.container, { paddingHorizontal: isMobile ? 16 : 32 }, style]}>
      {children}
    </View>
  );
}

export function Eyebrow({ children, light, style }) {
  return (
    <View style={[styles.eyebrow, light && styles.eyebrowLight, style]}>
      <View style={[styles.eyebrowDot, light && { backgroundColor: colors.accentLight }]} />
      <T style={[styles.eyebrowText, light && { color: colors.accentLight }]}>{children}</T>
    </View>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, light, align = "center" }) {
  const { isMobile } = useBreakpoint();
  const centered = align === "center";
  return (
    <View style={[styles.heading, centered && { alignItems: "center" }]}>
      {eyebrow ? (
        <Reveal distance={16}>
          <Eyebrow light={light}>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}
      <Reveal delay={80} style={{ width: "100%" }}>
        <T
          accessibilityRole="header"
          aria-level={2}
          style={[
            styles.headingTitle,
            { fontSize: isMobile ? 30 : 40, lineHeight: isMobile ? 37 : 48 },
            centered && { textAlign: "center" },
            light && { color: colors.white },
          ]}
        >
          {title}
        </T>
      </Reveal>
      {subtitle ? (
        <Reveal delay={160} style={{ width: "100%" }}>
          <T style={[styles.headingSubtitle, centered && { textAlign: "center" }, light && { color: "rgba(255,255,255,0.72)" }]}>
            {subtitle}
          </T>
        </Reveal>
      ) : null}
    </View>
  );
}

export function Button({ label, onPress, variant = "primary", icon, size = "md", style }) {
  const sizes = size === "lg" ? styles.btnLg : size === "sm" ? styles.btnSm : styles.btnMd;
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={style}>
      {({ hovered, pressed }) => {
        const v = variants[variant];
        return (
          <View
            style={[
              styles.btn,
              sizes,
              v.box,
              hovered && v.hover,
              { transform: [{ translateY: hovered ? -1 : 0 }, { scale: pressed ? 0.98 : 1 }] },
            ]}
          >
            <T style={[styles.btnText, size === "sm" && { fontSize: 14 }, v.text]}>{label}</T>
            {icon ? (
              <Icon
                name={icon}
                size={size === "sm" ? 16 : 18}
                color={v.iconColor}
                style={{ transform: [{ translateX: hovered ? 3 : 0 }], transitionDuration: "200ms" }}
              />
            ) : null}
          </View>
        );
      }}
    </Pressable>
  );
}

const variants = {
  primary: {
    box: { backgroundColor: colors.primary, boxShadow: "0 1px 2px rgba(6,13,28,0.12), 0 8px 20px rgba(13,148,136,0.28)" },
    hover: { backgroundColor: colors.primaryDark },
    text: { color: colors.white },
    iconColor: colors.white,
  },
  teal: {
    box: { backgroundColor: colors.accentLight, boxShadow: "0 8px 24px rgba(94,234,212,0.25)" },
    hover: { backgroundColor: colors.white },
    text: { color: colors.brand900 },
    iconColor: colors.brand900,
  },
  ghost: {
    box: { borderWidth: 1, borderColor: "rgba(255,255,255,0.28)", backgroundColor: "rgba(255,255,255,0.06)" },
    hover: { backgroundColor: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.5)" },
    text: { color: colors.white },
    iconColor: colors.white,
  },
  white: {
    box: { backgroundColor: colors.white },
    hover: { backgroundColor: colors.primary50 },
    text: { color: colors.ink },
    iconColor: colors.ink,
  },
};

const styles = StyleSheet.create({
  text: { fontFamily: font, color: colors.ink },
  container: { width: "100%", maxWidth, marginHorizontal: "auto" },
  eyebrow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: 18,
  },
  eyebrowLight: { backgroundColor: "rgba(94,234,212,0.08)", borderColor: "rgba(94,234,212,0.25)" },
  eyebrowDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.accent },
  eyebrowText: { fontSize: 11.5, fontWeight: "700", letterSpacing: 1.4, color: colors.primaryDark, textTransform: "uppercase" },
  heading: { marginBottom: 52, maxWidth: 720, width: "100%", alignSelf: "center" },
  headingTitle: { fontWeight: "800", letterSpacing: -1.2, color: colors.ink },
  headingSubtitle: { marginTop: 14, fontSize: 17, lineHeight: 28, color: colors.body },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: radius.pill,
    transitionDuration: "200ms",
  },
  btnSm: { paddingVertical: 9, paddingHorizontal: 16, gap: 8 },
  btnMd: { paddingVertical: 12, paddingHorizontal: 22 },
  btnLg: { paddingVertical: 16, paddingHorizontal: 30 },
  btnText: { fontSize: 15, fontWeight: "700", letterSpacing: -0.1 },
});
