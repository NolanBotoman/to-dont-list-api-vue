<template>
  <h2 class="text-uppercase">to don't list</h2>
  <h5 v-if="!user.token">
    Inscrivez-vous gratuitement et commencez dès à présent à noter les choses à
    ne pas faire.
  </h5>
  <h5 v-else>
    Accèdez à la liste de vos tâches à ne pas faire depuis la barre de
    navigation
  </h5>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Nav",
  computed: {
    ...mapGetters({ user: "auth/user" }),
  },
};
</script>
