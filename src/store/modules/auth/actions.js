import axios from "axios";
import router from "../../../router";

export const login = ({ commit, state }, form) => {
  axios
    .post("https://api-to-dont-list.herokuapp.com/auth/login", {
      email: form.email,
      password: form.password,
    })
    .then((response) => {
      processLogin(commit, response.data.token);
      state.msg.success = "Vous êtes connecté";
    })
    .catch((error) => {
      state.msg.error = error;
      console.log(error);
    });
};

export const register = ({ commit, state }, form) => {
  axios
    .post("https://api-to-dont-list.herokuapp.com/auth/register", {
      name: form.name,
      email: form.email,
      password: form.password,
    })
    .then((response) => {
      processLogin(commit, response.data.token);
      state.msg.success = "Compte enregistré";
    })
    .catch((error) => {
      state.msg.error = error;
      console.log(error);
    });
};

/* eslint-disable no-unused-vars */
const processLogin = (commit, token) => {
  commit("token", token);
  axios
    .post(
      "https://api-to-dont-list.herokuapp.com/auth/me",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      commit("user", {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        created_at: response.data.created_at,
        updated_at: response.data.updated_at,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
/* eslint-enable no-unused-vars */

export const logout = ({ commit, state }) => {
  const token = state.user.token;

  axios
    .post(
      "https://api-to-dont-list.herokuapp.com/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => {
      state.msg.success = "Vous êtes déconnecté";
    })
    .catch((error) => {
        console.log(error);
    });

  commit("token", null);
  commit("user", {});
  router.push("/");
};

export const tasks_user = ({ commit, state }) => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://api-to-dont-list.herokuapp.com/tasks", {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      })
      .then((response) => {
        commit("tasks", response.data.tasks);
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject();
      });
  });
};

export const updateTask = ({ state }, task) => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `https://api-to-dont-list.herokuapp.com/tasks/${task.id}`,
        {
          body: task.body,
          done: task.done,
        },
        {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        resolve();
        state.msg.success = "Tâche modifié";
      })
      .catch((error) => {
        console.log(error);
        reject();
        state.msg.error = error;
      });
  });
};

export const deleteTask = ({ state }, id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`https://api-to-dont-list.herokuapp.com/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      })
      .then(() => {
        resolve();
        state.msg.success = "Tâche supprimée";
      })
      .catch((error) => {
        console.log(error);
        reject();
      });
  });
};

export const createTask = ({ state }, form) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://api-to-dont-list.herokuapp.com/tasks",
        {
          body: form.body,
        },
        {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        }
      )
      .then(() => {
        resolve();
        state.msg.success = "Tâche créée";
      })
      .catch((error) => {
        console.log(error);
        reject();
        state.msg.error = error;
      });
  });
};
