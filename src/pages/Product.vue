<template>
  <div>
    <div class="content">
      <div class="md-layout">
        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
          <md-card class="md-card-profile">
            <md-card-content>
              <router-link
                class="md-button md-success md-sm md-theme-default md-sm add"
                to="/product/new"
              >
                <div class="md-ripple">
                  <div class="md-button-content">
                    <i class="fa fa-plus"></i>
                  </div>
                </div>
              </router-link>
              <md-table
                v-for="(item, index) in list.result"
                :key="item.id"
                :table-header-color="tableHeaderColor"
              >
                <md-table-row slot="md-table-row">
                  <md-table-cell md-label="Nome">{{ item.name }}</md-table-cell>
                  <md-table-cell md-label="Preço">{{ item.price }}</md-table-cell>
                </md-table-row>
              </md-table>
            </md-card-content>
          </md-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { productPath } from "@/http/ApiRouter";
import CRUDRequest from "@/http/CRUDRequest";

export default {
  name: "Product",
  extends: CRUDRequest,
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: []
    };
  },
  mounted() {
    this.path = productPath;
    this.getAll();
  }
};
</script>

<style>
.add {
  float: right;
  top: -18px;
}
</style>