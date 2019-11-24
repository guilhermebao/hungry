<template>
  <div class="login-page logback login-background">
    <div class="content">
      <div class="md-layout">
        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33">
          <md-card class="md-card-profile">
            <md-card-content>
              <form class="register-form">
                <div class="logo-login">
                  <!-- <img src="./assets/img/logo-index.png" /> -->
                </div>

                <section>
                  <form autocomplete="off">
                    <div class="md-layout-item md-small-size-100 md-size-100">
                      <md-field>
                        <label>Login</label>
                        <md-input
                          v-model="entity.login"
                          type="text"
                          required
                        ></md-input>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100 md-size-100">
                      <md-field>
                        <label>Senha</label>
                        <md-input
                          v-model="entity.password"
                          type="password"
                          required
                        ></md-input>
                      </md-field>
                    </div>
                  </form>
                </section>

                <div class="has-text-centered">
                  <div>
                    <button
                      type="button"
                      id="Btnlogin"
                      class="md-button md-primary md-block md-theme-default"
                      :disabled="buttonDisabled"
                      @click.prevent="login()"
                    >
                      <div class="md-ripple">
                        <div class="md-button-content">Entrar</div>
                      </div>
                    </button>
                  </div>
                  <div class="mt-2 font-weight-bold">
                    <router-link
                      class=""
                      title="New Account"
                      :to="{ name: 'account'}"
                    >Criar conta</router-link>
                  </div>
                </div>
              </form>
            </md-card-content>
          </md-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import BaseRequest, { setTokenHeader } from "@/http/request";
import md5 from "js-md5";
import { tokenStore } from "@/components/extra/LocalStorage";
import { loginPath } from "@/http/ApiRouter";
import { sucessMessage, errorMessage } from "@/components/MessageBus";

export default {
  name: "Login",
  data() {
    return {
      entity: {}
    };
  },
  mixins: [BaseRequest],
  methods: {
    login() {
      this.baseRequest("post", loginPath, {
        email: this.entity.login,
        password: this.entity.password
      }).then(data => {
        console.log("data login", data);
        if (data.result) {
          data = data.result;
          setTokenHeader(data.access_token);
          this.setLogin({ user: data.user, token: data.access_token });
          tokenStore.set(data.access_token);
          this.$router.push({ path: "/" });
        }
      });
    },
    ...mapActions({
      setLogin: "setLogin"
    })
  },
  computed: {
    missingLogin: function() {
      return !this.entity.login;
    },
    missingPassword: function() {
      return !this.entity.password;
    },
    buttonDisabled: function() {
      return this.missingLogin || this.missingPassword;
    }
  }
};
</script>

