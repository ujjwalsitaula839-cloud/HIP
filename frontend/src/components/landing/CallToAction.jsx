import { useState } from "react";
import { ImageBackground, StyleSheet, TextInput, View } from "react-native";
import Icon from "../ui/Icon.jsx";
import Reveal from "../ui/Reveal.jsx";
import bandBg from "../../assets/band-bg.svg";
import { Button, Container, T } from "../ui/primitives.jsx";
import useBreakpoint from "../../hooks/useBreakpoint.js";
import { colors, font, radius } from "../../styles/theme.js";

export default function CallToAction() {
  const { isMobile, isDesktop } = useBreakpoint();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const valid = /\S+@\S+\.\S+/.test(email);

  return (
    <View id="contact" style={[styles.section, { paddingVertical: isMobile ? 64 : 100 }]}>
      <Container>
        <Reveal from="scale">
          <ImageBackground
            source={{ uri: bandBg }}
            resizeMode="cover"
            style={[styles.card, { padding: isMobile ? 28 : 56, flexDirection: isDesktop ? "row" : "column" }]}
          >
            <View style={styles.glow} />
            <View style={[{ flex: 1 }, isDesktop && { paddingRight: 40 }]}>
              <T style={[styles.title, { fontSize: isMobile ? 28 : 40, lineHeight: isMobile ? 36 : 48 }]}>
                Make every minute before arrival count.
              </T>
              <T style={styles.text}>
                See how HIP connects your EMS, ER and departments in a single real-time workflow. We'll walk you through a live
                demo built around your hospital's process.
              </T>
              <View style={[styles.perks, isMobile && { flexDirection: "column", gap: 10 }]}>
                {["Live walkthrough", "Tailored to your ER workflow", "No commitment"].map((p) => (
                  <View key={p} style={styles.perk}>
                    <View style={styles.perkIcon}>
                      <Icon name="check" size={12} color={colors.brand900} strokeWidth={3} />
                    </View>
                    <T style={styles.perkText}>{p}</T>
                  </View>
                ))}
              </View>
            </View>

            <View style={[styles.formWrap, isDesktop ? { width: 420 } : { marginTop: 32 }]}>
              {sent ? (
                <View style={styles.success}>
                  <View style={styles.successIcon}>
                    <Icon name="check" size={22} color={colors.white} strokeWidth={3} />
                  </View>
                  <T style={styles.successTitle}>Thanks — we'll be in touch.</T>
                  <T style={styles.successText}>Our team will reach out to {email} to schedule your demo.</T>
                </View>
              ) : (
                <>
                  <T style={styles.label}>Work email</T>
                  <View style={styles.form}>
                    <View style={styles.inputWrap}>
                      <Icon name="mail" size={18} color={colors.muted} />
                      <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="you@hospital.org"
                        placeholderTextColor="#94A3B8"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onSubmitEditing={() => valid && setSent(true)}
                        style={styles.input}
                      />
                    </View>
                    <Button label="Request demo" icon="arrowRight" variant="teal" onPress={() => valid && setSent(true)} />
                  </View>
                  <T style={styles.hint}>No commitment. We'll only use your email to contact you about HIP.</T>
                </>
              )}
            </View>
          </ImageBackground>
        </Reveal>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { backgroundColor: colors.page },
  card: {
    position: "relative",
    overflow: "hidden",
    alignItems: "center",
    borderRadius: radius.xl,
    backgroundColor: colors.brand800,
    borderWidth: 1,
    borderColor: "rgba(94,234,212,0.18)",
    boxShadow: "0 40px 80px rgba(6,13,28,0.28)",
  },
  glow: {
    position: "absolute",
    width: 520,
    height: 520,
    borderRadius: 260,
    right: -160,
    top: -220,
    backgroundColor: "rgba(94,234,212,0.16)",
    filter: "blur(40px)",
  },
  title: { fontWeight: "800", color: colors.white, letterSpacing: -1 },
  text: { fontSize: 16, lineHeight: 27, color: "rgba(255,255,255,0.82)", marginTop: 16, maxWidth: 520 },
  perks: { flexDirection: "row", flexWrap: "wrap", gap: 20, marginTop: 28 },
  perk: { flexDirection: "row", alignItems: "center", gap: 8 },
  perkIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.accentLight,
    alignItems: "center",
    justifyContent: "center",
  },
  perkText: { fontSize: 14, fontWeight: "600", color: "rgba(255,255,255,0.88)" },
  formWrap: {
    width: "100%",
    padding: 24,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(10px)",
  },
  label: { fontSize: 13, fontWeight: "700", color: "rgba(255,255,255,0.85)", marginBottom: 10 },
  form: { gap: 10 },
  inputWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    minHeight: 48,
  },
  input: { flex: 1, fontFamily: font, fontSize: 15, color: colors.ink, paddingVertical: 12, outlineStyle: "none" },
  hint: { fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 12 },
  success: {
    padding: 24,
    borderRadius: radius.lg,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  successIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  successTitle: { fontSize: 18, fontWeight: "800", color: colors.white },
  successText: { fontSize: 14, lineHeight: 22, color: "rgba(255,255,255,0.8)", marginTop: 6 },
});
