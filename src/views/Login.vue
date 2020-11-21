<template>
  <div class="login">
    <img
      src="https://ajuda.alterdata.com.br/packtarbase/files/89580782/89583666/1/1576694002850/pack-01.png"
    />
    <div class="form">
      <form>
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
        <button @click.prevent="login">Entrar</button>
      </form>
      <p>
        Não tem uma conta ?
        <mark><router-link to="cadastro">Crie uma</router-link></mark>
      </p>
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
      user: {
        email: "",
        senha: "",
      },
      found: {},
      token: "",
      local: "",
      baseUrl: "http://localhost:3333/",
    };
  },
  methods: {
    async login() {
      if (!this.user.email || !this.user.senha) {
        alert("Preencha os campos!");
        return;
      }

      try {
        const response = await axios.get(this.baseUrl + "usuarios");
        // console.log(response.data);

        this.found = response.data.find(
          (user) =>
            user.email === this.user.email && user.senha === this.user.senha
        );

        if (!this.found) {
          console.log("Email ou senha inválidos");
          return {};
        } else {
          console.log("Tudo certo!");
          const { email, senha } = this.found;

          this.token = jwt.sign({ email, senha }, "tokensecret", {
            expiresIn: "1h",
          });

          this.local = window.localStorage.getItem("@MAIL:Token");
          if (this.local) {
            window.localStorage.removeItem("@MAIL:Token");
          } else {
            window.localStorage.setItem("@MAIL:Token", this.token);
          }
          this.$router.replace("/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
button,
input {
  outline: none;
  border: 0;
  padding: 4px;
}

img {
  height: 45vh;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form {
  display: flex;
  flex-direction: column;
}

form {
  display: flex;
  flex-direction: column;
  width: 34vw;
}

input {
  margin: 7px 0;
  opacity: 0.7;
}

button {
  width: 12vw;
  height: 5vh;
  margin: auto;
  background-color: #9e0a2a;
  color: #fff;
}

a {
  color: blue;
  text-decoration: none;
}

mark {
  background-color: antiquewhite;
  padding: 3px;
}
</style>