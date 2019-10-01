<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col">
        <h1>Создание рубрики</h1>

        <div class="input-group my-3">
          <input
            type="text"
            class="form-control"
            placeholder="Название рубрики"
            maxlength="10"
            v-model="rubricName"
          />
        </div>
        <div class="input-group my-3">
          <textarea
            type="text"
            class="form-control"
            maxlength="25"
            v-model="rubricDesc"
            placeholder="Описание рубрики"
          />
        </div>

        <b-button :disabled="ready" @click="createRubric" block variant="primary">Добавить</b-button>
      </div>
      <div class="col">
        <h1>Существующие рубрики</h1>
        <b-table
          show-empty
          bordered
          hover
          responsive
          :fields="rubricFields"
          striped
          :items="rubricsData"
          class="my-3"
        >
          <template v-slot:cell(delete)="data">
            <b-button
              :disabled="ready"
              @click="deleteRubric(data.item.id)"
              size="sm"
              block
              variant="danger"
            >Удалить</b-button>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      rubricName: "",
      rubricDesc: "",
      ready: false,
      rubricsData: [],
      rubricFields: [
        {
          key: "name",
          label: "Название",
          sortable: true,
          sortDirection: "",
          class: "text-center"
        },
        {
          key: "delete",
          label: "Удаление",
          class: "text-center"
        }
      ]
    };
  },
  beforeMount() {
    this.getRubrics();
  },
  methods: {
    getRubrics() {
      let data = null;
      this.rubricsData = [];
      firebase
        .database()
        .ref("Rubrics/")
        .once("value", snapshot => {
          data = snapshot.val();
        })
        .then(() => {
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              const element = data[key];
              this.rubricsData.push({
                name: element.name,
                delete: "",
                id: key
              });
            }
          }
        });
    },
    deleteRubric(id) {
      console.log(id);
      firebase
        .database()
        .ref("Rubrics/" + id)
        .remove()
        .then(() => {
          this.getRubrics();
        });
    },
    createRubric() {
      this.ready = true;
      firebase
        .database()
        .ref("Rubrics/")
        .push()
        .set({
          name: this.rubricName,
          description: this.rubricDesc
        })
        .then(() => {
          this.ready = false;
          this.getRubrics();
        });
    }
  }
};
</script>

<style>
</style>