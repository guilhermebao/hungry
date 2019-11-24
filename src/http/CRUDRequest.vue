<script>
import BaseRequest from "./request";
import { mapGetters } from "vuex";
import { sucessMessage, errorMessage } from "@/components/MessageBus";

export default {
  name: "CRUDRequest",
  mixins: [BaseRequest],
  data() {
    return {
      list: [],
      entity: {},
      path: ""
    };
  },
  methods: {
    getAllDirect(path) {
      return this.baseRequest("get", path);
    },
    getAll() {
      this.baseRequest("get", this.path).then(data => {
        this.list = data;
      });
    },
    getOne() {
      this.baseRequest("get", this.path).then(data => {
        this.entity =  Object.assign({}, this.entity, data);
      });
    },
    put() {
      this.baseRequest("put", this.path, this.entity).then(data => {
        sucessMessage("Salvo com sucesso");
        this.endLoading();
        this.$router.go(-1);
      });
    },
    post() {
      this.baseRequest("post", this.path, this.entity).then(data => {
        sucessMessage("Salvo com sucesso");
        this.endLoading();
        this.$router.go(-1);
      });
    },
    save() {
      if (this.entity.id) {
        this.put(this.entity);
      } else {
        this.post(this.entity);
      }
    },
    remove(id, index) {
      if (confirm("Deseja mesmo excluir ?")) {
        this.baseRequest("delete", this.path + "/" + id).then(data => {
          sucessMessage("Excluido com sucesso");
          this.list.splice(index, 1);
          this.endLoading();
        });
      }
    }
  },
  computed: {
    pathId: function() {
      return this.$route.params.id;
    },
    isNew: function() {
      return this.pathId === "new";
    },
    ...mapGetters({
      isLoading: "isLoading"
    })
  }
};
</script>