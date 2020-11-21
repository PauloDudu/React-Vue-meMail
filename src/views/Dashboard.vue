<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
  </div>
</template>

<script>
import jwt from "jsonwebtoken";
export default {
  name: "dashboard",
  components: {
  },
  mounted() {
      let local = window.localStorage.getItem("@MAIL:Token");

      if (local) {
        jwt.verify(local, "tokensecret", (err, userDecoded) => {
          console.log("email: " + userDecoded.email + " senha: " +  userDecoded.senha);
        });
      } else {
        return;
      }
    }
};
</script>

<style>
</style>