import ServicesScene from './scenes/ServicesScene';
import HostsScene from './scenes/HostsScene';

export default {
  services: {
    initialRoute: true,
    title: 'Services',
    component: ServicesScene,
  },
  hosts: {
    title: 'Hosts',
    component: HostsScene,
  },
};
