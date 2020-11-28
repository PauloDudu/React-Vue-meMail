<template>
  <div class="cadastro">
    <img
      src="https://ajuda.alterdata.com.br/packtarbase/files/89580782/89583666/1/1576694002850/pack-01.png"
    />
    <form class="form">
      <div>
        <label for="Nome">Nome</label><br />
        <input type="text" v-model="user.nome" />
      </div>

      <div>
        <label for="Sobrenome">Sobrenome</label><br />
        <input type="text" v-model="user.sobrenome" />
      </div>

      <div>
        <label for="Email">Email</label><br />
        <input type="email" v-model="user.email" />
      </div>
      <div>
        <label for="CPF">CPF</label><br />
        <input type="text" v-model="user.cpf" />
      </div>
      <div>
        <label for="Senha">Senha</label><br />
        <input type="password" v-model="user.senha" />
      </div>
      <div>
        <label for="">Confirme sua senha</label><br />
        <input type="password" v-model="senhaConf" />
      </div>
      <div>
        <label for="Cep">Cep</label><br />
        <input type="text" v-model="user.cep" />
      </div>
      <button @click.prevent="cadastro">Cadastrar</button>
    </form>
    <p>
      Já tem uma conta ?
      <mark><router-link to="login">Faça login</router-link></mark>
    </p>
  </div>
</template>

<script>
import axios from "axios";
import jwt from "jsonwebtoken";

export default {
  name: "cadastro",
  components: {},
  data() {
    return {
      user: {
        nome: "",
        sobrenome: "Guedes",
        email: "@gmail.com",
        cpf: "11111111111",
        senha: "teste",
        cep: "123123",
      },
      senhaConf: "123123",
      token: "",
      baseUrl: "http://localhost:3333/",
    };
  },
  mounted() {
    this.$vToastify.setSettings({ singular: true, hideProgressbar: true });
  },
  methods: {
    async cadastro() {
      if (
        !this.user.nome ||
        !this.user.sobrenome ||
        !this.user.email ||
        !this.user.cpf ||
        !this.user.senha ||
        !this.senhaConf ||
        !this.user.cep
      ) {
        this.$vToastify.warning("Preencha os campos por favor", "Atenção");
        return;
      }

      try {
        let params = {
          nome: this.user.nome,
          sobrenome: this.user.sobrenome,
          email: this.user.email,
          cpf: this.user.cpf,
          senha: this.user.senha,
          cep: this.user.cep,
        };
        await axios.post(this.baseUrl + "usuarios", params);
        const { email, senha } = this.user;
        this.token = jwt.sign({ email, senha }, "tokensecret");
        this.$cookie.set("Token", this.token, 1);

        this.$router.replace("/dashboard");
        this.$vToastify.success("Cadastro realizado com sucesso", "All right");
      } catch (error) {
        console.log(error);
        this.$vToastify.error("Algum campo nao foi preenchido corretamente!");
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

.cadastro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form {
  display: flex;
  flex-wrap: wrap;
  width: 50vw;
}

input {
  margin: 5px 10px 5px 0;
  opacity: 0.7;
  height: 3vh;
  width: 20vw;
}

button {
  width: 12vw;
  height: 5vh;
  margin: auto;
  background-color: #9e0a2a;
  color: #fff;
  cursor: pointer;
}
</style>