import { useEffect, useRef } from "react";
import { Animated, Easing, Image, ImageBackground, StyleSheet, View } from "react-native";
import DashboardMockup from "./DashboardMockup.jsx";
import Icon from "../ui/Icon.jsx";
import { Button, Container, Eyebrow, T } from "../ui/primitives.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import scrollTo from "../../utils/scrollTo.js";
import heroBg from "../../assets/hero-bg.svg";
import heroPhoto from "../../assets/photos/hero-surgery.jpg";
import docA from "../../assets/photos/doctor-scrubs.jpg";
import docB from "../../assets/photos/doctor-teal.jpg";
import docC from "../../assets/photos/doctor-portrait.jpg";
import { colors, radius } from "../../styles/theme.js";

const highlights = [
  { icon: "zap", title: "Real-time alerts", text: "Instant push to every unit", color: colors.red500, tint: colors.red100 },
  {
    icon: "clipboard",
    title: "Structured intake",
    text: "One form, zero re-typing",
    color: colors.primary,
    tint: colors.primary50,
  },
  { icon: "users", title: "Departments in sync", text: "Beds, pharmacy, imaging", color: colors.amber600, tint: colors.amber100 },
  { icon: "clock", title: "24/7 operations", text: "Always-on readiness", color: colors.accentDark, tint: colors.accent100 },
];

function useFadeIn(delay = 0) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(v, { toValue: 1, duration: 800, delay, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
  }, [v, delay]);
  return {
    opacity: v,
    transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }],
  };
}

export default function Hero() {
  const { isMobile, isDesktop } = useBreakpoint();
  const textAnim = useFadeIn(100);
  const mockAnim = useFadeIn(350);

  return (
    <>
      <ImageBackground source={{ uri: heroPhoto }} resizeMode="cover" style={[styles.bg, { paddingBottom: isMobile ? 96 : 140 }]}>
        <Image source={{ uri: heroBg }} resizeMode="cover" style={StyleSheet.absoluteFill} />
        <Container style={[styles.inner, { paddingTop: isMobile ? 120 : 160, flexDirection: isDesktop ? "row" : "column" }]}>
          <Animated.View style={[styles.copy, isDesktop ? { flex: 1.2, paddingRight: 56 } : { alignItems: "center" }, textAnim]}>
            <Eyebrow light style={!isDesktop && { alignSelf: "center" }}>
              Hospital Intelligence Platform
            </Eyebrow>
            <T
              accessibilityRole="header"
              aria-level={1}
              style={[
                styles.title,
                { fontSize: isMobile ? 38 : isDesktop ? 58 : 50, lineHeight: isMobile ? 44 : isDesktop ? 64 : 56 },
                !isDesktop && { textAlign: "center" },
              ]}
            >
              The hospital is ready <T style={styles.titleAccent}>before the patient arrives.</T>
            </T>
            <T style={[styles.subtitle, !isDesktop && { textAlign: "center" }]}>
              HIP turns the EMS call-ahead into one structured, real-time workflow — pushing bed, equipment and pharmacy requests
              to every department the moment they're entered. No phone chains. No paper notes. No missed steps.
            </T>
            <View style={[styles.ctas, isMobile && { flexDirection: "column", alignSelf: "stretch" }]}>
              <Button label="Request a demo" icon="arrowRight" size="lg" variant="teal" onPress={() => scrollTo("contact")} />
              <Button label="See how it works" size="lg" variant="ghost" onPress={() => scrollTo("how-it-works")} />
            </View>
            <View style={[styles.team, !isDesktop && { alignSelf: "center" }]}>
              <View style={styles.avatars}>
                {[docA, docB, docC].map((src, i) => (
                  <Image key={i} source={{ uri: src }} style={[styles.avatar, i > 0 && { marginLeft: -14 }]} />
                ))}
              </View>
              <T style={styles.teamText}>
                Built for <T style={{ color: colors.white, fontWeight: "700" }}>ER physicians, nurses</T>
                {"\n"}and every department behind them
              </T>
            </View>
            <View style={[styles.trust, !isDesktop && { justifyContent: "center" }]}>
              {["Secure by design", "Role-based access", "Full audit trail"].map((t) => (
                <View key={t} style={styles.trustItem}>
                  <Icon name="shield" size={16} color={colors.accentLight} />
                  <T style={styles.trustText}>{t}</T>
                </View>
              ))}
            </View>
          </Animated.View>

          <Animated.View style={[{ flex: isDesktop ? 1 : undefined, width: "100%", marginTop: isDesktop ? 0 : 56 }, mockAnim]}>
            <DashboardMockup compact={isMobile} />
          </Animated.View>
        </Container>
      </ImageBackground>

      {/* barra de highlights: tarjeta blanca solapada con el borde inferior del hero */}
      <View style={styles.stripSection}>
        <Container>
          <View style={[styles.strip, { flexDirection: isDesktop ? "row" : "column", marginTop: isMobile ? -48 : -72 }]}>
            <View
              style={[
                styles.stripGrid,
                { flexDirection: isMobile ? "column" : "row", flexWrap: !isMobile && !isDesktop ? "wrap" : "nowrap" },
              ]}
            >
              {highlights.map((h, i) => (
                <View
                  key={h.title}
                  style={[
                    styles.stripItem,
                    isDesktop && i > 0 && styles.stripDivider,
                    isMobile && i > 0 && { borderTopWidth: 1, borderTopColor: colors.line, paddingVertical: 18 },
                    isMobile && i === 0 && { paddingVertical: 18 },
                    !isMobile && !isDesktop && { flexBasis: "50%" },
                  ]}
                >
                  <View style={[styles.stripIcon, { backgroundColor: h.tint }]}>
                    <Icon name={h.icon} size={22} color={h.color} strokeWidth={2.2} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <T style={styles.stripTitle}>{h.title}</T>
                    <T style={styles.stripText}>{h.text}</T>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </Container>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bg: { width: "100%", backgroundColor: colors.brand900, overflow: "hidden" },
  inner: { alignItems: "center" },
  copy: { width: "100%" },
  title: { fontWeight: "800", color: colors.white, letterSpacing: -1.5 },
  titleAccent: { color: colors.accentLight },
  subtitle: { marginTop: 22, fontSize: 17, lineHeight: 28, color: "rgba(255,255,255,0.75)", maxWidth: 560 },
  ctas: { flexDirection: "row", gap: 14, marginTop: 36 },
  team: { flexDirection: "row", alignItems: "center", gap: 14, marginTop: 32 },
  avatars: { flexDirection: "row" },
  avatar: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: colors.brand700 },
  teamText: { fontSize: 13, lineHeight: 19, color: "rgba(255,255,255,0.7)" },
  trust: { flexDirection: "row", flexWrap: "wrap", gap: 22, marginTop: 24 },
  trustItem: { flexDirection: "row", alignItems: "center", gap: 8 },
  trustText: { fontSize: 13, fontWeight: "600", color: "rgba(255,255,255,0.7)" },
  stripSection: { backgroundColor: colors.white, position: "relative", zIndex: 2 },
  strip: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    boxShadow: "0 30px 70px rgba(6,13,28,0.16)",
    borderWidth: 1,
    borderColor: colors.line,
    overflow: "hidden",
  },
  stripGrid: { flex: 1 },
  stripItem: { flex: 1, flexDirection: "row", alignItems: "center", gap: 14, paddingVertical: 24, paddingHorizontal: 22 },
  stripDivider: { borderLeftWidth: 1, borderLeftColor: colors.line },
  stripIcon: { width: 48, height: 48, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  stripTitle: { fontSize: 16, fontWeight: "800", color: colors.ink },
  stripText: { fontSize: 13, color: colors.muted, marginTop: 3 },
});
