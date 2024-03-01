import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'music-discord-bot',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
