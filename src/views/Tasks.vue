<template>
  <div class="d-flex justify-content-between">
    <h2>Tâches à ne pas faire</h2>
    <router-link to="/create">
      <button type="button" class="btn btn-primary mb-4">
        Créer une tâche à ne pas faire
      </button>
    </router-link>
  </div>
  <div v-if="!tasks.length">Vous n'avez aucune tâche à ne pas faire.</div>
  <div v-for="task in tasks" :key="task.id">
    <div class="my-2 d-flex align-items-center text-white">
      <input
        class="rounded mr-2"
        type="checkbox"
        @change="edit(task, true)"
        :disabled="!isActive"
        :checked="task.done ? task.done : task.done"
      />
      <form
        class="d-flex align-items-center w-100"
        @submit.prevent="edit(task, false)"
      >
        <div :class="task.done ? css.taskComplete : css.taskWaiting">
          <input type="text" class="w-100" v-model="task.body" />
        </div>
        <button class="py-2 btn btn-primary mr-2" :disabled="!isActive">
          Éditer
        </button>
      </form>
      <button
        @click="deleteTask(task.id)"
        class="py-2 btn btn-danger"
        :disabled="!isActive"
      >
        Supprimer
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "Tasks",
  data() {
    return {
      form: {},
      isActive: true,
      css: {
        taskComplete: "px-3 py-2 bg-success rounded w-100 mr-2",
        taskWaiting: "px-3 py-2 bg-primary rounded w-100 mr-2",
      },
    };
  },
  computed: {
    ...mapGetters({ user: "auth/user" }),
    ...mapGetters({ tasks: "auth/tasks" }),
  },
  mounted() {
    this.tasks_user();
  },
  methods: {
    ...mapActions({ tasks_user: "auth/tasks_user" }),
    ...mapActions({ update: "auth/updateTask" }),
    ...mapActions({ delete: "auth/deleteTask" }),
    deleteTask(id) {
      this.switchIsActive();
      this.delete(id).then(() => {
        this.tasks_user().then(() => {
            this.switchIsActive();
        });
      });
    },
    edit(task, checkbox) {
      if (checkbox) {
        task.done = (task.done == 1) ? 0 : 1;
      }

      this.switchIsActive();
      this.update(task).then(() => {
        this.tasks_user().then(() => {
            this.switchIsActive();
        });
      });
    },
    switchIsActive() {
      this.isActive = this.isActive == true ? false : true;
    },
  },
};
</script>
<style>
input {
  color: white;
  background-color: inherit;
  padding: 0.4px 0px;
  border: none;
  border-bottom: 2px rgba(0, 0, 0, 0) solid;
}

input:focus {
  border-bottom: 2px white solid;
  outline: 0 !important;
}
</style>
