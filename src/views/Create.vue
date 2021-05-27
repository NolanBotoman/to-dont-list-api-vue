<template>
  <h2>Créer une nouvelle tâche à ne pas faire</h2>
  <p v-if="msg.success">{{ msg.success }}</p>
  <form @submit.prevent="create(form)">
    <div class="form-group">
      <label for="body">Contenu</label>
      <textarea
        type="text"
        name="body"
        class="form-control"
        v-model="form.body"
      ></textarea>
    </div>
    <button class="btn mr-2 btn-primary">Sauvegarder</button>
    <router-link class="btn ml-2 btn-primary text-white" to="/tasks"
      >Retour</router-link
    >
  </form>
</template>
<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "Create",
  data() {
    return {
      form: {},
    };
  },
  computed: {
    ...mapGetters({ user: "auth/user" }),
    ...mapGetters({ msg: "auth/msg" }),
  },
  mounted() {
    this.msg.success = "";
  },
  methods: {
    ...mapActions({ createTask: "auth/createTask" }),
    create(form) {
      this.createTask(form).then(() => {
        this.$route.push({ path: "/tasks" });
      });
    },
  },
};
</script>
