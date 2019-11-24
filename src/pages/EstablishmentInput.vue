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
                  <md-input
                    v-model="entity.name"
                    type="text"
                    required
                  ></md-input>
                </md-field>
              </div>
              <button
                type="button"
                id="Btnlogin"
                class="md-button md-primary md-theme-default"
                :disabled="buttonDisabled"
                @click.prevent="save()"
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
import { establishmentPath } from "@/http/ApiRouter";
import CRUDRequest from "@/http/CRUDRequest";

export default {
  name: "EstablishmentInput",
  extends: CRUDRequest,
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  mounted() {
    if (!this.isNew) {
      this.path = establishmentPath + "/" + this.$route.params.id;
      this.getOne();
    } else {
      this.path = establishmentPath;
    }
  },
  computed: {
    missingName: function() {
      return !this.entity.name;
    },

    buttonDisabled: function() {
      return this.missingName;
    }
  }
};
</script>
