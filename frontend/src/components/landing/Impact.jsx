import { Image, ImageBackground, StyleSheet, View } from "react-native";
import Icon from "../ui/Icon.jsx";
import Reveal from "../ui/Reveal.jsx";
import { Container, SectionHeading, T } from "../ui/primitives.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import bandBg from "../../assets/band-bg.svg";
import orPhoto from "../../assets/photos/impact-or.jpg";
import { colors, radius } from "../../styles/theme.js";

const stats = [
  { icon: "clipboard", value: "1", label: "structured intake", sub: "replaces a chain of phone calls" },
  { icon: "users", value: "6+", label: "departments notified", sub: "simultaneously, not one by one" },
  { icon: "zap", value: "Real-time", label: "readiness tracking", sub: "live status for every team" },
  { icon: "clock", value: "24/7", label: "always on", sub: "built for round-the-clock care" },
];

const pillars = [
  { icon: "zap", title: "Faster decisions", text: "Teams act on complete information the second it exists." },
  { icon: "clipboard", title: "Fewer missed steps", text: "A guided workflow makes sure nothing falls through the cracks." },
  { icon: "heartPulse", title: "Better-coordinated care", text: "Everyone works from the same live picture of the patient." },
];

export default function Impact() {
  const { isMobile, isDesktop } = useBreakpoint();

  return (
    <ImageBackground
      id="impact"
      source={{ uri: orPhoto }}
      resizeMode="cover"
      style={[styles.bg, { paddingVertical: isMobile ? 72 : 110 }]}
    >
      <Image source={{ uri: bandBg }} resizeMode="cover" style={StyleSheet.absoluteFill} />
      <Container>
        <SectionHeading light eyebrow="Impact" title="Faster decisions. Fewer missed steps. Better-coordinated care." />

        <View
          style={[
            styles.stats,
            { flexDirection: isMobile ? "column" : "row", flexWrap: !isMobile && !isDesktop ? "wrap" : "nowrap" },
          ]}
        >
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} style={[{ flex: 1 }, !isMobile && !isDesktop && { flexBasis: "46%" }]}>
              <View style={styles.stat}>
                <View style={styles.statAccent} />
                <View style={styles.statIcon}>
                  <Icon name={s.icon} size={22} color={colors.accentLight} />
                </View>
                <T style={styles.statValue}>{s.value}</T>
                <T style={styles.statLabel}>{s.label}</T>
                <T style={styles.statSub}>{s.sub}</T>
              </View>
            </Reveal>
          ))}
        </View>

        <View style={[styles.pillars, { flexDirection: isDesktop ? "row" : "column" }]}>
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 100} style={styles.pillar}>
              <View style={styles.pillarIcon}>
                <Icon name={p.icon} size={18} color={colors.white} />
              </View>
              <View style={{ flex: 1 }}>
                <T style={styles.pillarTitle}>{p.title}</T>
                <T style={styles.pillarText}>{p.text}</T>
              </View>
            </Reveal>
          ))}
        </View>
      </Container>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { width: "100%", backgroundColor: colors.brand800 },
  stats: { gap: 18 },
  statAccent: {
    position: "absolute",
    top: 0,
    left: 26,
    width: 40,
    height: 3,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    backgroundColor: colors.accentLight,
  },
  stat: {
    height: "100%",
    overflow: "hidden",
    padding: 26,
    borderRadius: radius.lg,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "rgba(94,234,212,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  statValue: { fontSize: 40, fontWeight: "800", color: colors.white, letterSpacing: -1 },
  statLabel: { fontSize: 15, fontWeight: "700", color: colors.accentLight, marginTop: 4 },
  statSub: { fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 6 },
  pillars: { gap: 18, marginTop: 40, paddingTop: 40, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.12)" },
  pillar: { flex: 1, flexDirection: "row", gap: 14 },
  pillarIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  pillarTitle: { fontSize: 17, fontWeight: "800", color: colors.white },
  pillarText: { fontSize: 14, lineHeight: 22, color: "rgba(255,255,255,0.65)", marginTop: 4 },
});
