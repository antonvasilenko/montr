import ServicesScene from './scenes/Services/ServicesScene';
import HostsScene from './scenes/HostsScene';
import ThemesScene from './scenes/ThemesScene';

export default {
  services: {
    initialRoute: true,
    title: 'Services',
    component: ServicesScene,
    icon: 'cloud-queue',
  },
  hosts: {
    title: 'Hosts',
    icon: 'computer',
    component: HostsScene,
  },
  themes: {
    title: 'Themes',
    icon: 'brush',
    component: ThemesScene,
  },
};
