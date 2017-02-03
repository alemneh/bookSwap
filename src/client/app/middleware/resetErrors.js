export default store => next => action => {
  let state = store.getState();
  state.user.error = null;
  state.login.error = null;
  state.books.error = null;
  state.books.success = null;
  state.alert.message = '';
  state.alert.error = true;
  next(action);
};
