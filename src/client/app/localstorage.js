export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState == null) {
      return undefined;
    }
    return resetErrors(JSON.parse(serializedState));
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch(err) {
    console.log(err);
  }
};

function resetErrors(state) {
  state.user.error = null;
  state.login.error = null;
  state.books.error = null;
  state.alert.message = '';
  state.alert.error = true;
  state.user.newUserName = '';
  state.user.newPassword = '';

  return state;
}
