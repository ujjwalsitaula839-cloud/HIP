import { Image, StyleSheet, View } from "react-native";
import Icon from "../ui/Icon.jsx";
import Reveal from "../ui/Reveal.jsx";
import { Container, Eyebrow, T } from "../ui/primitives.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import photo from "../../assets/photos/doctor-patient.jpg";
import { colors, radius, shadow } from "../../styles/theme.js";

const today = [
  { icon: "phone", title: "Phone calls", text: "EMS details relayed one call at a time." },
  { icon: "message", title: "Verbal handoffs", text: "Critical info lost between shifts and teams." },
  { icon: "fileText", title: "Paper notes", text: "Nothing structured, searchable or trackable." },
];

const withHip = [
  "One structured intake the moment EMS calls ahead",
  "Automatic push to beds, pharmacy, equipment & specialists",
  "Live readiness status for every department",
  "Every action time-stamped for accountability",
];

export default function ProblemSolution() {
  const { isMobile, isDesktop } = useBreakpoint();

  return (
    <View id="problem" style={[styles.section, { paddingTop: isMobile ? 56 : 88, paddingBottom: isMobile ? 64 : 104 }]}>
      <Container style={{ flexDirection: isDesktop ? "row" : "column", alignItems: "center", gap: isDesktop ? 72 : 48 }}>
        {/* ilustración con marco desplazado, como en la referencia */}
        <Reveal from="left" style={isDesktop ? { flex: 1 } : { width: "100%", maxWidth: 560 }}>
          <View style={styles.artWrap}>
            <View style={styles.artBack} />
            <View style={styles.artFrame}>
              <Image
                source={{ uri: photo }}
                style={styles.art}
                resizeMode="cover"
                accessibilityLabel="Doctor reviewing a patient chart at the bedside"
              />
            </View>
            <View style={styles.alert}>
              <View style={styles.alertDot} />
              <View style={{ flex: 1 }}>
                <T style={styles.alertTitle}>Incoming · ETA 7 min</T>
                <T style={styles.alertSub}>Trauma · Priority 1</T>
                <View style={styles.alertChips}>
                  <T style={[styles.chip, styles.chipOk]}>Bed ✓</T>
                  <T style={[styles.chip, styles.chipOk]}>Rx ✓</T>
                  <T style={[styles.chip, styles.chipWait]}>OR …</T>
                </View>
              </View>
            </View>
            <View style={styles.badge}>
              <View style={styles.badgeIcon}>
                <Icon name="alert" size={18} color={colors.red500} />
              </View>
              <View>
                <T style={styles.badgeTitle}>Every minute counts</T>
                <T style={styles.badgeText}>Delays start before arrival</T>
              </View>
            </View>
          </View>
        </Reveal>

        <Reveal from="right" delay={120} style={[isDesktop && { flex: 1 }, { width: "100%" }]}>
          <Eyebrow>The problem</Eyebrow>
          <T style={[styles.title, { fontSize: isMobile ? 30 : 40, lineHeight: isMobile ? 38 : 48 }]}>
            Critical minutes are lost in the handoff.
          </T>
          <T style={styles.lead}>
            When EMS calls ahead, information still travels by phone, word of mouth and paper. Bed assignment, equipment
            preparation and pharmacy readiness all wait on someone passing the message along.
          </T>

          <View style={[styles.todayGrid, { flexDirection: isMobile ? "column" : "row" }]}>
            {today.map((t) => (
              <View key={t.title} style={styles.todayCard}>
                <View style={styles.todayIcon}>
                  <Icon name={t.icon} size={18} color={colors.red500} />
                </View>
                <T style={styles.todayTitle}>{t.title}</T>
                <T style={styles.todayText}>{t.text}</T>
              </View>
            ))}
          </View>

          <View style={styles.solution}>
            <View style={styles.solutionHead}>
              <View style={styles.solutionMark}>
                <Icon name="activity" size={16} color={colors.white} strokeWidth={2.5} />
              </View>
              <T style={styles.solutionTitle}>With HIP</T>
            </View>
            {withHip.map((w) => (
              <View key={w} style={styles.check}>
                <View style={styles.checkIcon}>
                  <Icon name="check" size={13} color={colors.accentDark} strokeWidth={3} />
                </View>
                <T style={styles.checkText}>{w}</T>
              </View>
            ))}
          </View>
        </Reveal>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { backgroundColor: colors.white },
  artWrap: { position: "relative", paddingLeft: 28, paddingTop: 28 },
  artBack: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "70%",
    height: "80%",
    borderRadius: radius.lg,
    backgroundColor: colors.brand700,
  },
  artFrame: { borderRadius: radius.lg, overflow: "hidden", backgroundColor: colors.white, boxShadow: shadow.lifted },
  art: { width: "100%", aspectRatio: 1.15 },
  alert: {
    position: "absolute",
    top: 56,
    right: -12,
    flexDirection: "row",
    gap: 10,
    width: 210,
    padding: 14,
    borderRadius: radius.md,
    backgroundColor: "rgba(255,255,255,0.96)",
    boxShadow: shadow.lifted,
  },
  alertDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 4,
    backgroundColor: colors.red500,
    boxShadow: "0 0 0 5px rgba(239,68,68,0.18)",
  },
  alertTitle: { fontSize: 13, fontWeight: "800" },
  alertSub: { fontSize: 11, color: colors.muted, marginTop: 1 },
  alertChips: { flexDirection: "row", gap: 6, marginTop: 10 },
  chip: { fontSize: 10, fontWeight: "800", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, overflow: "hidden" },
  chipOk: { backgroundColor: colors.accent100, color: colors.accentDark },
  chipWait: { backgroundColor: colors.primary100, color: colors.primaryDark },
  badge: {
    position: "absolute",
    bottom: -24,
    right: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: radius.md,
    backgroundColor: colors.white,
    boxShadow: shadow.lifted,
  },
  badgeIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.red100,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeTitle: { fontSize: 14, fontWeight: "800" },
  badgeText: { fontSize: 12, color: colors.muted },
  title: { fontWeight: "800", letterSpacing: -1, color: colors.brand700 },
  lead: { marginTop: 18, fontSize: 16, lineHeight: 27, color: colors.body },
  todayGrid: { gap: 12, marginTop: 28 },
  todayCard: {
    flex: 1,
    padding: 16,
    borderRadius: radius.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    boxShadow: "0 1px 2px rgba(6,13,28,0.04)",
  },
  todayIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.red100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  todayTitle: { fontSize: 15, fontWeight: "700" },
  todayText: { fontSize: 13, lineHeight: 20, color: colors.muted, marginTop: 4 },
  solution: {
    marginTop: 20,
    padding: 22,
    borderRadius: radius.md,
    backgroundColor: colors.primary50,
    borderWidth: 1,
    borderColor: colors.primary100,
    gap: 12,
  },
  solutionHead: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 4 },
  solutionMark: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  solutionTitle: { fontSize: 16, fontWeight: "800", color: colors.brand700 },
  check: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  checkIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.accent100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  checkText: { flex: 1, fontSize: 15, lineHeight: 23, color: colors.ink, fontWeight: "500" },
});
