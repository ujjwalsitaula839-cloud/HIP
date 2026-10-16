import { Image, StyleSheet, View } from "react-native";
import { T } from "../ui/primitives.jsx";
import mark from "../../assets/logo-mark.svg";
import { colors } from "../../styles/theme.js";

export default function Logo({ light, compact }) {
  const size = compact ? 34 : 42;
  return (
    <View style={styles.row}>
      <Image source={{ uri: mark }} style={[styles.mark, { width: size, height: size }]} accessibilityLabel="HIP logo" />
      <View>
        <T style={[styles.name, compact && styles.nameCompact, light && { color: colors.white }]}>
          HIP<T style={styles.dot}>.</T>
        </T>
        <T style={[styles.tag, compact && { fontSize: 8.5 }, light && { color: "rgba(255,255,255,0.6)" }]}>
          Hospital Intelligence Platform
        </T>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  mark: { filter: "drop-shadow(0 4px 10px rgba(13,148,136,0.30))" },
  name: { fontSize: 23, fontWeight: "800", letterSpacing: 0.3, color: colors.ink, lineHeight: 24 },
  nameCompact: { fontSize: 19, lineHeight: 20 },
  dot: { color: colors.accent },
  tag: { fontSize: 9.5, fontWeight: "700", letterSpacing: 1.1, textTransform: "uppercase", color: colors.muted, marginTop: 2 },
});
