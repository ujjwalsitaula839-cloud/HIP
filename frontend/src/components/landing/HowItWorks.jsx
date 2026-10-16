import { Image, Pressable, StyleSheet, View } from "react-native";
import Icon from "../ui/Icon.jsx";
import Reveal from "../ui/Reveal.jsx";
import { Container, SectionHeading, T } from "../ui/primitives.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import commandCenter from "../../assets/photos/command-center.jpg";
import { colors, radius, shadow } from "../../styles/theme.js";

const steps = [
  {
    icon: "ambulance",
    title: "EMS calls ahead",
    text: "Paramedics share the patient's condition, vitals and ETA while en route.",
    when: "While en route",
  },
  {
    icon: "clipboard",
    title: "ER logs one structured intake",
    text: "Staff capture the case once in a guided digital form — no free-text guesswork.",
    when: "One entry",
  },
  {
    icon: "send",
    title: "HIP notifies every department",
    text: "Beds, pharmacy, equipment, imaging and specialists get exactly what they need, instantly.",
    when: "Instant push",
  },
  {
    icon: "shield",
    title: "Ready on arrival",
    text: "Teams confirm readiness live, so the patient is received by a prepared hospital.",
    when: "On arrival",
  },
];

export default function HowItWorks() {
  const { isMobile, isDesktop } = useBreakpoint();

  return (
    <View id="how-it-works" style={[styles.section, { paddingVertical: isMobile ? 64 : 104 }]}>
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Call-ahead to bedside in four steps"
          subtitle="A single digital workflow replaces the chain of calls, so every team starts preparing at the same moment."
        />
        <View style={[styles.grid, { flexDirection: isDesktop ? "row" : "column" }]}>
          {!isMobile && isDesktop ? <View style={styles.connector} /> : null}
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 110} style={{ flex: 1 }}>
              <Pressable style={{ flex: 1 }}>
                {({ hovered }) => (
                  <View style={[styles.card, hovered && styles.cardHover]}>
                    <View style={[styles.cardAccent, { width: hovered ? "100%" : 56 }]} />
                    <View style={styles.cardTop}>
                      <View style={[styles.iconBox, hovered && styles.iconBoxHover]}>
                        <Icon name={s.icon} size={24} color={hovered ? colors.white : colors.primary} />
                      </View>
                      <View style={styles.stepPill}>
                        <T style={styles.stepPillText}>STEP {String(i + 1).padStart(2, "0")}</T>
                      </View>
                    </View>
                    <T style={styles.title}>{s.title}</T>
                    <T style={styles.text}>{s.text}</T>
                    <View style={styles.meta}>
                      <Icon name="clock" size={14} color={colors.accentDark} />
                      <T style={styles.metaText}>{s.when}</T>
                    </View>
                  </View>
                )}
              </Pressable>
            </Reveal>
          ))}
        </View>

        <Reveal delay={120}>
          <View style={[styles.feature, { flexDirection: isDesktop ? "row" : "column" }]}>
            <View style={[styles.featurePhotoWrap, isDesktop ? { flex: 1.1 } : { height: 280 }]}>
              <Image
                source={{ uri: commandCenter }}
                resizeMode="cover"
                style={styles.featurePhoto}
                accessibilityLabel="Clinicians reviewing patient data on monitors"
              />
              <View style={styles.featureTag}>
                <View style={styles.featureTagDot} />
                <T style={styles.featureTagText}>Live readiness board</T>
              </View>
            </View>
            <View style={[styles.featureCopy, { padding: isMobile ? 28 : 48 }, isDesktop && { flex: 1 }]}>
              <T style={styles.featureEyebrow}>ONE SHARED PICTURE</T>
              <T style={[styles.featureTitle, { fontSize: isMobile ? 26 : 32, lineHeight: isMobile ? 33 : 40 }]}>
                Everyone works from the same live view of the incoming patient.
              </T>
              <T style={styles.featureText}>
                Physicians, nurses and department leads see the same case, the same ETA and the same readiness status — updated
                the second anything changes.
              </T>
              {[
                "Status updates without a single phone call",
                "Clear owner for every preparation task",
                "Time-stamped history of each case",
              ].map((t) => (
                <View key={t} style={styles.featureItem}>
                  <View style={styles.featureCheck}>
                    <Icon name="check" size={13} color={colors.white} strokeWidth={3} />
                  </View>
                  <T style={styles.featureItemText}>{t}</T>
                </View>
              ))}
            </View>
          </View>
        </Reveal>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { backgroundColor: colors.page },
  grid: { gap: 20, position: "relative" },
  connector: {
    position: "absolute",
    top: 62,
    left: "10%",
    right: "10%",
    borderTopWidth: 2,
    borderStyle: "dashed",
    borderColor: "#CBD5E1",
  },
  card: {
    height: "100%",
    padding: 28,
    paddingTop: 31,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    boxShadow: shadow.card,
    overflow: "hidden",
    transitionDuration: "300ms",
  },
  cardHover: { transform: [{ translateY: -6 }], borderColor: colors.primary100, boxShadow: "0 28px 56px rgba(6,13,28,0.12)" },
  cardAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 3,
    backgroundColor: colors.primary,
    transitionDuration: "450ms",
    transitionProperty: "width",
  },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.primary50,
    borderWidth: 1,
    borderColor: colors.primary100,
    alignItems: "center",
    justifyContent: "center",
    transitionDuration: "300ms",
  },
  iconBoxHover: { backgroundColor: colors.primary, borderColor: colors.primary, boxShadow: "0 10px 24px rgba(13,148,136,0.35)" },
  stepPill: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: colors.page,
    borderWidth: 1,
    borderColor: colors.line,
  },
  stepPillText: { fontSize: 11, fontWeight: "800", letterSpacing: 1.2, color: colors.muted },
  title: { fontSize: 18, lineHeight: 24, fontWeight: "800", color: colors.brand700 },
  text: { fontSize: 14, lineHeight: 23, color: colors.body, marginTop: 10, marginBottom: 20 },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: "auto",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  metaText: { fontSize: 12, fontWeight: "700", color: colors.accentDark },
  feature: {
    marginTop: 56,
    borderRadius: radius.xl,
    overflow: "hidden",
    backgroundColor: colors.brand700,
    boxShadow: shadow.lifted,
  },
  featurePhotoWrap: { minHeight: 380 },
  featurePhoto: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  featureTag: {
    position: "absolute",
    left: 20,
    bottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.95)",
  },
  featureTagDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent },
  featureTagText: { fontSize: 12, fontWeight: "800", color: colors.brand700 },
  featureCopy: { justifyContent: "center" },
  featureEyebrow: { fontSize: 12, fontWeight: "800", letterSpacing: 1.6, color: colors.accentLight, marginBottom: 14 },
  featureTitle: { fontWeight: "800", color: colors.white, letterSpacing: -0.6 },
  featureText: { fontSize: 15, lineHeight: 25, color: "rgba(255,255,255,0.72)", marginTop: 14, marginBottom: 20 },
  featureItem: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 10 },
  featureCheck: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  featureItemText: { flex: 1, fontSize: 14, fontWeight: "600", color: colors.white },
});
