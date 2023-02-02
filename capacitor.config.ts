import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.cricfanatic.app",
  appName: "cricfanatic",
  webDir: "out",
  bundledWebRuntime: false,
  android: {
    backgroundColor: "#001d3d",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 5000,
      launchAutoHide: true,
    },
  },
};

export default config;
