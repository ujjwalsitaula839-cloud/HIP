import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Image, StyleSheet, View } from "react-native";
import Icon from "../ui/Icon.jsx";
import { T } from "../ui/primitives.jsx";
import mark from "../../assets/logo-mark.svg";
import { colors, shadow } from "../../styles/theme.js";

const svgUri = (svg) => `data:image/svg+xml;base64,${btoa(svg)}`;

// Trazo ECG con dos periodos idénticos para que el desplazamiento sea continuo
const ECG_PERIOD = 300;
const beat = (x) =>
  `L${x + 60} 22 L${x + 68} 22 L${x + 74} 16 L${x + 80} 22 L${x + 98} 22 L${x + 105} 28 L${x + 113} 3 L${x + 121} 38 L${x + 128} 22 L${x + 168} 22 L${x + 178} 15 L${x + 190} 22 L${x + 300} 22`;
const ecgSvg = svgUri(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 44" width="600" height="44">
    <path d="M0 22 ${beat(0)} ${beat(ECG_PERIOD)}" fill="none" stroke="#5EEAD4" stroke-width="5" stroke-opacity="0.18" stroke-linejoin="round"/>
    <path d="M0 22 ${beat(0)} ${beat(ECG_PERIOD)}" fill="none" stroke="#5EEAD4" stroke-width="1.8" stroke-linejoin="round"/>
  </svg>`,
);

function ringSvg(pct) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return svgUri(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="${r}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="5"/>
      <circle cx="32" cy="32" r="${r}" fill="none" stroke="#FF6B6B" stroke-width="5" stroke-linecap="round"
        stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct)}" transform="rotate(-90 32 32)"/>
    </svg>`,
  );
}

const departments = [
  { icon: "bed", name: "Bed Management", detail: "Trauma Bay 2 assigned", status: "ready", time: "+0:04" },
  { icon: "heartPulse", name: "Cath Lab", detail: "Cardiology team paged", status: "progress", time: "+0:11" },
  { icon: "pill", name: "Pharmacy", detail: "Aspirin · Heparin staged", status: "ready", time: "+0:06" },
  { icon: "stethoscope", name: "Equipment", detail: "Defib + monitor prepped", status: "ready", time: "+0:09" },
  { icon: "scan", name: "Radiology", detail: "Awaiting request", status: "pending", time: "—" },
];

const status = {
  ready: { fg: "#5EEAD4", bg: "rgba(94,234,212,0.12)", bar: "#2DD4BF", label: "Ready" },
  progress: { fg: "#FCD34D", bg: "rgba(252,211,77,0.12)", bar: "#F59E0B", label: "In progress" },
  pending: { fg: "rgba(255,255,255,0.55)", bg: "rgba(255,255,255,0.06)", bar: "rgba(255,255,255,0.14)", label: "Pending" },
};

const vitals = [
  { k: "HR", v: "118", u: "bpm", trend: "up", tone: "#FCD34D" },
  { k: "BP", v: "92/60", u: "mmHg", trend: "down", tone: "#FCD34D" },
  { k: "SpO₂", v: "91", u: "%", trend: "down", tone: "#FF6B6B" },
];

const ETA_START = 6 * 60 + 42;
const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

function Pulse({ color }) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(v, { toValue: 1, duration: 1600, easing: Easing.out(Easing.ease), useNativeDriver: false }),
    );
    loop.start();
    return () => loop.stop();
  }, [v]);
  return (
    <View style={styles.pulseWrap}>
      <Animated.View
        style={[
          styles.pulseRing,
          {
            backgroundColor: color,
            opacity: v.interpolate({ inputRange: [0, 1], outputRange: [0.6, 0] }),
            transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [1, 2.8] }) }],
          },
        ]}
      />
      <View style={[styles.pulseDot, { backgroundColor: color }]} />
    </View>
  );
}

export default function DashboardMockup({ compact }) {
  const [eta, setEta] = useState(ETA_START);
  const [clock, setClock] = useState(() => new Date());
  const ecg = useRef(new Animated.Value(0)).current;

  // cuenta atrás del ETA y reloj en vivo
  useEffect(() => {
    const id = setInterval(() => {
      setEta((s) => (s <= 1 ? ETA_START : s - 1));
      setClock(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(ecg, { toValue: 1, duration: 2600, easing: Easing.linear, useNativeDriver: false }),
    );
    loop.start();
    return () => loop.stop();
  }, [ecg]);

  const rows = departments.slice(0, compact ? 3 : 4);
  const readyCount = departments.filter((d) => d.status === "ready").length;
  const time = clock.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <View style={styles.wrap}>
      <View style={styles.panel}>
        {/* cabecera */}
        <View style={styles.header}>
          <View style={styles.row}>
            <Image source={{ uri: mark }} style={styles.mark} />
            <View>
              <T style={styles.headerTitle}>ER Command Center</T>
              <T style={styles.headerSub}>Emergency Department · Live board</T>
            </View>
          </View>
          <View style={styles.row}>
            {!compact ? <T style={styles.clock}>{time}</T> : null}
            <View style={styles.live}>
              <Pulse color="#FF6B6B" />
              <T style={styles.liveText}>LIVE</T>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          {/* caso entrante */}
          <View style={styles.case}>
            <View style={styles.caseAccent} />
            <View style={styles.caseTop}>
              <View style={{ flex: 1 }}>
                <View style={styles.row}>
                  <View style={styles.priority}>
                    <T style={styles.priorityText}>P1</T>
                  </View>
                  <T style={styles.caseLabel}>INCOMING · EMS UNIT 14</T>
                </View>
                <T style={styles.caseTitle}>Male, 54 · Suspected STEMI</T>
              </View>
              <View style={styles.eta}>
                <Image source={{ uri: ringSvg(eta / 600) }} style={StyleSheet.absoluteFill} />
                <T style={styles.etaValue}>{fmt(eta)}</T>
                <T style={styles.etaLabel}>ETA</T>
              </View>
            </View>

            <View style={styles.ecgBox}>
              <Animated.Image
                source={{ uri: ecgSvg }}
                style={[
                  styles.ecg,
                  { transform: [{ translateX: ecg.interpolate({ inputRange: [0, 1], outputRange: [0, -ECG_PERIOD] }) }] },
                ]}
              />
            </View>

            <View style={styles.vitals}>
              {vitals.map((v) => (
                <View key={v.k} style={styles.vital}>
                  <View style={styles.vitalHead}>
                    <T style={styles.vitalKey}>{v.k}</T>
                    <Icon
                      name="arrowRight"
                      size={12}
                      color={v.tone}
                      strokeWidth={2.6}
                      style={{ transform: [{ rotate: v.trend === "up" ? "-90deg" : "90deg" }] }}
                    />
                  </View>
                  <T style={[styles.vitalVal, { color: v.tone }]}>
                    {v.v}
                    {!compact ? <T style={styles.vitalUnit}> {v.u}</T> : null}
                  </T>
                </View>
              ))}
            </View>
          </View>

          {/* preparación de departamentos */}
          <View style={styles.readyHead}>
            <T style={styles.readyTitle}>Department readiness</T>
            <T style={styles.readyCount}>
              {readyCount}
              <T style={styles.readyTotal}> / {departments.length} ready</T>
            </T>
          </View>
          <View style={styles.segments}>
            {departments.map((d) => (
              <View key={d.name} style={[styles.segment, { backgroundColor: status[d.status].bar }]} />
            ))}
          </View>

          <View style={styles.list}>
            {rows.map((d, i) => {
              const s = status[d.status];
              return (
                <View key={d.name} style={[styles.dept, i > 0 && styles.deptDivider]}>
                  <View style={styles.deptIcon}>
                    <Icon name={d.icon} size={14} color="#5EEAD4" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <T style={styles.deptName}>{d.name}</T>
                    <T style={styles.deptDetail}>{d.detail}</T>
                  </View>
                  <View style={{ alignItems: "flex-end", gap: 3 }}>
                    <View style={[styles.badge, { backgroundColor: s.bg }]}>
                      <View style={[styles.badgeDot, { backgroundColor: s.fg }]} />
                      <T style={[styles.badgeText, { color: s.fg }]}>{s.label}</T>
                    </View>
                    <T style={styles.deptTime}>{d.time}</T>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.footer}>
          <Icon name="zap" size={12} color="rgba(255,255,255,0.45)" />
          <T style={styles.footerText}>Auto-routed by HIP · synced across all departments</T>
        </View>
      </View>

      {/* notificaciones flotantes */}
      {!compact ? (
        <>
          <View style={[styles.float, { bottom: -40, left: -56 }]}>
            <View style={[styles.floatIcon, { backgroundColor: colors.accent100 }]}>
              <Icon name="send" size={16} color={colors.accentDark} />
            </View>
            <View>
              <T style={styles.floatTitle}>Pushed to 5 departments</T>
              <T style={styles.floatSub}>the moment intake was saved</T>
            </View>
          </View>
          <View style={[styles.float, { top: -40, right: -32 }]}>
            <View style={[styles.floatIcon, { backgroundColor: colors.primary50 }]}>
              <Icon name="check" size={16} color={colors.primary} strokeWidth={3} />
            </View>
            <View>
              <T style={styles.floatTitle}>Pharmacy confirmed</T>
              <T style={styles.floatSub}>Meds staged at Bay 2</T>
            </View>
          </View>
        </>
      ) : null}
    </View>
  );
}

const ink = "rgba(255,255,255,0.92)";
const dim = "rgba(255,255,255,0.5)";
const hairline = "rgba(255,255,255,0.08)";

const styles = StyleSheet.create({
  wrap: { position: "relative", width: "100%", maxWidth: 410, alignSelf: "center" },
  panel: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "rgba(8,16,34,0.88)",
    borderWidth: 1,
    borderColor: "rgba(94,234,212,0.18)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 50px 100px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
  },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: hairline,
    backgroundColor: "rgba(255,255,255,0.03)",
  },
  mark: { width: 24, height: 24 },
  headerTitle: { fontSize: 12, fontWeight: "800", color: ink },
  headerSub: { fontSize: 9.5, color: dim, marginTop: 1 },
  clock: { fontSize: 12, fontWeight: "700", color: dim, fontVariant: ["tabular-nums"] },
  live: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 999,
    backgroundColor: "rgba(255,107,107,0.12)",
  },
  liveText: { fontSize: 10, fontWeight: "800", letterSpacing: 1.2, color: "#FF8A8A" },
  pulseWrap: { width: 7, height: 7, alignItems: "center", justifyContent: "center" },
  pulseRing: { position: "absolute", width: 7, height: 7, borderRadius: 4 },
  pulseDot: { width: 7, height: 7, borderRadius: 4 },
  body: { padding: 12, gap: 10 },
  case: {
    borderRadius: 14,
    padding: 12,
    paddingLeft: 15,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(255,107,107,0.22)",
    overflow: "hidden",
  },
  caseAccent: { position: "absolute", left: 0, top: 0, bottom: 0, width: 3, backgroundColor: "#FF6B6B" },
  caseTop: { flexDirection: "row", alignItems: "center", gap: 12 },
  priority: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 5, backgroundColor: "#FF6B6B" },
  priorityText: { fontSize: 10, fontWeight: "800", color: "#2A0606" },
  caseLabel: { fontSize: 10, fontWeight: "800", letterSpacing: 1, color: "#FF8A8A" },
  caseTitle: { fontSize: 13.5, fontWeight: "800", color: ink, marginTop: 5 },
  eta: { width: 52, height: 52, alignItems: "center", justifyContent: "center" },
  etaValue: { fontSize: 11.5, fontWeight: "800", color: colors.white, fontVariant: ["tabular-nums"] },
  etaLabel: { fontSize: 7.5, fontWeight: "800", letterSpacing: 1, color: dim },
  ecgBox: {
    height: 34,
    marginTop: 10,
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.25)",
    borderWidth: 1,
    borderColor: hairline,
  },
  ecg: { width: 600, height: 44, marginTop: -5 },
  vitals: { flexDirection: "row", gap: 6, marginTop: 8 },
  vital: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 9,
    borderRadius: 9,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: hairline,
  },
  vitalHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  vitalKey: { fontSize: 10, fontWeight: "700", color: dim },
  vitalVal: { fontSize: 14, fontWeight: "800", marginTop: 2, fontVariant: ["tabular-nums"] },
  vitalUnit: { fontSize: 10, fontWeight: "600", color: dim },
  readyHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", marginTop: 2 },
  readyTitle: { fontSize: 11.5, fontWeight: "800", letterSpacing: 0.4, color: ink },
  readyCount: { fontSize: 14, fontWeight: "800", color: "#5EEAD4" },
  readyTotal: { fontSize: 11, fontWeight: "600", color: dim },
  segments: { flexDirection: "row", gap: 4 },
  segment: { flex: 1, height: 4, borderRadius: 2 },
  list: { borderRadius: 14, backgroundColor: "rgba(255,255,255,0.03)", borderWidth: 1, borderColor: hairline },
  dept: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 8, paddingHorizontal: 10 },
  deptDivider: { borderTopWidth: 1, borderTopColor: hairline },
  deptIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(94,234,212,0.08)",
    borderWidth: 1,
    borderColor: "rgba(94,234,212,0.14)",
  },
  deptName: { fontSize: 12, fontWeight: "700", color: ink },
  deptDetail: { fontSize: 10, color: dim, marginTop: 1 },
  badge: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 },
  badgeDot: { width: 5, height: 5, borderRadius: 3 },
  badgeText: { fontSize: 10, fontWeight: "800" },
  deptTime: { fontSize: 9.5, fontWeight: "700", color: "rgba(255,255,255,0.35)", fontVariant: ["tabular-nums"] },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: hairline,
  },
  footerText: { fontSize: 10, color: "rgba(255,255,255,0.45)" },
  float: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    boxShadow: shadow.lifted,
  },
  floatIcon: { width: 32, height: 32, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  floatTitle: { fontSize: 12, fontWeight: "800", color: colors.ink },
  floatSub: { fontSize: 11, color: colors.muted },
});
