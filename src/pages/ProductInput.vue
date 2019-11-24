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
                <md-field>
                  <label>Preço</label>
                  <md-input
                    v-model="entity.price"
                    type="text"
                    required
                  ></md-input>
                </md-field>
                <md-field>
                  <label>Estabelecimento</label>
                  <md-select
                    v-model="entity.establishmentId"
                  >
                    <md-option
                      v-for="entity in establishmentList"
                      :value="entity.id"
                      :key="entity.id"
                    >{{ entity.name }}</md-option>
                  </md-select>
                </md-field>

                <md-field>
                  <label>Categoria</label>
                  <md-select v-model="entity.categoryId">
                    <md-option value="1">Alimento</md-option>
                  </md-select>
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
import { productPath, establishmentPath } from "@/http/ApiRouter";
import CRUDRequest from "@/http/CRUDRequest";

export default {
  name: "ProducttInput",
  extends: CRUDRequest,
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      establishmentList: []
    };
  },
  mounted() {
    if (!this.isNew) {
      this.path = productPath + "/" + this.$route.params.id;
      this.getOne();
    } else {
      this.path = productPath;
    }

    this.getAllDirect(establishmentPath).then(data => {
      this.establishmentList = data.result;
    });
  },
  computed: {
    missingName: function() {
      return !this.entity.name;
    },
    missingPrice: function() {
      return !this.entity.price;
    },
    missingEstablishment: function() {
      return !this.entity.establishmentId;
    },
    missingCategory: function() {
      return !this.entity.categoryId;
    },

    buttonDisabled: function() {
      return (
        this.missingName ||
        this.missingPrice ||
        this.missingEstablishment ||
        this.missingCategory
      );
    }
  }
};
</script>

<style>
.form-select {
  width: 100%;
}
</style>