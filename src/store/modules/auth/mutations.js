export const token = (state, token) => {
  state.user.token = token;
};

export const user = (state, user) => {
  state.user.data = user;
};
export const tasks = (state, tasks) => {
  state.tasks = tasks;
};
export const task = (state, task) => {
  state.task = task;
};
