<template>
  <div class="" id="app">
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
        <button>Entrar</button>
      </form>
        <button @click.prevent="checkUser">Checar</button>
    </div>
  </div>
</template>

<script>
import jwt from "jsonwebtoken";
export default {
  name: "App",
  data() {
    return { user: {}, token: "", local: ""};
  },
  methods: {
    login() {
      if (this.user.email || this.user.senha) {
        console.log(this.user);
        let email = this.user.email;
        let senha = this.user.senha;
        this.token = jwt.sign({ email, senha }, "tokensecret", {
          expiresIn: 1440,
        });
        this.local = window.localStorage.getItem("@MAIL:User");
        if (this.local) {
          window.localStorage.removeItem("@MAIL:User");
        }
          window.localStorage.setItem("@MAIL:User", this.token);
      }
      return;
    },
    checkUser() {
      let local = window.localStorage.getItem("@MAIL:User");

      if(local) {
        jwt.verify(local, "tokensecret", (err, userDecoded) => {
          console.log(userDecoded);
        } )
      } else {
        return;
      }
    }
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
  flex-direction: column;
  width: 35vw;
}

label {
  margin: 4px 0;
}
input {
  outline: none;
}

button {
  margin-top: 10px;
  margin-left: auto;
  width: 10vw;
  outline: none;
}
</style>
