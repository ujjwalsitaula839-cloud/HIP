import { Image, Pressable, StyleSheet, View } from "react-native";
import Icon from "../ui/Icon.jsx";
import Reveal from "../ui/Reveal.jsx";
import { Container, SectionHeading, T } from "../ui/primitives.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import beds from "../../assets/photos/dept-beds.jpg";
import pharmacy from "../../assets/photos/dept-pharmacy.jpg";
import equipment from "../../assets/photos/dept-equipment.jpg";
import radiology from "../../assets/photos/dept-radiology.jpg";
import lab from "../../assets/photos/dept-lab.jpg";
import surgery from "../../assets/photos/dept-surgery.jpg";
import { colors, radius, shadow } from "../../styles/theme.js";

const departments = [
  { icon: "bed", photo: beds, name: "Bed Management", text: "Beds assigned and cleaned before the ambulance pulls in." },
  { icon: "pill", photo: pharmacy, name: "Pharmacy", text: "Medications staged at the right bay based on the incoming case." },
  {
    icon: "stethoscope",
    photo: equipment,
    name: "Equipment & Supplies",
    text: "Monitors, ventilators and kits prepared and checked in advance.",
  },
  {
    icon: "scan",
    photo: radiology,
    name: "Radiology & Imaging",
    text: "Scanner slots held for time-critical CT and X-ray studies.",
  },
  { icon: "flask", photo: lab, name: "Laboratory", text: "Lab teams alerted to expected panels and priority samples." },
  {
    icon: "heartPulse",
    photo: surgery,
    name: "Specialists & OR",
    text: "On-call specialists and surgical teams paged automatically.",
  },
];

export default function Departments() {
  const { isMobile, isDesktop } = useBreakpoint();
  const basis = isDesktop ? "31.5%" : isMobile ? "100%" : "48%";

  return (
    <View id="departments" style={[styles.section, { paddingVertical: isMobile ? 64 : 104 }]}>
      <Container>
        <SectionHeading
          eyebrow="Connected departments"
          title="Every team sees what they need — the moment it's entered"
          subtitle="HIP routes each detail to the right people, so no one waits for a phone call to start preparing."
        />
        <View style={styles.grid}>
          {departments.map((d, i) => (
            <Reveal key={d.name} delay={(i % 3) * 110} style={{ flexBasis: basis, flexGrow: 1 }}>
              <Pressable style={{ flex: 1 }}>
                {({ hovered }) => (
                  <View style={[styles.card, hovered && styles.cardHover]}>
                    <View style={styles.photoWrap}>
                      <Image
                        source={{ uri: d.photo }}
                        resizeMode="cover"
                        style={[styles.photo, { transform: [{ scale: hovered ? 1.06 : 1 }] }]}
                      />
                      <View style={styles.photoShade} />
                    </View>
                    <View style={styles.body}>
                      <View style={[styles.icon, hovered && { backgroundColor: colors.primary }]}>
                        <Icon name={d.icon} size={24} color={hovered ? colors.white : colors.primary} />
                      </View>
                      <T style={styles.name}>{d.name}</T>
                      <T style={styles.text}>{d.text}</T>
                      <View style={styles.status}>
                        <View style={styles.statusDot} />
                        <T style={styles.statusText}>Notified in real time</T>
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
  section: { backgroundColor: colors.white },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 24 },
  card: {
    height: "100%",
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: "hidden",
    boxShadow: shadow.card,
    transitionDuration: "250ms",
  },
  cardHover: { transform: [{ translateY: -6 }], boxShadow: "0 28px 60px rgba(6,13,28,0.18)" },
  photoWrap: { height: 180, overflow: "hidden" },
  photo: { width: "100%", height: "100%", transitionDuration: "600ms" },
  photoShade: { position: "absolute", left: 0, right: 0, bottom: 0, height: "100%", backgroundColor: "rgba(6,13,28,0.12)" },
  body: { paddingHorizontal: 24, paddingBottom: 24 },
  icon: {
    width: 56,
    height: 56,
    marginTop: -28,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: shadow.card,
    transitionDuration: "250ms",
  },
  name: { fontSize: 18, fontWeight: "800", color: colors.brand700 },
  text: { fontSize: 14, lineHeight: 22, color: colors.body, marginTop: 6 },
  status: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent },
  statusText: { fontSize: 12, fontWeight: "700", color: colors.accentDark },
});
