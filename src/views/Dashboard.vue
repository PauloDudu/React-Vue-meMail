<template>
  <div class="dashboard">
    <Cabecalho></Cabecalho>
    <h1>Dashboard</h1>
  </div>
</template>

<script>
import Cabecalho from "@/components/Cabecalho.vue";
import jwt from "jsonwebtoken";
export default {
  name: "dashboard",
  components: {
    Cabecalho,
  },
  mounted() {
      let local = window.localStorage.getItem("@MAIL:User");

      if (local) {
        jwt.verify(local, "tokensecret", (err, userDecoded) => {
          console.log(userDecoded);
        });
      } else {
        return;
      }
    }
};
</script>

<style>
</style>