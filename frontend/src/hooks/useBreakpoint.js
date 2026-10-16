import { useWindowDimensions } from "react-native";

export default function useBreakpoint() {
  const { width } = useWindowDimensions();
  return {
    width,
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1080,
    isDesktop: width >= 1080,
  };
}
