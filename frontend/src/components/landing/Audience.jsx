import { Image, Pressable, StyleSheet, View } from "react-native";
import Icon from "../ui/Icon.jsx";
import Reveal from "../ui/Reveal.jsx";
import { Container, SectionHeading, T } from "../ui/primitives.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import scrollTo from "../../utils/scrollTo.js";
import erDoctor from "../../assets/photos/doctor-scrubs.jpg";
import deptTeam from "../../assets/photos/doctor-teal.jpg";
import leader from "../../assets/photos/doctor-portrait.jpg";
import fade from "../../assets/photo-fade.svg";
import { colors, radius, shadow } from "../../styles/theme.js";

const roles = [
  {
    icon: "heartPulse",
    tag: "Emergency Room",
    role: "ER physicians & nurses",
    quote: "Enter the case once and get back to the patient.",
    points: ["Guided intake in seconds", "Live readiness board", "ETA countdown per case"],
    photo: erDoctor,
    accent: colors.red500,
    tint: colors.red100,
  },
  {
    icon: "users",
    tag: "Departments",
    role: "Department teams",
    quote: "Know what's coming before the phone would have rung.",
    points: ["Targeted, relevant alerts", "One-tap confirmations", "Clear task ownership"],
    photo: deptTeam,
    accent: colors.primary,
    tint: colors.primary50,
  },
  {
    icon: "dashboard",
    tag: "Operations",
    role: "Hospital leadership",
    quote: "See how the whole hospital responds, in real time.",
    points: ["Cross-department visibility", "Time-stamped audit trail", "Bottleneck insights"],
    photo: leader,
    accent: colors.accent,
    tint: colors.accent100,
  },
];

export default function Audience() {
  const { isMobile, isDesktop } = useBreakpoint();

  return (
    <View id="roles" style={[styles.section, { paddingVertical: isMobile ? 64 : 104 }]}>
      <Container>
        <SectionHeading
          eyebrow="Built for every role"
          title="The right view for every team"
          subtitle="From the ER floor to the operations office, HIP gives each person the information they act on — nothing more, nothing less."
        />
        <View style={[styles.grid, { flexDirection: isDesktop ? "row" : "column" }]}>
          {roles.map((r, i) => (
            <Reveal key={r.role} delay={i * 120} style={{ flex: 1 }}>
              <Pressable style={{ flex: 1 }} onPress={() => scrollTo("contact")}>
                {({ hovered }) => (
                  <View style={[styles.card, hovered && styles.cardHover]}>
                    <View style={styles.photoWrap}>
                      <Image
                        source={{ uri: r.photo }}
                        resizeMode="cover"
                        accessibilityLabel={r.role}
                        style={[styles.photo, { transform: [{ scale: hovered ? 1.05 : 1 }] }]}
                      />
                      <Image source={{ uri: fade }} resizeMode="stretch" style={StyleSheet.absoluteFill} />
                      <View style={styles.tag}>
                        <Icon name={r.icon} size={14} color={r.accent} strokeWidth={2.5} />
                        <T style={styles.tagText}>{r.tag}</T>
                      </View>
                      <View style={styles.photoCaption}>
                        <View style={[styles.captionBar, { backgroundColor: r.accent }]} />
                        <T style={styles.role}>{r.role}</T>
                      </View>
                    </View>

                    <View style={styles.body}>
                      <View style={styles.quoteRow}>
                        <T style={[styles.quoteMark, { color: r.accent }]}>“</T>
                        <T style={styles.quote}>{r.quote}</T>
                      </View>

                      <T style={styles.listLabel}>WHAT THEY GET</T>
                      {r.points.map((p) => (
                        <View key={p} style={styles.point}>
                          <View style={[styles.check, { backgroundColor: r.tint }]}>
                            <Icon name="check" size={12} color={r.accent} strokeWidth={3} />
                          </View>
                          <T style={styles.pointText}>{p}</T>
                        </View>
                      ))}

                      <View style={styles.footer}>
                        <T style={[styles.footerText, { color: hovered ? r.accent : colors.brand700 }]}>
                          See this view in a demo
                        </T>
                        <View style={[styles.arrow, { backgroundColor: hovered ? r.accent : colors.page }]}>
                          <Icon name="arrowRight" size={16} color={hovered ? colors.white : colors.brand700} />
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </Pressable>
            </Reveal>
          ))}
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { backgroundColor: colors.page },
  grid: { gap: 24 },
  card: {
    height: "100%",
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    boxShadow: shadow.card,
    overflow: "hidden",
    transitionDuration: "300ms",
  },
  cardHover: { transform: [{ translateY: -8 }], boxShadow: "0 30px 60px rgba(6,13,28,0.16)" },
  photoWrap: { width: "100%", aspectRatio: 900 / 760, overflow: "hidden", backgroundColor: colors.primary50 },
  photo: { width: "100%", height: "100%", transitionDuration: "600ms" },
  tag: {
    position: "absolute",
    top: 16,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.94)",
    backdropFilter: "blur(8px)",
    boxShadow: "0 6px 16px rgba(6,13,28,0.12)",
  },
  tagText: { fontSize: 11, fontWeight: "800", letterSpacing: 0.8, textTransform: "uppercase", color: colors.brand700 },
  photoCaption: { position: "absolute", left: 22, right: 22, bottom: 20 },
  captionBar: { width: 32, height: 4, borderRadius: 2, marginBottom: 10 },
  role: { fontSize: 22, fontWeight: "800", color: colors.white, letterSpacing: -0.3 },
  body: { padding: 26, flexGrow: 1 },
  quoteRow: { flexDirection: "row", gap: 6, marginBottom: 22 },
  quoteMark: { fontSize: 40, lineHeight: 40, fontWeight: "800", marginTop: -4 },
  quote: { flex: 1, fontSize: 16, lineHeight: 25, fontWeight: "600", color: colors.ink },
  listLabel: { fontSize: 11, fontWeight: "800", letterSpacing: 1.4, color: colors.muted, marginBottom: 12 },
  point: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  check: { width: 22, height: 22, borderRadius: 11, alignItems: "center", justifyContent: "center" },
  pointText: { fontSize: 14, fontWeight: "600", color: colors.body },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  footerText: { fontSize: 14, fontWeight: "700", transitionDuration: "200ms" },
  arrow: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", transitionDuration: "200ms" },
});
