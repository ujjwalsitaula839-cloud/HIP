import { View } from "react-native";
import Navbar from "../components/landing/Navbar.jsx";
import Hero from "../components/landing/Hero.jsx";
import ProblemSolution from "../components/landing/ProblemSolution.jsx";
import HowItWorks from "../components/landing/HowItWorks.jsx";
import Departments from "../components/landing/Departments.jsx";
import Impact from "../components/landing/Impact.jsx";
import Audience from "../components/landing/Audience.jsx";
import CallToAction from "../components/landing/CallToAction.jsx";
import Footer from "../components/landing/Footer.jsx";

export default function Landing() {
  return (
    <View>
      <Navbar />
      <Hero />
      <ProblemSolution />
      <HowItWorks />
      <Departments />
      <Impact />
      <Audience />
      <CallToAction />
      <Footer />
    </View>
  );
}
