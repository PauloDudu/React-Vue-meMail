<template>
  <div class="login">
    <div class="container grid-xs py-z py-2">
      <img
        class="img logo responsive"
        src="http://serratec.org/wp-content/uploads/2018/01/logo-neq.png"
      />
      <form @submit.prevent="login">
        <label for="email">Email</label>
        <input
          type="text"
          v-model="user.email"
          class="email"
          placeholder="Email"
          autocomplete="none"
        />
        <label for="senha">Senha</label>
        <input
          type="password"
          v-model="user.senha"
          class="senha"
          placeholder="Senha"
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script>
import jwt from "jsonwebtoken";
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      user: {},
      token: "",
      local: "",
      baseUrl: "http://localhost:3333/",
    };
  },
  methods: {
    async login() {
      if (!this.user.email || !this.user.senha) return;

      try {
        const response = await axios.get(this.baseUrl + "usuarios");
        // console.log(response.data);

        const User = response.data.find((usuario) => {
          if (usuario.email == this.user.email && usuario.senha == this.user.senha) {
            console.log("tudo certo");
            return usuario;
          } else {
            console.log("Email ou senha invalidos");
            return {};
          }
        });

       const { email, senha } = User;

        this.token = jwt.sign({ email, senha }, "tokensecret", {
          expiresIn: 1440,
        });

        this.local = window.localStorage.getItem("@MAIL:User");
        if (this.local) {
          window.localStorage.removeItem("@MAIL:User");
        } else {
          window.localStorage.setItem("@MAIL:User", this.token);
        }
        this.$router.replace("/dashboard");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
img.logo {
  max-width: 35vw;
  margin: 0 auto;
}

form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 12px auto;
  width: 35vw;
}

label {
  margin: 4px 0;
}
input {
  outline: none;
  padding: 5px;
}

button {
  padding: 2px;
  outline: none;
  width: 17vw;
  margin: 8px auto;
}
</style>