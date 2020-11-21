<template>
  <div class="cabecalho">
    <router-link to="/login">Login</router-link>
    <router-link to="/Cadastro">Cadastro</router-link>
  </div>
</template>

<script>
export default {
  name: "cabecalho",
};
</script>

<style>
.header {
  display: flex;
  margin-left: 88.95%;
}

.header a:-webkit-any-link {
  margin: 3px 5px;
}
</style>