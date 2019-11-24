<template>
  <div>
    <div class="content">
      <div class="md-layout">
        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
          <md-card class="md-card-profile">
            <md-card-content>
              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                  <label>Nome</label>
                  <md-input v-model="entity.displayName" type="text" required></md-input>
                </md-field>
                <md-field>
                  <label>Email</label>
                  <md-input v-model="entity.email" type="text" required></md-input>
                </md-field>
                <md-field>
                  <label>Senha</label>
                  <md-input v-model="entity.password" type="password" required></md-input>
                </md-field>
                <md-field>
                  <label>Confirme a senha</label>
                  <md-input v-model="entity.confirmPassword" type="password" required></md-input>
                </md-field>
              </div>
              <button
                type="button"
                id="Btnlogin"
                class="md-button md-primary md-theme-default"
                :disabled="buttonDisabled"
                @click.prevent="saveAccount()"
              >
                <div class="md-ripple">
                  <div class="md-button-content">Salvar</div>
                </div>
              </button>
            </md-card-content>
          </md-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { accountPath } from "@/http/ApiRouter";
import CRUDRequest from "@/http/CRUDRequest";

export default {
  name: "Account",
  extends: CRUDRequest,
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  mounted() {
    this.path = accountPath;
  },
  methods: {
    saveAccount() {
      this.baseRequest("post", this.path, this.entity).then(data => {
        window.location.href = "/login";
      });
    }
  },
  computed: {
    missingName: function() {
      return !this.entity.displayName;
    },
    missingEmail: function() {
      return !this.entity.email;
    },
    missingPassword: function() {
      return !this.entity.password;
    },
    missingConfirmPassword: function() {
      return !this.entity.confirmPassword;
    },

    buttonDisabled: function() {
      return (
        this.missingName ||
        this.missingEmail ||
        this.missingPassword ||
        this.missingConfirmPassword
      );
    }
  }
};
</script>
