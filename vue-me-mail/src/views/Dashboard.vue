<template>
  <div class="dashboard">
    <h1>Bem vindo {{ user.email }} à Dashboard</h1>
  </div>
</template>

<script>
import jwt from "jsonwebtoken";
export default {
  name: "dashboard",
  components: {},
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    const token = this.$cookie.get("Token");

    if (token) {
      jwt.verify(token, "tokensecret", (err, userDecoded) => {
        console.log(
          "email: " + userDecoded.email + " senha: " + userDecoded.senha
        );
        this.user = userDecoded;
      });
    } else {
      window.location.href = "/";
      return;
    }
  },
};
</script>

<style>
</style>