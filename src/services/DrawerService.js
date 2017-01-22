
class DrawerService {

  drawerRef = null;

  setDrawer = (ref) => {
    this.drawerRef = ref;
  }

  openDrawer = () => {
    this.drawerRef.openDrawer();
  }

  closeDrawer = () => {
    this.drawerRef.closeDrawer();
  }
}

export default new DrawerService();
