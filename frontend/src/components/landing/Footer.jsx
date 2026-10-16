import { Pressable, StyleSheet, View } from "react-native";
import Logo from "./Logo.jsx";
import Icon from "../ui/Icon.jsx";
import { Container, T } from "../ui/primitives.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import scrollTo from "../../utils/scrollTo.js";
import { colors } from "../../styles/theme.js";

const columns = [
  {
    title: "Platform",
    links: [
      ["How it works", "how-it-works"],
      ["Departments", "departments"],
      ["Impact", "impact"],
    ],
  },
  {
    title: "Teams",
    links: [
      ["ER staff", "roles"],
      ["Departments", "roles"],
      ["Leadership", "roles"],
    ],
  },
  {
    title: "Project",
    links: [
      ["The problem", "problem"],
      ["Request a demo", "contact"],
    ],
  },
];

function FooterLink({ label, onPress }) {
  return (
    <Pressable onPress={onPress} style={{ alignSelf: "flex-start" }}>
      {({ hovered }) => <T style={[styles.link, hovered && { color: colors.white }]}>{label}</T>}
    </Pressable>
  );
}

export default function Footer() {
  const { isMobile, isDesktop } = useBreakpoint();

  return (
    <View style={styles.footer}>
      <View style={styles.topLine} />
      <Container>
        <View style={[styles.main, { flexDirection: isDesktop ? "row" : "column" }]}>
          <View style={[{ gap: 16 }, isDesktop && { flex: 1, paddingRight: 64 }]}>
            <Logo light />
            <T style={styles.about}>Real-time coordination between EMS, the Emergency Room and every department behind it.</T>
          </View>

          <View style={[styles.cols, isMobile && { flexWrap: "wrap", rowGap: 28 }]}>
            {columns.map((c) => (
              <View key={c.title} style={[styles.col, isMobile && { minWidth: "45%" }]}>
                <T style={styles.colTitle}>{c.title}</T>
                {c.links.map(([label, id]) => (
                  <FooterLink key={c.title + label} label={label} onPress={() => scrollTo(id)} />
                ))}
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.bottom, { flexDirection: isMobile ? "column-reverse" : "row" }]}>
          <T style={styles.small}>© {new Date().getFullYear()} HIP · Hospital Intelligence Platform · Capstone Project</T>
          <Pressable onPress={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            {({ hovered }) => (
              <View style={[styles.top, hovered && styles.topHover]}>
                <T style={[styles.topText, hovered && { color: colors.white }]}>Back to top</T>
                <Icon
                  name="arrowRight"
                  size={13}
                  color={hovered ? colors.white : "rgba(255,255,255,0.6)"}
                  style={{ transform: [{ rotate: "-90deg" }] }}
                />
              </View>
            )}
          </Pressable>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { backgroundColor: colors.brand900, paddingTop: 56, paddingBottom: 28 },
  topLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(94,234,212,0.18)",
  },
  main: { gap: 40, justifyContent: "space-between" },
  about: { fontSize: 14, lineHeight: 22, color: "rgba(255,255,255,0.55)", maxWidth: 340 },
  cols: { flexDirection: "row", gap: 56 },
  col: { gap: 11 },
  colTitle: { fontSize: 12, fontWeight: "700", letterSpacing: 0.4, color: colors.white, marginBottom: 4 },
  link: { fontSize: 14, color: "rgba(255,255,255,0.55)", transitionDuration: "150ms" },
  bottom: {
    justifyContent: "space-between",
    alignItems: "center",
    gap: 14,
    marginTop: 44,
    paddingTop: 22,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
  },
  small: { fontSize: 12.5, color: "rgba(255,255,255,0.4)" },
  top: { flexDirection: "row", alignItems: "center", gap: 6, paddingVertical: 6, paddingHorizontal: 4 },
  topHover: {},
  topText: { fontSize: 12.5, fontWeight: "600", color: "rgba(255,255,255,0.6)", transitionDuration: "150ms" },
});
