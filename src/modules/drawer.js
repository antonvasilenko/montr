const DRAWER_SET = 'DRAWER_SET';
const DRAWER_OPEN = 'DRAWER_OPEN';
const DRAWER_CLOSE = 'DRAWER_CLOSE';

const initialState = {
  ref: null,
  lastTriggered: undefined,
};

// how to transfer command, initiated by toolbar drawer icon click event,
// from toolbar to drawer
// usual approach is to change state i.e. drawer.opened = true
// but drawer inside manages his own state, and there are a lot of ways to change it
// by the back of reducer. That means it's no longer a source of truth and
// we cannot be sure, whether the drawer opened or not.

// Finally, the solution was to store a reference to the drawer
// inside the global redux state with DRAWER_SET action
// Then, on DRAWER_OPEN and DRAWER_CLOSE actions, these actions just calling
// ref.drawerOpen() or ref.drawerClose() methods.
// In this way redicer remained the single source of truth and without side effects.

const drawer = (state = initialState, action) => {
  switch (action.type) {
    case DRAWER_SET:
      return {
        ...state,
        ref: action.ref,
      };
    case DRAWER_OPEN:
    case DRAWER_CLOSE:
      return {
        ...state,
        lastTriggered: action.lastTriggered,
      };
    default: return state;
  }
};

export default drawer;

// ------ selectors -----------------
const getDrawerRef = state => state.ui.drawer.ref;

// ------------ action creators ----------------
export const setDrawer = ref => ({
  type: DRAWER_SET,
  ref,
});

export const openDrawer = () => (dispatch, getState) => {
  const ref = getDrawerRef(getState());
  ref && ref.openDrawer();
  dispatch({
    type: DRAWER_OPEN,
    lastTriggered: Date.now(),
  });
};

export const closeDrawer = () => (dispatch, getState) => {
  const ref = getDrawerRef(getState());
  ref && ref.closeDrawer();
  dispatch({
    type: DRAWER_CLOSE,
    lastTriggered: Date.now(),
  });
};
