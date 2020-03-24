export const actionTypes = {
  FAILURE: 'FAILURE',
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
  DARK: 'DARK',
  LIGHT: 'LIGHT',
};

export function failure(error) {
  return {
    type: actionTypes.FAILURE,
    error,
  };
}

export function increment() {
  return { type: actionTypes.INCREMENT };
}

export function decrement() {
  return { type: actionTypes.DECREMENT };
}

export function reset() {
  return { type: actionTypes.RESET };
}

export function loadData() {
  return { type: actionTypes.LOAD_DATA };
}

export function themeDark() {
  return { type: actionTypes.DARK };
}

export function themeLight() {
  return { type: actionTypes.LIGHT };
}
